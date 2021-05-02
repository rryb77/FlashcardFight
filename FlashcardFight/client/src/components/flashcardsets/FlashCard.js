import React from "react";
import {
    
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { Container, Button } from "nes-react";
import './FlashCard.css';
import { useHistory } from 'react-router-dom';


const FlashCard = ({flashcard}) => {
    
    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);
    
    const history = useHistory();

    const study = (id) => {
        history.push(`study/${id}`);
    }

    if(currentUser.id === flashcard.creatorId)
    {
        return (

            <Card className="m-4">
                {/* <Link className="postLink" to={`/posts/${post.id}`}> */}
                    <CardBody>
                        <CardTitle tag="h2">
                            <strong> {flashcard.title}</strong>
                        </CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            Author: {flashcard.userProfile.userName}
                        </CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            Category: {flashcard.category.name}
                        </CardSubtitle>
                        
                        Description: {flashcard.description}
                    </CardBody>
                    <CardFooter>
                        <Button type="button" className="nes-btn is-success nes-cursor" onClick={() => study(flashcard.id)}>Study</Button> {'  '} <Button className="nes-btn is-warning nes-cursor">Battle</Button>
                        <Button type="button" className="right nes-btn is-normal nes-cursor">Edit</Button> {'  '} <Button className="right nes-btn is-error nes-cursor">Delete</Button>
                    </CardFooter>
                {/* </Link> */}
            </Card>
        )
    }

    return (
        <Card className="m-4">
            {/* <Link className="postLink" to={`/posts/${post.id}`}> */}
                <CardBody>
                    <CardTitle tag="h2">
                        <strong> {flashcard.title}</strong>
                    </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Author: {flashcard.userProfile.userName}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Category: {flashcard.category.name}
                    </CardSubtitle>
                    
                    Description: {flashcard.description}
                </CardBody>

                <CardFooter>
                        <Button className="right nes-btn is-error nes-cursor">Add to Collection</Button>
                </CardFooter>
            {/* </Link> */}
        </Card>
    );
}

export default FlashCard;