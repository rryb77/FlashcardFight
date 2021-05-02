import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { Container } from "nes-react";

const StudySet = () => {
    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    let { theCount, setTheCount } = useContext(QuestionContext);
    const [battleSet, setBattleSet] = useState({})
    const [question, setQuestion] = useState({})
    const history = useHistory();  
    const {id} = useParams();

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setBattleSet)
    },[])

    return (
        <Container>
            
        </Container>
    )

}

export default StudySet;