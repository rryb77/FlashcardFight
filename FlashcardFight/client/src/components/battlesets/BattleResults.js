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
} from "reactstrap";

const BattleResults = () => {
    const { flashcardSetData } = useContext(FlashCardSetContext);

    const history = useHistory();
    const percentage = (100 * flashcardSetData.correctAnswers) / flashcardSetData.questionAmount


    return (
        <div className="resultsBackground row justify-content-center">
        <div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div>
            
        <Container className="resultsContainer is-dark">
            <div id="results">
                <h1>Training Results For {flashcardSetData.flashcard.title}</h1>
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
        </div>
    )

}

export default BattleResults;