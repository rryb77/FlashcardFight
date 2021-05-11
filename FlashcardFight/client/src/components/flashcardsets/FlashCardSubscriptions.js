import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import {
    Badge,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
    Tooltip
} from "reactstrap";
import { Button } from "nes-react"

const FlashCardSubscriptions = () => {
    const { flashcards, setFlashcards, getAllFlashcardUserSubs } = useContext(FlashCardSetContext);
    const {DeleteSubscription} = useContext(SubscriptionContext)
    const {getUserProfileById} = useContext(UserProfileContext);
    const [profile, setProfile] = useState({});
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);


    const {id} = useParams();
    const history = useHistory();

    // Initial load - get the flashcard sets the user is subscribed to
    useEffect(() => {
        getUserProfileById()
            .then(setProfile)
        getAllFlashcardUserSubs(id).then(setFlashcards)
    }, []);


    // Study button was clicked
    const study = (id) => {
        history.push(`/study/${id}`);
    }

    // Battle button was clicked
    const battle = (id) => {
        history.push(`/battle/${id}`);
    }

    // Details button was clicked
    const details = (id) => {
        history.push(`/flashcards/details/${id}`);
    }

    // Unsubscribe button was clicked
    const unsubscribe = (flashcard) => {

        DeleteSubscription(flashcard.subId)
            .then(() => getAllFlashcardUserSubs(id))
            .then(setFlashcards)
    }

    return (
        <div>
            <div className="background">
                <div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div>
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
                                            <Button type="button" className="is-primary" onClick={() => study(flashcard.id)}>Study</Button> {'  '} 
                                            {profile.hp > 0 ?
                                                <Button className="is-error" onClick={() => battle(flashcard.id)}>Battle!</Button>
                                            :
                                                <span>
                                                    <Button className="is-disabled" id={"Tooltip-" + flashcard.id}>Battle!</Button>
                                                    <Tooltip
                                                        placement={"top"}
                                                        isOpen={tooltipOpen}
                                                        target={"Tooltip-" + flashcard.id}
                                                        toggle={toggle}
                                                    >
                                                        You need to heal first. Use items at Home or study more to gain health items!
                                                    </Tooltip>
                                                </span>
                                            }
                                            
                                            <Button type="button" className="right" onClick={() => details(flashcard.id)}>Details</Button>
                                            <Button type="button" className="is-success right" onClick={() => unsubscribe(flashcard)}>Unsubscribe</Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default FlashCardSubscriptions;