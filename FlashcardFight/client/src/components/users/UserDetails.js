import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { FlashCardSetContext } from "../../providers/FlashCardSetProvider";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    CardSubtitle,
    Col,
    Row
} from "reactstrap";

const UserDetails = () => {
    const { getUserProfileDetailsById } = useContext(UserProfileContext);
    const { flashcards, setFlashcards, getAllByUserId } = useContext(FlashCardSetContext);
    const [profile, setProfile] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getUserProfileDetailsById(id)
            .then(setProfile)
          .then(() => getAllByUserId(id))
          .then(setFlashcards)
    }, []);

    const details = (id) => {
        history.push(`/flashcards/details/${id}`);
    }

    if(profile.id === undefined)
    {
        return null
    }

    return (
        <>
        <div className="background">
            <div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div>
     
        <div className="container">
            <br></br>
            <h1 className="headers">User Profile Details</h1>
            <Card>
                <CardBody>
                    <Row>
                        <Col sm="5" md="4" lg="3">
                            <img className="detailsHero" src={profile?.characterImage.imageLocation} alt="User Hero"/>
                        </Col>
                        <Col>
                            <h2>{profile.userName}</h2>
                            <br />
                            <Row>
                                <Col lg="6">
                                    <h5>Email:</h5>
                                    <p>{profile.email}</p>
                                </Col>
                                <Col md="6" lg="4">
                                    <h5>Account Created:</h5>
                                    <p>
                                        {
                                            new Date(profile.joinDate)
                                                .toLocaleString("en-US")
                                                .split(", ")[0]
                                        }
                                    </p>
                                </Col>
                                <Col md="3" lg="2">
                                    <h5>Role:</h5>
                                    <p>{profile.userType?.name}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col>
                            <div style={{ float: "right" }}>
                                <Button
                                    onClick={() =>
                                        history.push(`/users`)
                                    }
                                >
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </div>

        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                {
                    flashcards.map((flashcard) => (
                        <Card className="m-4">
                        <CardBody>
                            <CardTitle tag="h2">
                                <strong> {flashcard.title}</strong><Badge className="right pill">{flashcard.difficulty.name}</Badge>
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
                            <Button type="button" color="secondary" className="right" onClick={() => details(flashcard.id)}>Details</Button>
                        </CardFooter>
                     </Card>
                    ))
                }
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default UserDetails;