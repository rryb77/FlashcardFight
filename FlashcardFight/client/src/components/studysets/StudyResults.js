import React, { useContext, useEffect, useState } from "react";
import {FlashCardSetContext} from "../../providers/FlashCardSetProvider"
import {ItemContext} from "../../providers/ItemProvider"
import {UserItemContext} from '../../providers/UserItemProvider'
import { useHistory } from 'react-router-dom';
import { Container } from "nes-react";
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

const StudyResults = () => {
    const { flashcardSetData } = useContext(FlashCardSetContext);
    const { getAllItems, setItems, items } = useContext(ItemContext);
    const { addUserItem } = useContext(UserItemContext);
    const [itemFound, setItemFound] = useState({})

    const history = useHistory();

    useEffect(() => {
        getAllItems()
            .then(setItems)
    }, [])

    // Odds of items being found
    useEffect(() => {
        if(items.length > 0)
        {
            console.log(items)
            const randomChance = Math.floor(Math.random() * 101);
            if(randomChance >= 90)
            {
                setItemFound(items[0])
            }
            else if(randomChance >= 70)
            {
                setItemFound(items[1])
            }
            else if(randomChance >= 30)
            {
                setItemFound(items[2])
            }
            else
            {
                const noItemFound = {
                    name: "Nothing was found..."

                }

                setItemFound(noItemFound)
            }
        }
    }, [items])

    useEffect(() => {
        if(itemFound.id !== undefined && itemFound.name !== "Nothing was found...")
        {
            const userItemToAdd = {
                UserId: flashcardSetData.userId,
                ItemId: itemFound.id
            }
           
            addUserItem(userItemToAdd)
        }
    }, [itemFound])

    const percentage = (100 * flashcardSetData.correctAnswers) / flashcardSetData.questionAmount

    const message = () => {

        if(percentage === 100)
        {
            return "WOW! Your training was flawless! You should battle the boss."
        }
        else if (percentage >= 90)
        {
            return "Great job! You're training is going very well. I think you can take on the boss, but you may want to quickly review the questions you missed first."
        }
        else if(percentage >= 70)
        {
            return "You trained hard, and it's paying off! If you're feeling bold you can give the boss battle a shot."
        }
        else if(percentage >= 60)
        {
            return "You're getting closer to your goal! Keep pushing, and you'll be ready to take down the boss soon."
        }
        else if(percentage >= 40)
        {
            return "It looks like you need quite a bit more training. Don't worry, you'll see the results from it quickly!"
        }
        else if(percentage >= 10)
        {
            return "Ouch. Training is tougher than you thought huh? No worries. We all start somewhere and with some practice you can do this."
        }
        else
        {
            return "Well, on the plus side the dummy target doesn't hit back! Keep training and you will improve greatly!"
        }
    }

    return (
        
        <div className="resultsBackground row justify-content-center">
        <div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div><div class="firefly"></div>
            
        <Container className="resultsContainer is-dark">
            <div id="results">
                <h1>Training Results For {flashcardSetData.flashcard.title}</h1>
                You got {flashcardSetData.correctAnswers} out of {flashcardSetData.questionAmount} correct.
                <br></br>
                {message()}
                <br></br>
                Item Found: {itemFound.name}
                <br></br>
                <b>Accuracy:</b> {percentage}%
                <br></br>
                <b>EXP Gained:</b> +{flashcardSetData.EXPgained}
                <br></br>
                <Button type="button" color="info" onClick={() => history.push(`/study/${flashcardSetData.setId}`)}>Study Again</Button> {'  '} <Button color="danger" onClick={() => history.push(`/battle/${flashcardSetData.setId}`)}>Battle</Button>
            </div>
        </Container>
        </div>
    )

}

export default StudyResults;