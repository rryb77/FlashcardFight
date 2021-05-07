import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import './Study.css';
import { Container } from "nes-react";
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
    const { updateUserCharacter, getUserProfile } = useContext(UserProfileContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const {id} = useParams();
    const [studySet, setStudySet] = useState({});
    const [question, setQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [hiddenAnswer, setHiddenAnswer] = useState(true);
    const [serverUser, setServerUser] = useState({})
    const [profile, setProfile] = useState({})
    const history = useHistory();  

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then((res) => {
                setStudySet(res)
                setQuestions(res.questions)
            })
            .then(() => getUserProfile(currentUser.firebaseUserId))
            .then((res) => setProfile(res))
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


    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    // Grab the correct answer for each question
    let correct = question?.answers?.find(a => a.correct === true)


    // When questions state changes...
    useEffect(() => {
        // if questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {
            flashcardSetData.questionAmount = questions.length;
            flashcardSetData.setId = parseInt(id);
            flashcardSetData.flashcard = studySet;
            setQuestion(() => questions[theCount]);
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


    if(!question)
    {
        return null
    }


    return (
        <>
        {!profile?.characterImage?.imageLocation ?
        null
        :
        <div className="studyBattleContainer BGsizer">
                <Container className="heroContainer">
                    <img className="playerHero" src={profile?.characterImage?.imageLocation} alt="Player hero"></img>
                    <Container>
                        <b>HP:</b> {profile.hp} <br></br>
                        <b>EXP:</b> {profile.experience} <br></br>
                        <b>Level:</b> {profile.level}
                    </Container>
                </Container>
                
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

                <Container>
                    <img className="playerHero" src={'/bosses/dummy.gif'} alt="Player hero"></img>
                    <Container>
                        <b>HP:</b> 99999 <br></br>
                        <b>EXP:</b> 0 <br></br>
                        <b>Level:</b> 1
                    </Container>
                </Container>
                {/* <img className="studyHero" src={profile?.characterImage?.imageLocation} alt="Player hero"></img>              
                <img className="dummyBoss" src={'/bosses/dummy.gif'} alt="Player hero"></img> */}
        </div>
        }
        </>
    )

}

export default StudySet;