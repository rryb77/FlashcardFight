import React, { useContext, useEffect, useState } from "react";
import {FlashCardSetContext} from "../../providers/FlashCardSetProvider"
import { Container } from "nes-react";

const BattleResults = () => {
    const { flashcardSetData } = useContext(FlashCardSetContext);

    useEffect(() => {

    },[])

    return (
        <Container>
            
            <div id="results">
                   You got {flashcardSetData.correctAnswers} out of {flashcardSetData.questionAmount} correct.
            </div>

        </Container>
    )

}

export default BattleResults;