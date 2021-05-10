import React, { useContext, useEffect, useState } from "react";
import {FlashCardSetContext} from "../../providers/FlashCardSetProvider"
import { useHistory } from 'react-router-dom';
import { Container } from "nes-react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
    Progress
} from "reactstrap";

const BattleResults = () => {
    const { flashcardSetData } = useContext(FlashCardSetContext);

    const history = useHistory();
    const percentage = (100 * flashcardSetData.correctAnswers) / flashcardSetData.questionAmount
    const [heroAction, setHeroAction] = useState()

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);
    
    useEffect(() => {
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
                    <h1>Training Results For {flashcardSetData.flashcard.title}</h1>
                    {/* <img className="resultsHero" src={heroAction} alt="Player hero"></img> */}
                    <br></br>
                    You got {flashcardSetData.correctAnswers} out of {flashcardSetData.questionAmount} correct.
                    <br></br>
                    
                    
                    {/* <b>Item Found:</b> {itemFound.name} */}
                    <br></br>
                    <b>Accuracy:</b> {percentage}%
                    <br></br>
                    <b>Damage Done:</b> {flashcardSetData.dmgDone}
                    <br></br>
                    <b>Damage Taken:</b> {flashcardSetData.dmgTaken}
                    <br></br>
                    <b>EXP Gained:</b> +{flashcardSetData.EXPgained}
                    <br></br>
                    <Button type="button" color="info" onClick={() => history.push(`/study/${flashcardSetData.setId}`)}>Study More</Button> {'  '} <Button color="danger" onClick={() => history.push(`/battle/${flashcardSetData.setId}`)}>Battle Again</Button>
                </div>
            </Container>

            <div className="footerContainer">
                    <img className="studyHero" src={heroAction} alt="Player hero"></img>              
                    {/* <img className="boss" src={bossAction} alt="Player hero"></img> */}
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