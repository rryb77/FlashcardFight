import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import './Study.css';
import {
    Badge,
    Card,
    CardBody,
    CardFooter,
    Button,
    CardHeader,
    CardTitle,
    CardSubtitle,
    Row,
    Col
} from "reactstrap";

const StudySet = () => {
    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const {id} = useParams();
    const [studySet, setStudySet] = useState({});
    const [question, setQuestion] = useState({});
    const [hiddenAnswer, setHiddenAnswer] = useState(true);
    const history = useHistory();  

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setStudySet)
    },[])

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);


    // // Isolate the list of questions with answers
    let questions = studySet.questions;

    // Grab the correct answer for each question
    let correct = question?.answers?.find(a => a.correct === true)

    // Ensure dom updates with questions so they can be shown to the user
    // useEffect(() => {
    //     if(studySet.id !== undefined)
    //     {
    //         questions = studySet.questions;
    //         console.log(questions)
    //     }
    // }, studySet)

    // When questions state changes...
    useEffect(() => {
        // if questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = parseInt(id);
            setQuestion(questions[theCount]);
        }
    },[questions])

    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            setQuestion(questions[theCount])
        }
        else if(theCount > 0 && theCount=== questions?.length)
        {
            history.push(`${id}/results`)
        }
    },[theCount])

    // Show and hide the answer for the user
    const showHide = () => {
        setHiddenAnswer(!hiddenAnswer)
    }

    // User was correct so record data and set the count to show the next question
    const userCorrect = () => {
        
        setTheCount(theCount => theCount + 1)
        flashcardSetData.correctAnswers += 1;

        if(hiddenAnswer === false)
        {
            setHiddenAnswer(true)
        }
    }

    // User was wrong so record data and set the count to show the next question
    const userWrong = () => {
        setTheCount(theCount => theCount + 1)
        flashcardSetData.wrongAnswers += 1;

        if(hiddenAnswer === false)
        {
            setHiddenAnswer(true)
        }
    }

    if(question === null || question === undefined)
    {
        return null
    }

    return (
        <div className="studyContainer">
            <img src={currentUser.characterImage.imageLocation} alt="Player hero"></img>
            {hiddenAnswer ?
            
            <Card className="m-4 flashcard">
                <CardBody>
                    <CardTitle tag="h2">
                    Question:
                    </CardTitle>
                    <div className="QandA">{question.questionText}</div>
                </CardBody>
                <CardFooter>
                    <Button color="secondary" onClick={showHide}>Show Answer</Button>
                    <Button color="success" className="right" onClick={userCorrect}>I was right</Button> {' '}
                    <Button color="danger" className="right" onClick={userWrong}>I was wrong</Button> 
                </CardFooter>
            </Card>
            :
            <Card className="m-4 flashcard">
                <CardBody>
                    <CardTitle tag="h2">
                    Answer:
                    </CardTitle>
                    <div className="QandA">{correct.answerText}</div>
                </CardBody>
                <CardFooter>
                    <Button color="secondary" onClick={showHide}>Hide Answer</Button>
                    <Button color="success" className="right" onClick={userCorrect}>I was right</Button> {' '}
                    <Button color="danger" className="right" onClick={userWrong}>I was wrong</Button> 
                </CardFooter>
            </Card>
            }
            
        </div>
    )

}

export default StudySet;