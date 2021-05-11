import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import { Container, Radios, Button } from "nes-react";
import './BattleSet.css'
import '../studysets/Study.css'
import { Progress } from 'reactstrap';


const BattleSet = () => {
    
    const { getFlashcardSetWithQandA, flashcardSetData, setFlashcardSetData } = useContext(FlashCardSetContext);
    const { updateUserCharacter, getUserProfile } = useContext(UserProfileContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const [battleSet, setBattleSet] = useState({});
    const [question, setQuestion] = useState({});
    const [answerChoice, setAnswerChoice] = useState({});
    const [serverUser, setServerUser] = useState({})
    const [profile, setProfile] = useState({})
    const [dmg, setDmg] = useState(0)
    const [shuffled, setShuffled] = useState([])
    const [bossHP, setBossHP] = useState(0)
    const [bossDMG, setBossDMG] = useState(0)
    const [maxBossHP, setMaxBossHP] = useState(0)
    const history = useHistory();  
    const {id} = useParams();
    const [heroAction, setHeroAction] = useState();
    const [bossAction, setBossAction] = useState();
    const [questions, setQuestions] = useState();

    const [HP, setHP] = useState(0)

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setBattleSet)
            .then(() => getUserProfile(currentUser.firebaseUserId))
            .then(setProfile)
    },[])

    // Profile is loaded
    useEffect(() => {
        
        const battleData = {...flashcardSetData}
        battleData.hp = profile.hp
        setFlashcardSetData(battleData)

        setHP(profile.hp)
        setHeroAction(profile?.characterImage?.imageLocation)
        setBossAction(battleSet?.bossImage?.imageLocation)
    }, [profile])

    // Update the user character once the last card was studied
    useEffect(() => {
        if(serverUser.id > 0)
        {
            

            // Send the update and push user to results
            updateUserCharacter(serverUser)
            history.push(`${id}/results`)
            setTheCount(0)
        }
    }, [serverUser])

    useEffect(() => {
        if(battleSet.id > 0)
        {
            setQuestions(battleSet.questions)
        }
    }, [battleSet])

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    // When questions state changes...
    useEffect(() => {
        console.log(questions)
        // If questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {            
            console.log(battleSet)
            // Calculate and assign dmg amount per wrong answer
            setDmg(currentUser.hp / questions.length)
            setBossHP(questions.length * 1000)
            setMaxBossHP(questions.length * 1000)
            
            const battleData = {...flashcardSetData}
            // Populate the flashcard data for details screen
            battleData.questionAmount = questions.length;
            battleData.setId = id;
            battleData.flashcard = battleSet;
            setFlashcardSetData(battleData)

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
            const characterData = {...profile}

            //Build out the user object with new info
            characterData.experience += flashcardSetData.EXPgained
            characterData.hp = flashcardSetData.hp
            characterData.maxHP = profile.maxHP
            characterData.email = profile.email
            characterData.userName = profile.userName

            // Check for character level up
            if(characterData.experience >= characterData.expToNextLevel)
            {
                let levelScale = characterData.expToNextLevel * 2.1
                let hpScale = characterData.hp * 1.4
                characterData.expToNextLevel = Math.round(levelScale)
                characterData.hp = Math.round(hpScale)
                characterData.maxHP = Math.round(hpScale)
                characterData.level += 1
            }

            setServerUser(characterData)
        }
    },[theCount])

    const heroAttack = () => {
        setTimeout(() => { 
            setBossAction(battleSet.bossImage.hurt);
            setBossHP(() => bossHP - 1000);

            const battleData = {...flashcardSetData};
            battleData.dmgDone += 1000;
            battleData.correctAnswers += 1;
            battleData.EXPgained += 40;
            setFlashcardSetData(battleData);

            setHeroAction(profile.characterImage.imageLocation)
            
            
        }, 500);

        setTimeout(() => {
            
            if(bossHP !== 0)
            {
                setBossAction(battleSet.bossImage.imageLocation)
            }

            setTheCount(theCount => theCount + 1)
            
        }, 1100);
    }

    const bossAttack = () => {
        
        const battleData = {...flashcardSetData}

        setTimeout(() => {
            // Character death check
            if(battleData.hp <= 0)
            {
                battleData.hp = 0
            }
            else
            {
                setHeroAction(profile.characterImage.hurt)

                const battleData = {...flashcardSetData}
                battleData.wrongAnswers += 1;
                battleData.dmgTaken += dmg
                battleData.hp -= Math.round(dmg)                
                battleData.experience = profile.experience
                battleData.expToNextLevel = profile.expToNextLevel
                battleData.level = profile.level
                battleData.maxHP = profile.maxHP
                battleData.email = profile.email
                battleData.userName = profile.userName
                setFlashcardSetData(battleData)
                
                // Boss reset to idle animation
                setBossAction(battleSet.bossImage.imageLocation)

                // Update the HP on the DOM
                setHP(battleData.hp)

                // Increase count so the next question can be put on the DOM
                setTheCount(theCount => theCount + 1)

                // Update the serverside with current character state
                updateUserCharacter(battleData)
            }
        }, 700);
        
        setTimeout(() => {
            
            if(battleData.hp === 0)
            {
                setHeroAction(profile.characterImage.death)
                gameOver()
            }
            else
            {
                setHeroAction(profile.characterImage.imageLocation)
            }
            
        }, 1000);
    }

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
            setHeroAction(profile.characterImage.attack)
            heroAttack()
            
        }
        // Wrong
        else if(answerChoice.correct === false)
        {
            setBossAction(battleSet.bossImage.attack)
            bossAttack()
        }
    }

    // User HP hit 0
    const gameOver = () => {
        
        const battleData = {...flashcardSetData}
        battleData.experience = profile.experience
        battleData.expToNextLevel = profile.expToNextLevel
        battleData.level = profile.level
        battleData.hp = 0
        battleData.maxHP = profile.maxHP
        battleData.email = profile.email
        battleData.userName = profile.userName
        setFlashcardSetData(battleData)

        setTimeout(() => {
            updateUserCharacter(battleData)
            history.push(`${id}/results`)
            setTheCount(0)
        }, 700)
    }

    return (
        <div className="battleContainer BGsizer">
            {!profile?.characterImage?.imageLocation && !battleSet?.boss?.imageLocation ?
            <img className="loadingHero" src={'/characters/Guy1Run.gif'} alt="Player hero"></img>
            :
                <>
                
                <div className="battleQuestionContainer nes-container with-title is-dark">
                <h2 className="title"><text className="textSizer">Battle!</text></h2>
                    <div id="question">
                        <text className="textSizer">Question: {question?.questionText}<p></p></text>
                    </div>

                    <div id="answers">
                        Choices:
                        <p></p>
                        <div>
                            { 
                                shuffled?.map(a => (
                                    <div key={a.id}>
                                        <label>
                                            <input type="radio" className="nes-radio" name="answer" onChange={() => setAnswerChoice(a)}/>
                                            <span >{a.answerText}</span>
                                        </label> 
                                    </div>
                                ))
                            }
                            
                        </div>
                        <button type="button right" className="nes-btn is-normal nes-cursor" onClick={checkAnswer}>Submit</button>
                    </div>
                </div>

                <div className="footerContainer">
                    <img className="studyHero" src={heroAction} alt="Player hero"></img>              
                    <img className="boss" src={bossAction} alt="Player hero"></img>
                    <Container className="battleFooterRight is-dark">
                        
                        <div className="footerStyle textSizer">
                            <div className="textPosition">
                            <text className="textSizer">
                            <h5 className="textSizer">{battleSet.title} - Level {Math.round(profile.level * 1.7 * battleSet.difficultyId)}</h5>
                                    <b>HP:</b> {'  '}
                                    <Progress className="progressBars" multi>
                                        <Progress bar color="success" value={bossHP}>{bossHP} / {questions.length * 1000}</Progress>
                                        <Progress bar animated color="danger" value={maxBossHP - bossHP}></Progress>
                                    </Progress> 
                                    <b>EXP:</b>  
                                <Progress className="progressBars" multi>
                                    <Progress bar color="info" value={0}>???</Progress>
                                    <Progress bar animated color="warning" value={100}>???</Progress>
                                </Progress>
                            </text>
                            </div>
                        </div>
                    </Container>
                    <Container className="battleFooterLeft is-dark">
                        
                        <div className="footerStyle textSizer">
                            <div className="textPosition">  
                                
                            <text className="textSizer">
                                <h5 className="textSizer">{profile?.userName} - Level {profile.level}</h5>
                                <b>HP:</b> {'  '}
                                <Progress className="progressBars" multi>
                                    <Progress bar color="success" value={HP}>{HP} / {profile.maxHP}</Progress>
                                    <Progress bar animated color="danger" value={profile.maxHP - HP}></Progress>
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
        </div>
    )

}

export default BattleSet;