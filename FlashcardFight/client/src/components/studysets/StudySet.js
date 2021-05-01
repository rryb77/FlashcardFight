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

    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setStudySet)
    },[])

    let questions = studySet.questions;

    useEffect(() => {
        if(questions !== undefined)
        {
            setQuestion(questions[theCount])
        }
    },[questions])

    const history = useHistory();

    const showAnswer = () => {
        setHiddenAnswer(false)
    }

    const showQuestion = () => {
        setHiddenAnswer(true)
    }

    const userCorrect = () => {
        
        if(theCount < questions.length)
        {
            setTheCount(theCount++)
            setQuestion(questions[theCount])
        }
    }

    const userWrong = () => {

    }
    
    const correct = question?.answers?.find(a => a.correct === true)

    console.log(question)

    return (
        <Container>
            {hiddenAnswer ?
            <div id="question">
                 Question: {question.questionText}<br></br><br></br><button className="nes-btn" onClick={showAnswer}>Show Answer</button>
                 <button className="right nes-btn is-success" onClick={userCorrect}>I was right</button> {' '}
                 <button className="right nes-btn is-error" onClick={userWrong}>I was wrong</button>   
            </div>
            :
            <div id="question">
                 Answer: {correct.answerText}<br></br><br></br><button className="nes-btn" onClick={showQuestion}>Hide Answer</button>
                 <button className="right nes-btn is-success" onClick={userCorrect}>I was right</button> {' '}
                 <button className="right nes-btn is-error" onClick={userWrong}>I was wrong</button>       
            </div>
            }

        </Container>
    )

}

export default StudySet;