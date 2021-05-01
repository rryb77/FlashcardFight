import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";


const FlashCard = ({flashcard}) => {
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
            {/* </Link> */}
        </Card>
    );
}

export default FlashCard;