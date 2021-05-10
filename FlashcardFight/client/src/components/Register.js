import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CharacterImageContext } from "../providers/CharacterImageProvider";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
    Form, 
    FormGroup, 
    Label, 
    Input
} from "reactstrap";
import { Container } from "nes-react"
import "./login.css"
import "./Register.css"


export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);
    const { getAllCharacterImages } = useContext(CharacterImageContext)
    const [characterImages, setCharacterImages] = useState([])

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [characterImageId, setCharacterImageId] = useState();
    const [selectedCharacter, setSelectedCharacter] = useState("");
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    useEffect(() => {
        getAllCharacterImages()
            .then(setCharacterImages)
    }, [])

    useEffect(() => {
        if(characterImageId > 0)
        {   
            console.log(characterImages)
            let chosen = characterImages.find(c => c.id === parseInt(characterImageId))
            console.log(chosen)
            setSelectedCharacter(chosen.run);
        }

        console.log(characterImageId)
    }, [characterImageId])

    useEffect(() => {
        console.log(characterImages)
    }, [characterImages])

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
        alert("Passwords don't match. Do better.");
        } else {
        const userProfile = { userName, characterImageId, email };
        register(userProfile, password)
            .then(() => history.push("/"));
        }
    };

    let character = 1

    return (
        <>
        <div className="mainContainer">
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Container className="login">
                    <Form onSubmit={registerClick}>
                        <fieldset>
                            <FormGroup>
                                <Label htmlFor="displayName">Username</Label>
                                <Input id="displayName" type="text" onChange={e => setUserName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="characterImage">Character</Label><br></br>
                                <div className="nes-select">
                                    <select required id="category" onChange={(e) => setCharacterImageId(e.target.value)}>
                                        <option value="" disabled selected hidden>Select...</option>
                                        {characterImages.length > 0 ?                                   
                                            characterImages.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    Character {character++}
                                                </option>
                                            ))
                                            :
                                            null
                                        }
                                    </select>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Button>Register</Button>   
                            </FormGroup>
                        </fieldset>
                    </Form>
                    </Container>
                </div>
                
                <div className="rightContainer">
                    {selectedCharacter !== "" ?
                        <img className="runningHero" src={selectedCharacter} alt="Player hero"></img>
                        :
                        null
                    }
                </div>
            </div>
        </div>
        </>
  );
}