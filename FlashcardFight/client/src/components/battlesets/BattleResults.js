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
        <Container>
            
            <div id="results">
                <h1>Battle Results For {flashcardSetData.flashcard.title}</h1>
                You got {flashcardSetData.correctAnswers} out of {flashcardSetData.questionAmount} correct.
                <br></br>
                {/* {message()} */}
                <br></br>
                <b>Accuracy:</b> {percentage}%
                <br></br>
                {percentage === 100 ?
                <b>EXP Gained: +{flashcardSetData.EXPgained}</b>
                :
                <b>EXP Gained: 0</b>
                }
                <br></br>
                <Button type="button" color="info" onClick={() => history.push(`/study/${flashcardSetData.setId}`)}>Study Again</Button> {'  '} <Button color="danger" onClick={() => history.push(`/battle/${flashcardSetData.setId}`)}>Battle</Button>
            </div>

        </Container>
    )

}

export default BattleResults;