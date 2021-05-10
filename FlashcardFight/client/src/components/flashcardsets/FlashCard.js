import React, {useContext} from "react";
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
import { Container } from "nes-react";
import './FlashCard.css';
import { useHistory } from 'react-router-dom';

const FlashCard = ({flashcard}) => {
        
    const history = useHistory();

    let difficultyCSS = ""

    // Study button was clicked
    const study = (id) => {
        history.push(`study/${id}`);
    }

    // Battle button was clicked
    const battle = (id) => {
        history.push(`battle/${id}`);
    }

    // Details button was clicked
    const details = (id) => {
        history.push(`flashcards/details/${id}`);
    }

    // Add proper difficulty CSS to each card
    if(flashcard.difficulty.name === "Beginner")
    {
        difficultyCSS = "success"
    }
    else if(flashcard.difficulty.name === "Intermediate")
    {
        difficultyCSS = "warning"
    }
    else
    {
        difficultyCSS = "danger"
    }

    return (
        <Card className="m-4">
                <CardBody>
                    <CardTitle tag="h2">
                        <strong> {flashcard.title}</strong><Badge color={`${difficultyCSS}`} className="right pill">{flashcard.difficulty.name}</Badge>
                    </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <br></br>
                        Creator: {flashcard.userProfile.userName}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Category: {flashcard.category.name}
                    </CardSubtitle>
                    <br></br>
                    Description: {flashcard.description}
                </CardBody>
                <CardFooter>
                    <Button type="button" color="info" onClick={() => study(flashcard.id)}>Study</Button> {'  '} <Button color="danger" onClick={() => battle(flashcard.id)}>Battle</Button>
                    <Button type="button" color="secondary" className="right" onClick={() => details(flashcard.id)}>Details</Button>
                </CardFooter>
            </Card>
    );
}

export default FlashCard;