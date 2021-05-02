import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { Container } from "nes-react";

const StudySet = () => {
    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const {id} = useParams();
    const [studySet, setStudySet] = useState({})
    const [question, setQuestion] = useState({})
    const [hiddenAnswer, setHiddenAnswer] = useState(true)
    const history = useHistory();  

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setStudySet)
    },[])

    // Isolate the list of questions with answers
    let questions = studySet.questions;

    // When questions state changes...
    useEffect(() => {
        // if questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = id;
            setQuestion(questions[theCount]);
        }
    },[questions])

    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            setQuestion(questions[theCount])
            console.log(flashcardSetData)
        }
        else if(theCount === questions?.length)
        {
            history.push(`${id}/results`)
        }
    },[theCount])

    // Show and hide the answer for the user
    const showHide = () => {
        setHiddenAnswer(!hiddenAnswer)
    }

    // User was correct so increase the count to show the next question
    const userCorrect = () => {
        setTheCount(theCount++)
        flashcardSetData.correctAnswers += 1;
    }

    const userWrong = () => {
        setTheCount(theCount++)
        flashcardSetData.wrongAnswers += 1;
    }
    
    const correct = question?.answers?.find(a => a.correct === true)

    return (
        <Container>
            {hiddenAnswer ?
            <div id="question">
                 Question: {question?.questionText}<br></br><br></br><button className="nes-btn" onClick={showHide}>Show Answer</button>
                 <button className="right nes-btn is-success" onClick={userCorrect}>I was right</button> {' '}
                 <button className="right nes-btn is-error" onClick={userWrong}>I was wrong</button>   
            </div>
            :
            <div id="question">
                 Answer: {correct?.answerText}<br></br><br></br><button className="nes-btn" onClick={showHide}>Hide Answer</button>
                 <button className="right nes-btn is-success" onClick={userCorrect}>I was right</button> {' '}
                 <button className="right nes-btn is-error" onClick={userWrong}>I was wrong</button>       
            </div>
            }

        </Container>
    )

}

export default StudySet;