import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { DifficultyContext } from '../../providers/DifficultyProvider';
import { Container } from "nes-react"
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    Row,
    Col,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
  } from "reactstrap";

const FlashCardEdit = () => {

    const { getFlashcardSetWithQandA, flashcardSetData } = useContext(FlashCardSetContext);
    const { categories, getAllCategories, setCategories } = useContext(CategoryContext);
    const { difficulties, getAllDifficulties, setDifficulties } = useContext(DifficultyContext);
    const [flashcardSet, setFlashcardSet] = useState({});

    const history = useHistory();  
    const {id} = useParams();

    // flashcard modal state
    const [flashcardModal, setFlashcardModal] = useState(false);
    const toggleFlashcardModal = () => setFlashcardModal(!flashcardModal);

    // flashcard set details form field states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setFlashcardSet)
            .then(getAllCategories)
            .then(setCategories)
            .then(getAllDifficulties)
            .then(setDifficulties)
    },[])

    // Once the post has been set in state, update the form with previous post info
    useEffect(() => {

        setTitle(flashcardSet.title)
        setDescription(flashcardSet.description)
        setCategory(flashcardSet.categoryId)
        setDifficulty(flashcardSet.dictionaryId)
    }, [flashcardSet])

    const saveEdit = () => {

    }

    if(flashcardSet.id === undefined)
    {
        return null;
    }

    return (
        <div className="container pt-4">
            <div className="justify-content-center">
                <Container>
                    <div>Title: {flashcardSet?.title}</div>
                    <div>Description: {flashcardSet?.description}</div>
                    <div>Category: {flashcardSet?.category.name}</div>
                    <div>Difficulty: {flashcardSet?.difficulty.name}</div>
                    <div><button className="right nes-btn" onClick={toggleFlashcardModal}>Edit</button></div>
                    <br></br><br></br>
                </Container>

                <Container>
                    {
                        flashcardSet.questions.map(q => {
                            return (
                            <div>
                                <button className="nes-btn">Edit</button> {' '} <button className="nes-btn is-error">Delete</button> {q.questionText} <p></p>
                            </div>
                            )
                        })
                    }
                </Container>
            </div>
                <Modal isOpen={flashcardModal} toggle={toggleFlashcardModal} className="nes-dialog">
                    <ModalHeader toggle={toggleFlashcardModal}>Flashcard Details Edit</ModalHeader>
                    <ModalBody>
                        <Form>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title">Description</Label>
                                    <Input type="textarea"
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    rows="5"
                                />
                                </FormGroup>
                                <FormGroup>

                                <Label for="category">Category</Label><br></br>
                                <div className="nes-select">
                                    <select required id="category" onChange={(e) => setCategory(e.target.value)}>
                                        <option value={`${flashcardSet.categoryId}`} disabled hidden>{flashcardSet.category.name}</option>
                                        {categories.length > 0 ?                                   
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
                            </FormGroup>
                            <FormGroup>

                                <Label for="difficulty">Skill Level</Label><br></br>
                                <div className="nes-select">
                                    <select required id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                                        <option value={`${flashcardSet.difficultyId}`} disabled hidden>{flashcardSet.difficulty.name}</option>
                                        {difficulties.length > 0 ?
                                            difficulties.map(d => (
                                                <option key={d.id} value={d.id}>
                                                    {d.name}
                                                </option>
                                            ))
                                            :
                                            null
                                        }
                                    </select>
                                </div>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary nes-btn" onClick={saveEdit}>Save</Button>
                        <Button color="secondary right nes-btn" onClick={toggleFlashcardModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        </div>
    )
}

export default FlashCardEdit