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
import {CategoryContext} from '../../providers/CategoryProvider'
import {DifficultyContext} from '../../providers/DifficultyProvider'
import './FlashCardList.css'

const FlashCardList = () => {
    const { flashcards, setFlashcards, getAllWithoutUserSubscriptions, getAllWithoutUserSubsByCategory, 
        getAllWithoutUserSubsByDifficulty, getAllWithoutUserSubsByDifficultyAndCategory } = useContext(FlashCardSetContext);
    const { getAllCategories } = useContext(CategoryContext);
    const { getAllDifficulties } = useContext(DifficultyContext);
    const [difficulties, setDifficulties] = useState([])
    const [categories, setCategories] = useState([])
    const [catFilter, setCatFilter] = useState(0)
    const [difFilter, setDifFilter] = useState(0)
    const [theFilters, setTheFilters] = useState({
        difficultyId: 0,
        categoryId: 0,
    })
    const {AddSubscription} = useContext(SubscriptionContext)

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);


    // Initial load
    useEffect(() => {
        getAllWithoutUserSubscriptions(currentUser.id)
            .then(setFlashcards)
            .then(getAllCategories)
            .then(setCategories)
            .then(getAllDifficulties)
            .then(setDifficulties)
    }, []);


    // Update the category filter
    useEffect(() => {

        setTheFilters((prevState) => {
            let filter = {
                ...prevState
            }

            filter.categoryId = parseInt(catFilter)
            return filter
        })

    }, [catFilter])


    // Update the difficulty filter
    useEffect(() => {
       
        setTheFilters((prevState) => {
            let filter = {
                ...prevState,
            }
            filter.difficultyId = parseInt(difFilter)
            return filter
        })
        
    }, [difFilter])

    
    // Return the filtered results
    useEffect(() => {

        if(theFilters.categoryId > 0 && theFilters.difficultyId > 0)
        {
            getAllWithoutUserSubsByDifficultyAndCategory(currentUser.id, theFilters.difficultyId, theFilters.categoryId)
                .then(setFlashcards)
        }
        else if(theFilters.categoryId > 0 && theFilters.difficultyId === 0)
        {
            getAllWithoutUserSubsByCategory(currentUser.id, theFilters.categoryId)
                .then(setFlashcards)
        }
        else if(theFilters.categoryId === 0 && theFilters.difficultyId === 0)
        {
            getAllWithoutUserSubscriptions(currentUser.id)
                .then(setFlashcards)
        }
        else if(theFilters.categoryId === 0 && theFilters.difficultyId > 0)
        {
            getAllWithoutUserSubsByDifficulty(currentUser.id, difFilter)
                .then(setFlashcards)
        }

    }, [theFilters])


    const history = useHistory();

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

    // Subscribe button was clicked
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
    <div className="background">
        <div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div>
            <div className="container justify-content-center">
                
                <div className="filterContainer row justify-content-center">
                    <div className="nes-select">
                        <br></br>
                        <b>Filter By Category: </b>
                            <select required id="category" onChange={(e) => setCatFilter(e.target.value)}>
                                <option key="categoryList" value={0} selected>Show All</option>
                                {categories?.length > 0 ?                                   
                                    categories.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))
                                    :
                                    null
                                }
                            </select>
                    </div>
                
                    <div className="nes-select">
                        <br></br>
                        <b>Filter By Difficulty:</b> 
                            <select required id="difficulty" onChange={(e) => setDifFilter(e.target.value)}>
                                <option key="difficultyList" value={0} selected>Show All</option>
                                {difficulties?.length > 0 ?                                   
                                    difficulties.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))
                                    :
                                    null
                                }
                            </select>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="cards-column">
                    <br></br>
                
                
                    {
                        flashcards.map((flashcard) => (
                        flashcard.creatorId !== currentUser.id ?
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
        </div>
    </>
  );
};

export default FlashCardList;