import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { Container } from "nes-react"

const FlashCardEdit = () => {

    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    const [flashcardSet, setFlashcardSet] = useState({});

    const history = useHistory();  
    const {id} = useParams();

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setFlashcardSet)
    },[])

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Container>
                    Title: {flashcardSet.title}
                    Description: {flashcardSet.description}
                    Category: {flashcardSet.category.name}
                    Difficulty: {flashcardSet.difficulty.name}
                </Container>

                <Container>

                </Container>
            </div>
        </div>
    )
}

export default FlashCardEdit