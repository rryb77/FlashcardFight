import React, { useContext, useEffect, useState } from "react";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import {UserProfileContext} from '../../providers/UserProfileProvider'
import './FlashCardList.css'
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  Tooltip
} from "reactstrap";
import { Button } from "nes-react"
import { useHistory } from "react-router-dom";


const FlashCardUserList = () => {
    
    const { flashcards, setFlashcards, getAllUserFlashcards } = useContext(FlashCardSetContext);
    const {getUserProfileById} = useContext(UserProfileContext);
    const [profile, setProfile] = useState({});
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    // Initial load - Get flashcard sets that user created
    useEffect(() => {
        getUserProfileById()
                .then(setProfile)
        getAllUserFlashcards().then(setFlashcards)
    }, []);

    const history = useHistory();

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

  return (
    <div>
        <div className="background">
            <div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div>
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
                                        {profile?.hp > 0 ?
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

export default FlashCardUserList;