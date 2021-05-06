import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import { Container, Radios, Button } from "nes-react";

const BattleSet = () => {
    
    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    const { updateUserCharacter, getUserProfile } = useContext(UserProfileContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const [battleSet, setBattleSet] = useState({});
    const [question, setQuestion] = useState({});
    const [answerChoice, setAnswerChoice] = useState({});
    const [serverUser, setServerUser] = useState({})
    const [profile, setProfile] = useState({})
    const [dmg, setDmg] = useState(0)
    const [shuffled, setShuffled] = useState([])
    const history = useHistory();  
    const {id} = useParams();

    const [HP, setHP] = useState(0)
    // const [DMG, setDMG] = useState(0)

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setBattleSet)
            .then(() => getUserProfile(currentUser.firebaseUserId))
            .then(setProfile)
    },[])

    // Profile is loaded
    useEffect(() => {
        flashcardSetData.hp = profile.hp;
        setHP(profile.hp)
    }, [profile])


    // Update the user character once the last card was studied
    useEffect(() => {
        if(serverUser.id > 0)
        {
            //Build out the user object with new info
            serverUser.experience += flashcardSetData.EXPgained
            serverUser.hp = flashcardSetData.hp
            serverUser.experience = profile.experience
            serverUser.level = profile.level
            serverUser.hp = 0
            serverUser.email = profile.email
            serverUser.userName = profile.userName

            // Check for character level up
            if(serverUser.experience >= serverUser.expToNextLevel)
            {
                let levelScale = serverUser.expToNextLevel * 2.1
                console.log(levelScale)
                serverUser.expToNextLevel = Math.round(levelScale)
                serverUser.level += 1
            }

            // Send the update and push user to results
            updateUserCharacter(serverUser)
            history.push(`${id}/results`)
        }
    }, [serverUser])


    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    // Isolate the list of questions with answers
    let questions = battleSet.questions;

    // When questions state changes...
    useEffect(() => {
        // If questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {            
            // Calculate and assign dmg amount per wrong answer
            setDmg(currentUser.hp / questions.length)
            // Populate the flashcard data for details screen
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = id;
            flashcardSetData.flashcard = battleSet;
            // Assign the first question
            setQuestion(questions[theCount]);
            // Shuffle the answers
            setShuffled(questions[0].answers.sort(() => Math.random() - 0.5))
        }
    },[questions])


    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            // Assign the next question
            setQuestion(questions[theCount])
            // Randomize the answer order
            setShuffled(questions[theCount].answers.sort(() => Math.random() - 0.5))
        }
        // Last question was answered
        else if(theCount === questions?.length)
        {
            // Grab the user profile and set the serveruser
            getUserProfile(currentUser.firebaseUserId)
                .then(setServerUser)
        }
    },[theCount])


    // Check if the user was right or wrong
    const checkAnswer = () => {
        
        // No choice was made
        if(answerChoice.correct !== true && answerChoice.correct !== false)
        {
            console.log("Select an answer")
        }
        // Correct
        else if(answerChoice.correct === true)
        {
            setTheCount(theCount => theCount + 1)
            flashcardSetData.correctAnswers += 1;
            flashcardSetData.EXPgained += 40;
        }
        // Wrong
        else if(answerChoice.correct === false)
        {
            // Increase count so the next question can be put on the DOM
            setTheCount(theCount => theCount + 1)
            // Update the flashcard set data object for results screen
            flashcardSetData.wrongAnswers += 1;
            flashcardSetData.hp -= dmg
            flashcardSetData.hp = Math.round(flashcardSetData.hp)
            // Update the HP on the DOM
            setHP(flashcardSetData.hp)
            // Character death check
            if(flashcardSetData.hp <= 0)
            {
                flashcardSetData.hp = 0
                gameOver()
            }

        }
    }

    // User HP hit 0
    const gameOver = () => {
        
        serverUser.experience = profile.experience
        serverUser.level = profile.level
        serverUser.hp = 0
        serverUser.email = profile.email
        serverUser.userName = profile.userName
        if(serverUser.experience >= serverUser.expToNextLevel)
        {
            let levelScale = serverUser.expToNextLevel * 2.1
            console.log(levelScale)
            serverUser.expToNextLevel = Math.round(levelScale)
            serverUser.level += 1
        }

        updateUserCharacter(serverUser)
        history.push(`${id}/results`)
    }

    return (
        <div className="studyBattleContainer">
                <Container>
                    <img className="playerHero" src={profile?.characterImage?.imageLocation} alt="Player hero"></img>
                    <Container>
                        <b>HP:</b> {HP} <br></br>
                        <b>EXP:</b> {profile.experience} <br></br>
                        <b>Level:</b> {profile.level}
                    </Container>
                </Container>
                <Container>
                    <div id="question">
                        Question: {question?.questionText}<p></p>
                    </div>

                    <div id="answers">
                        Choices:
                        <p></p>
                        <div>
                            { 
                                question?.answers?.map(a => (
                                    <div key={a.id}>
                                        <label>
                                            <input type="radio" className="nes-radio" name="answer" onChange={() => setAnswerChoice(a)}/>
                                            <span >{a.answerText}</span>
                                        </label> 
                                    </div>
                                ))
                            }
                            
                        </div>
                        <Button type="button" className="nes-btn is-normal nes-cursor" onClick={checkAnswer}>Submit</Button>
                    </div>
                </Container>

                <Container>
                    <img className="playerHero" src={battleSet?.bossImage?.imageLocation} alt="Player hero"></img>
                    <Container>
                        <b>HP:</b> {currentUser.hp} <br></br>
                        <b>EXP:</b> {currentUser.experience} <br></br>
                        <b>Level:</b> {currentUser.level}
                    </Container>
                </Container>
        </div>
    )

}

export default BattleSet;