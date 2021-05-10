import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import './Study.css';
import { Container, Button } from "nes-react";
import { Progress } from 'reactstrap';

import {
    Badge,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
    Row,
    Col
} from "reactstrap";

const StudySet = () => {
    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    const { updateUserCharacter, getUserProfile } = useContext(UserProfileContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const {id} = useParams();
    const [studySet, setStudySet] = useState({});
    const [question, setQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [hiddenAnswer, setHiddenAnswer] = useState(true);
    const [serverUser, setServerUser] = useState({})
    const [profile, setProfile] = useState({})
    const [correct, setCorrect] = useState({})
    const history = useHistory();  

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setStudySet)
            .then(() => getUserProfile(currentUser.firebaseUserId))
            .then(setProfile)
    },[])

    // Update the user character once the last card was studied
    useEffect(() => {
        if(serverUser.id > 0)
        {
            
            serverUser.experience += flashcardSetData.EXPgained
            flashcardSetData.userId = serverUser.id
            console.log(serverUser)
            if(serverUser.experience >= serverUser.expToNextLevel)
            {
                let levelScale = serverUser.expToNextLevel * 2.1
                let hpScale = serverUser.hp * 1.4
                console.log(levelScale)
                serverUser.expToNextLevel = Math.round(levelScale)
                serverUser.hp = Math.round(hpScale)
                serverUser.maxHP = Math.round(hpScale)
                serverUser.level += 1
            }

            updateUserCharacter(serverUser)
            history.push(`${id}/results`)
        }
    }, [serverUser])

    useEffect(() => {
        if(studySet?.id > 0)
        {
            setQuestions(studySet.questions)
        }
    }, [studySet])

    // Grab the correct answer for each question
    // let correct = question?.answers?.find(a => a.correct === true)


    // When questions state changes...
    useEffect(() => {
        // if questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== null && theCount === 0)
        {
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = parseInt(id);
            flashcardSetData.flashcard = studySet;
            setQuestion(() => questions[theCount]);
        }
    },[questions])

    useEffect(() => {
        if(question?.answers !== undefined)
        {
           setCorrect(question?.answers.find(a => a.correct === true)) 
        }
    }, [question])

    // When theCount state changes...
    useEffect(() => {
        // If it is greater than 0 and less than the amount of questions the user has to study...
        if(theCount > 0 && theCount < questions?.length)
        {
            setQuestion(questions[theCount])
        }
        else if(theCount > 0 && theCount=== questions?.length)
        {
            getUserProfile(currentUser.firebaseUserId)
                .then(setServerUser)
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
        flashcardSetData.EXPgained += 2;

        if(hiddenAnswer === false)
        {
            setHiddenAnswer(true)
        }
    }


    // User was wrong so record data and set the count to show the next question
    const userWrong = () => {
        setTheCount(theCount => theCount + 1)
        flashcardSetData.wrongAnswers += 1;
        flashcardSetData.EXPgained += 2;

        if(hiddenAnswer === false)
        {
            setHiddenAnswer(true)
        }
    }

    return (
        <>
        {!profile?.characterImage?.imageLocation ?
        <div className="studyBattleContainer overflowOff BGsizer">
            <img className="loadingHero" src={'/characters/Guy1Run.gif'} alt="Player hero"></img>
        </div>
        :
        <>
        <div className="studyBattleContainer overflowOff BGsizer">
                               
                {hiddenAnswer ?
                
                <div className="questionContainer nes-container with-title is-dark">
                    <h2 className="title"><text className="textSizer">Question {theCount + 1} </text></h2>
                    <div className="QandA"><text className="textSizer">{question?.questionText}</text></div>
                    
                        <button className="nes-btn" onClick={showHide}><div className="textSizer">Show Answer</div></button> {' '}
                        <button className="nes-btn is-success" onClick={userCorrect}><div className="textSizer">I was right</div></button> {' '}
                        <button className="nes-btn is-error" onClick={userWrong}><div className="textSizer">I was wrong</div></button> 
                   
                </div>
                :
                <div className="questionContainer nes-container with-title is-dark">
                    <h2 className="title"><text className="textSizer">Answer</text></h2>
                    <div className="QandA"><text className="textSizer">{correct?.answerText}</text></div>
                    
                        <button className="nes-btn" onClick={showHide}><div className="textSizer">Hide Answer</div></button> {' '}
                        <button className="nes-btn is-success" onClick={userCorrect}><div className="textSizer">I was right</div></button> {' '}
                        <button className="nes-btn is-error" onClick={userWrong}><div className="textSizer">I was wrong</div></button> 
                    
                </div>
                }        
        </div>
        <div className="footerContainer">
            <img className="studyHero" src={profile?.characterImage?.imageLocation} alt="Player hero"></img>              
            <img className="dummyBoss" src={'/bosses/dummy.gif'} alt="Player hero"></img>
            <Container className="heroFooterRight is-dark">
                
                <div className="footerStyle textSizer">
                    <div className="textPosition">
                        <text className="textSizer">
                            <h5 className="textSizer">Practice Dummy - Level 1</h5>
                            <b>HP:</b> 
                            <Progress className="progressBars" multi>
                                <Progress bar color="success" value={999999}>{profile.hp} / {profile.maxHP}</Progress>
                                <Progress bar animated color="danger" value={profile.maxHP - profile.hp}></Progress>
                            </Progress> 
                            <b>EXP:</b>  0
                            </text>
                    </div>
                </div>
            </Container>
            <Container className="heroFooterLeft is-dark">
                
                <div className="footerStyle textSizer">
                    <div className="textPosition">  
                        
                    <text className="textSizer">
                            <h5 className="textSizer">{profile?.userName} - Level {profile.level}</h5>
                            <b>HP:</b> {'  '}
                            <Progress className="progressBars" multi>
                                <Progress bar color="success" value={profile.hp}>{profile.hp} / {profile.maxHP}</Progress>
                                <Progress bar animated color="danger" value={profile.maxHP - profile.hp}></Progress>
                            </Progress> 
                            <b>EXP:</b> {' '}
                            <Progress className="progressBars" multi>
                                <Progress bar color="info" value={profile.experience}>{profile.experience} / {profile.expToNextLevel}</Progress>
                                <Progress bar animated color="warning" value={profile.expToNextLevel - profile.experience}></Progress>
                            </Progress>
                        </text>
                    </div>
                </div>
            </Container>
        </div>
        </>
        }
        </>
    )

}

export default StudySet;