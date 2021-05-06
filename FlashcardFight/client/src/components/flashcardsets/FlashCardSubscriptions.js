import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';
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

const FlashCardSubscriptions = () => {
    const { flashcards, setFlashcards, getAllFlashcardUserSubs } = useContext(FlashCardSetContext);
    const {DeleteSubscription} = useContext(SubscriptionContext)

    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        getAllFlashcardUserSubs(id).then(setFlashcards)
    }, []);

    const study = (id) => {
        history.push(`/study/${id}`);
    }

    const battle = (id) => {
        history.push(`/battle/${id}`);
    }

    const details = (id) => {
        history.push(`/flashcards/details/${id}`);
    }

    const unsubscribe = (flashcard) => {

        DeleteSubscription(flashcard.subId)
            .then(() => getAllFlashcardUserSubs(id))
            .then(setFlashcards)
    }

    return (
        <>
            <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                {
                    flashcards.map((flashcard) => (
                      
                        <Card className="m-4">
                            <CardBody>
                                <CardTitle tag="h2">
                                    <strong> {flashcard.title}</strong>
                                    {flashcard.difficulty.name === 'Beginner' ?
                                        <Badge color={'success'}className="right pill">{flashcard.difficulty.name}</Badge>
                                        :
                                        null
                                    }
                                    {flashcard.difficulty.name === 'Intermediate' ?
                                        <Badge color={'warning'}className="right pill">{flashcard.difficulty.name}</Badge>
                                        :
                                        null
                                    }
                                    {flashcard.difficulty.name === 'Expert' ?
                                        <Badge color={'danger'}className="right pill">{flashcard.difficulty.name}</Badge>
                                        :
                                        null
                                    }
                                </CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <br></br>
                                    Author: {flashcard.userProfile.userName}
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
                                <Button type="button" color="success" className="right" onClick={() => unsubscribe(flashcard)}>Unsubscribe</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
                </div>
            </div>
        </div>
        </>
    );
};

export default FlashCardSubscriptions;