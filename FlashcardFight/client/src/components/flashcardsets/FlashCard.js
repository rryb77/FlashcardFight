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
import {SubscriptionContext} from '../../providers/SubscriptionProvider'

const FlashCard = ({flashcard}) => {
    
    const {AddSubscription} = useContext(SubscriptionContext)

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);
    
    const history = useHistory();

    let difficultyCSS = ""

    const study = (id) => {
        history.push(`study/${id}`);
    }

    const battle = (id) => {
        history.push(`battle/${id}`);
    }

    const details = (id) => {
        history.push(`flashcards/details/${id}`);
    }

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