import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { Container, Radios, Button } from "nes-react";

const BattleSet = () => {
    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const [battleSet, setBattleSet] = useState({});
    const [question, setQuestion] = useState({});
    const [answerChoice, setAnswerChoice] = useState({});
    const history = useHistory();  
    const {id} = useParams();

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setBattleSet)
    },[])

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
            history.push(`${id}/results`)
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
            setTheCount(theCount++)
            flashcardSetData.correctAnswers += 1;
        }
        else if(answerChoice.correct === false)
        {
            console.log("Wrong!")
            setTheCount(theCount++)
            flashcardSetData.wrongAnswers += 1;
        }
    }

    return (
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
    )

}

export default BattleSet;