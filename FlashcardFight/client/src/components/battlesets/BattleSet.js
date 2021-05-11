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

    // Once profile is in state
    useEffect(() => {
        
        // Create a copy of the flashcardSetData object
        const battleData = {...flashcardSetData}
        // Add the player HP to the new object
        battleData.hp = profile.hp

        // Update the flashcardSetData object
        setFlashcardSetData(battleData)

        // Set initial HP for the user character
        setHP(profile.hp)

        // Set the initial image for the user character
        setHeroAction(profile?.characterImage?.imageLocation)

        // Set the initial image for the boss character
        setBossAction(battleSet?.bossImage?.imageLocation)
    }, [profile])

    // Update the user character once the last card was studied
    useEffect(() => {
        if(serverUser.id > 0)
        {
            // Send the update and push user to results
            updateUserCharacter(serverUser)
            history.push(`${id}/results`)

            // reset theCount to 0
            setTheCount(0)
        }
    }, [serverUser])

    useEffect(() => {
        if(battleSet.id > 0)
        {
            // battle set is in state so set the questions
            setQuestions(battleSet.questions)
        }
    }, [battleSet])

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    // When questions state changes...
    useEffect(() => {
        // If questions isn't undefined and ONLY when the count is equal to 0 then..
        if(questions !== undefined && theCount === 0)
        {            
            // Calculate and assign dmg amount per wrong answer
            setDmg(currentUser.hp / questions.length)

            // Calculate and assign the initial boss HP amount
            setBossHP(questions.length * 1000)

            // Set the max HP for the boss
            setMaxBossHP(questions.length * 1000)
            
            // Create a copy of the flashcardSetData object
            const battleData = {...flashcardSetData}

            // Populate the flashcard data for details screen
            battleData.questionAmount = questions.length;
            battleData.setId = id;
            battleData.flashcard = battleSet;

            // Update the flashcardSetData object
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
            // Create a copy of the profile object
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
                // Calculate new experience to next level amount
                let levelScale = characterData.expToNextLevel * 2.1

                // Calculate new user HP/maxHP
                let hpScale = characterData.hp * 1.4

                // Add updated properties to the characterData object
                characterData.expToNextLevel = Math.round(levelScale)
                characterData.hp = Math.round(hpScale)
                characterData.maxHP = Math.round(hpScale)
                characterData.level += 1
            }

            // Send the new data to be saved to the DB
            setServerUser(characterData)
        }
    },[theCount])

    const heroAttack = () => {
        
        // Time the image and data changes properly
        setTimeout(() => { 
            // Change the boss image to hurt
            setBossAction(battleSet.bossImage.hurt);
            // Update boss HP
            setBossHP(() => bossHP - 1000);

            // Create a copy of the flashcardSetData object
            const battleData = {...flashcardSetData};
            
            // Update the properties of the new object
            battleData.dmgDone += 1000;
            battleData.correctAnswers += 1;
            battleData.EXPgained += 40;

            // Update the flashcardSetData object with the new data
            setFlashcardSetData(battleData);

            // Set the hero image back to default state
            setHeroAction(profile.characterImage.imageLocation)
            
            
        }, 500);

        // Time the changes back to default state properly
        setTimeout(() => {
            
            // If the boss wasn't defeated
            if(bossHP !== 0)
            {
                // Set the boss image back to default state
                setBossAction(battleSet.bossImage.imageLocation)
            }

            // Increase theCount so the next question is shown
            setTheCount(theCount => theCount + 1)
            
        }, 1100);
    }

    const bossAttack = () => {
        
        // Create a copy of the flashcardSetData object
        const battleData = {...flashcardSetData}

        // Time the image and data updates properly
        setTimeout(() => {
            // Character death check
            if(battleData.hp <= 0)
            {
                battleData.hp = 0
            }
            else
            {
                // Set the user character image to hurt
                setHeroAction(profile.characterImage.hurt)

                // Update the properties on the new object
                battleData.wrongAnswers += 1;
                battleData.dmgTaken += dmg
                battleData.hp -= Math.round(dmg)                
                battleData.experience = profile.experience
                battleData.expToNextLevel = profile.expToNextLevel
                battleData.level = profile.level
                battleData.maxHP = profile.maxHP
                battleData.email = profile.email
                battleData.userName = profile.userName

                // Set the flashcardSetData object with the new properties above
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
            
            // User character death check
            if(battleData.hp === 0)
            {
                // Set user character image to death
                setHeroAction(profile.characterImage.death)
                
                // Call gameOver to end the battle session
                gameOver()
            }
            else
            {
                // Set the user character image back to default state
                setHeroAction(profile.characterImage.imageLocation)
            }
            
        }, 1000);
    }

    // Check if the user was right or wrong
    const checkAnswer = () => {

        // Correct
        if(answerChoice.correct === true)
        {
            // Set the user character image to attack
            setHeroAction(profile.characterImage.attack)
            
            // Call heroAttack to handle image and data updates
            heroAttack()
            
        }
        // Wrong
        else if(answerChoice.correct === false)
        {
            // Set the boss character image to attack
            setBossAction(battleSet.bossImage.attack)

            // Call bossAttack to handle image and data updates
            bossAttack()
        }
    }

    // User HP hit 0
    const gameOver = () => {
        
        // Create a copy of the flashcardSetData object
        const battleData = {...flashcardSetData}
        
        // Update the needed properties of the new object
        battleData.experience = profile.experience
        battleData.expToNextLevel = profile.expToNextLevel
        battleData.level = profile.level
        battleData.hp = 0
        battleData.maxHP = profile.maxHP
        battleData.email = profile.email
        battleData.userName = profile.userName

        // Set changed properties on the flashcardSetData object
        setFlashcardSetData(battleData)

        // Simple timeout to allow the final hit to take place
        setTimeout(() => {
            // Update the API with the new character properties and then push to the results
            updateUserCharacter(battleData)
            history.push(`${id}/results`)

            // Reset the count
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