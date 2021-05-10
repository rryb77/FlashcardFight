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
    
    useEffect(() => {
        if(percentage === 0)
        {
            setHeroAction('/characters/Guy1Death.gif')
        }
        else if(percentage === 100)
        {
            setHeroAction('/characters/Guy1Victory.gif')
        }
        else
        {
            setHeroAction('/characters/Guy1.gif')
        }
    },[])

    return (
        <div className="resultsBackground row justify-content-center">
            <div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div>
                
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
                                <h5 className="textSizer">Name here - Level Whatever</h5>
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