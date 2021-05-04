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
    const history = useHistory();  
    const {id} = useParams();

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setBattleSet)
    },[])


    // Update the user character once the last card was studied
    useEffect(() => {
        if(serverUser.id > 0)
        {
            console.log(serverUser)
            serverUser.experience += flashcardSetData.EXPgained
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
    let shuffled = [];


    // When questions state changes...
    useEffect(() => {
        // if questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = id;
            flashcardSetData.flashcard = battleSet;
            setQuestion(questions[theCount]);

            shuffled = questions[0].answers.sort(() => Math.random() - 0.5)
        }
    },[questions])


    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            setQuestion(questions[theCount])
            shuffled = questions[theCount].answers.sort(() => Math.random() - 0.5)
            console.log(flashcardSetData)
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
            console.log("Correct!")
            setTheCount(theCount => theCount + 1)
            flashcardSetData.correctAnswers += 1;
            flashcardSetData.EXPgained += 40;
        }
        else if(answerChoice.correct === false)
        {
            // Set the amount of damage taken for wrong answers
            const dmg = flashcardSetData.hp / questions.length

            console.log("Wrong!")
            setTheCount(theCount => theCount + 1)

            flashcardSetData.wrongAnswers += 1;
            flashcardSetData.hp -= dmg
        }
    }


    return (
        <div className="studyBattleContainer">
                <Container>
                    <img className="playerHero" src={currentUser.characterImage.imageLocation} alt="Player hero"></img>
                    <Container>
                        <b>HP:</b> {currentUser.hp} <br></br>
                        <b>EXP:</b> {currentUser.experience} <br></br>
                        <b>Level:</b> {currentUser.level}
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
        </div>
    )

}

export default BattleSet;