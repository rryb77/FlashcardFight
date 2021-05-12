import React, { useContext, useEffect, useState } from "react";
import {FlashCardSetContext} from "../../providers/FlashCardSetProvider"
import { useHistory } from 'react-router-dom';
import { Container } from "nes-react";
import { Button} from "reactstrap";

const BattleResults = () => {
    const { flashcardSetData, setFlashcardSetData } = useContext(FlashCardSetContext);

    const history = useHistory();
    const [heroAction, setHeroAction] = useState()
    const [resultData, setResultData] = useState({})

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);
    
    const percentage = (100 * resultData.correctAnswers) / resultData.questionAmount

    useEffect(() => {
        
        // Create a copy of the flashcardSetData object to be used in the JSX
        const dataCopy = {...flashcardSetData}
        setResultData(dataCopy)

        // Create a copy of the flashcard set data object so I can properly reset it
        const dataReset = {...flashcardSetData}
            
        // Set all properties to 0
        dataReset.questionAmount = 0
        dataReset.correctAnswers = 0
        dataReset.wrongAnswers = 0
        dataReset.dmgDone = 0
        dataReset.dmgTaken = 0
        dataReset.setId = 0
        dataReset.EXPgained = 0
        dataReset.HP = 0
        dataReset.Level = 0
        dataReset.ExpToNextLevel = 0
        
        // Update the flashcard set data object with the
        setFlashcardSetData(dataReset)


        if(percentage === 0)
        {
            setHeroAction(currentUser.characterImage.death)
        }
        else if(percentage === 100)
        {
            setHeroAction(currentUser.characterImage.victory)
        }
        else
        {
            setHeroAction(currentUser.characterImage.imageLocation)
        }
    },[])

    return (
        <div className="battleResultsContainer row justify-content-center">
                
            <Container className="resultsContainer is-dark">
                <div id="results">
                    <h1>Training Results For {resultData?.flashcard?.title}</h1>
                    <br></br>
                    You got {resultData?.correctAnswers} out of {resultData?.questionAmount} correct.
                    <br></br>       
                    <br></br>
                    <b>Accuracy:</b> {percentage}%
                    <br></br>
                    <b>Damage Done:</b> {resultData?.dmgDone}
                    <br></br>
                    <b>Damage Taken:</b> {resultData?.dmgTaken}
                    <br></br>
                    <b>EXP Gained:</b> +{resultData?.EXPgained}
                    <br></br>
                    <Button type="button" color="info" onClick={() => history.push(`/study/${resultData?.setId}`)}>Study More</Button> {'  '} <Button color="danger" onClick={() => history.push(`/battle/${resultData?.setId}`)}>Battle Again</Button>
                </div>
            </Container>

            <div className="footerContainer">
                    <img className="studyHero" src={heroAction} alt="Player hero"></img>              
                    <Container className="battleFooterRight is-dark">
                        
                        <div className="footerStyle textSizer">
                            <div className="textPosition">
                            <text className="textSizer">
                            <h5 className="textSizer"></h5>
                                    <b>HP:</b> {'  '}
                            
                                    <b>EXP:</b>  
                                
                            </text>
                            </div>
                        </div>
                    </Container>
                    <Container className="battleFooterLeft is-dark">
                        
                        <div className="footerStyle textSizer">
                            <div className="textPosition">  
                                
                            <text className="textSizer">
                                <h5 className="textSizer">{currentUser.userName} - Level {currentUser.level}</h5>
                                <b>HP:</b> {'  '}
                                
                                <b>EXP:</b> {' '}
                                
                            </text>
                            </div>
                        </div>
                    </Container>
                </div>
        </div>
    )

}

export default BattleResults;