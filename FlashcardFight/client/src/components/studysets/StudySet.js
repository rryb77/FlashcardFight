import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { Container, Radio, Label } from "nes-react";

const StudySet = () => {
    const { getFlashcardSetWithQandA } = useContext(FlashCardSetContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const {id} = useParams();
    const [studySet, setStudySet] = useState({})
    const [question, setQuestion] = useState({})
    const [answer, setAnswer] = useState({})
    const [hiddenAnswer, setHiddenAnswer] = useState(true)
    let [amountCorrect, setAmountCorrect] = useState(0)

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
            setQuestion(questions[theCount])
        }
    },[questions])

    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            setQuestion(questions[theCount])
            console.log(amountCorrect)
        }
        else
        {
            console.log(amountCorrect)
        }
    },[theCount])

    const history = useHistory();  

    // Show and hide the answer for the user
    const showHide = () => {
        setHiddenAnswer(!hiddenAnswer)
    }

    // User was correct so increase the count to show the next question
    const userCorrect = () => {
        setTheCount(theCount++)
        setAmountCorrect(amountCorrect++)
    }

    const userWrong = () => {
        setTheCount(theCount++)
    }
    
    const correct = question?.answers?.find(a => a.correct === true)

    return (
        <Container>
            {hiddenAnswer ?
            <div id="question">
                 Question: {question.questionText}<br></br><br></br><button className="nes-btn" onClick={showHide}>Show Answer</button>
                 <button className="right nes-btn is-success" onClick={userCorrect}>I was right</button> {' '}
                 <button className="right nes-btn is-error" onClick={userWrong}>I was wrong</button>   
            </div>
            :
            <div id="question">
                 Answer: {correct.answerText}<br></br><br></br><button className="nes-btn" onClick={showHide}>Hide Answer</button>
                 <button className="right nes-btn is-success" onClick={userCorrect}>I was right</button> {' '}
                 <button className="right nes-btn is-error" onClick={userWrong}>I was wrong</button>       
            </div>
            }

        </Container>
    )

}

export default StudySet;