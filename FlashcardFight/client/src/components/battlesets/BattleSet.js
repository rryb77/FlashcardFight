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

    useEffect(() => {
        flashcardSetData.hp = profile.hp;
        setHP(profile.hp)
        // setDMG(flashcardSetData.hp / questions.length)
    }, [profile])


    // Update the user character once the last card was studied
    useEffect(() => {
        if(serverUser.id > 0)
        {
            serverUser.experience += flashcardSetData.EXPgained
            serverUser.hp = flashcardSetData.hp
            serverUser.experience = profile.experience
            serverUser.level = profile.level
            serverUser.hp = 0
            serverUser.email = profile.email
            serverUser.userName = profile.userName

            console.log(serverUser)
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
    }, [serverUser])


    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    // Isolate the list of questions with answers
    let questions = battleSet.questions;

    // When questions state changes...
    useEffect(() => {
        // if questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = id;
            flashcardSetData.flashcard = battleSet;
            setQuestion(questions[theCount]);
            setShuffled(questions[0].answers.sort(() => Math.random() - 0.5))
        }
    },[questions])


    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            setQuestion(questions[theCount])
            setShuffled(questions[theCount].answers.sort(() => Math.random() - 0.5))
        }
        else if(theCount === questions?.length)
        {
            getUserProfile(currentUser.firebaseUserId)
                .then(setServerUser)
        }
    },[theCount])


    const checkAnswer = () => {
        
        if(answerChoice.correct !== true && answerChoice.correct !== false)
        {
            console.log("Select an answer")
        }
        else if(answerChoice.correct === true)
        {
            setTheCount(theCount => theCount + 1)
            flashcardSetData.correctAnswers += 1;
            flashcardSetData.EXPgained += 40;
        }
        else if(answerChoice.correct === false)
        {
            // Set the amount of damage taken for wrong answers
            const dmg = flashcardSetData.hp / questions.length

            setTheCount(theCount => theCount + 1)
            flashcardSetData.wrongAnswers += 1;
            flashcardSetData.hp -= 400
            setHP(flashcardSetData.hp)
            console.log(flashcardSetData)
            if(flashcardSetData.hp <= 0)
            {
                flashcardSetData.hp = 0
                gameOver()
            }

        }
    }

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