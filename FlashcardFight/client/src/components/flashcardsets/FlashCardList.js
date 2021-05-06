import React, { useContext, useEffect, useState } from "react";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import FlashCard from "./FlashCard";
import { useHistory } from 'react-router-dom';
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
import {SubscriptionContext} from '../../providers/SubscriptionProvider'

const FlashCardList = () => {
    const { flashcards, setFlashcards, getAllWithoutUserSubscriptions } = useContext(FlashCardSetContext);
    const {AddSubscription} = useContext(SubscriptionContext)

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    useEffect(() => {
        getAllWithoutUserSubscriptions(currentUser.id)
            .then(setFlashcards)
    }, []);
    

    const history = useHistory();


    const study = (id) => {
    history.push(`study/${id}`);
    }

    const battle = (id) => {
        history.push(`battle/${id}`);
    }

    const details = (id) => {
        history.push(`flashcards/details/${id}`);
    }

    const subscribe = (flashcard) => {
        const subscription = {
            UserId: parseInt(currentUser.id),
            FlashCardSetId: flashcard.id
        }

        AddSubscription(subscription)
            .then(() => getAllWithoutUserSubscriptions(currentUser.id))
            .then(setFlashcards)
    }

  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                {
                    flashcards.map((flashcard) => (
                      flashcard.creatorId !== currentUser.id ?
                        <Card className="m-4">
                            <CardBody>
                                <CardTitle tag="h2">
                                    <strong> {flashcard.title}</strong>
                                    <Badge className="right pill">{flashcard.difficulty.name}</Badge>
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
                                <Button type="button" color="success" className="right" onClick={() => subscribe(flashcard)}>Subscribe</Button>
                            </CardFooter>
                        </Card>
                        :
                        null
                    ))
                }
                </div>
            </div>
        </div>
    </>
  );
};

export default FlashCardList;