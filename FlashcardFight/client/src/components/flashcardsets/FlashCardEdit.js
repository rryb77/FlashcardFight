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

    // Imported contexts
    const { getFlashcardSetWithQandA, updateSet } = useContext(FlashCardSetContext);
    const { categories, getAllCategories, setCategories } = useContext(CategoryContext);
    const { difficulties, getAllDifficulties, setDifficulties } = useContext(DifficultyContext);
    const [flashcardSet, setFlashcardSet] = useState({});

    // Imported react router hooks
    const history = useHistory();  
    const {id} = useParams();

    // flashcard modal state
    const [flashcardModal, setFlashcardModal] = useState(false);
    const toggleFlashcardModal = () => setFlashcardModal(!flashcardModal);

    // flashcard set form field states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // question and answer modal state
    const [qAndAModal, setQAndAModal] = useState(false);
    const toggleQAndAModal = () => setQAndAModal(!qAndAModal);

    // question and answers field states
    const [questionId, setQuestionId] = useState(0);
    const [userQuestion, setUserQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswer1, setWrongAnswer1] = useState("");
    const [wrongAnswer2, setWrongAnswer2] = useState("");
    const [wrongAnswer3, setWrongAnswer3] = useState("");


    let question = {}

    // Initial load
    useEffect(() => {
        getFlashcardSetWithQandA(id)
            .then(setFlashcardSet)
            .then(getAllCategories)
            .then(setCategories)
            .then(getAllDifficulties)
            .then(setDifficulties)
    },[])

    // Once the flashcard has been set in state, update the form with current flashcard info from DB
    useEffect(() => {

        setTitle(flashcardSet.title)
        setDescription(flashcardSet.description)
        setCategory(flashcardSet.categoryId)
        setDifficulty(flashcardSet.difficultyId)
    }, [flashcardSet])

    
    // Save the flashcard edits that were made
    const saveFlashcardEdit = () => {
        const updatedSet = {
            ...flashcardSet
        }

        updatedSet.title = title
        updatedSet.description = description
        updatedSet.categoryId = parseInt(category)
        updatedSet.difficultyId = parseInt(difficulty)

        updateSet(updatedSet)
            .then(() => getFlashcardSetWithQandA(id))
            .then(setFlashcardSet)
        toggleFlashcardModal()
    }

    // Edit a question and its answers
    const questionEdit = (id) => {
        
        question = flashcardSet.questions.find(q => q.id === id)
        console.log(question)
        setQuestionId(question.id)
        setUserQuestion(question.questionText)
        setCorrectAnswer(question.answers[0].answerText)
        setWrongAnswer1(question.answers[1].answerText)
        setWrongAnswer2(question.answers[2].answerText)
        setWrongAnswer3(question.answers[3].answerText)

        toggleQAndAModal()
    }

    // Save Q and A edits
    const saveQAndAdEdit = (qId) => {
        
        const newQ = {
            Id: qId,
            FlashCardSetId: parseInt(id),
            QuestionText: userQuestion
        }

        const newCorrectAnswer = {
            questionId: qId,
            answerText: correctAnswer,
            correct: true
        }

        const newWrongAnswer1 = {
            questionId: qId,
            answerText: wrongAnswer1,
            correct: false
        }

        const newWrongAnswer2 = {
            questionId: qId,
            answerText: wrongAnswer2,
            correct: false
        }

        const newWrongAnswer3 = {
            questionId: qId,
            answerText: wrongAnswer3,
            correct: false
        }

        const answers = [newCorrectAnswer, newWrongAnswer1, newWrongAnswer2, newWrongAnswer3]

        console.log(newQ)
        console.log(answers)
    }

    // If flashcardSet hasn't mounted yet then return null
    if(flashcardSet.id === undefined)
    {
        return null;
    }

    return (
        <div className="container pt-4">
            <div className="justify-content-center">
                
                {/* Flashcard details */}
                <Container>
                    <div>Title: {flashcardSet?.title}</div>
                    <div>Description: {flashcardSet?.description}</div>
                    <div>Category: {flashcardSet?.category.name}</div>
                    <div>Difficulty: {flashcardSet?.difficulty.name}</div>
                    <div><button className="right nes-btn" onClick={toggleFlashcardModal}>Edit</button></div>
                    <br></br><br></br>
                </Container>

                {/* List of questions */}
                <Container>
                    {
                        flashcardSet.questions.map(q => {
                            return (
                            <div>
                                <button className="nes-btn" onClick={() => questionEdit(q.id)}>Edit</button> {' '} <button className="nes-btn is-error">Delete</button> {q.questionText} <p></p>
                            </div>
                            )
                        })
                    }
                </Container>
            </div>
                
                {/* Modal for flashcard details */}
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
                                        <option value={`${flashcardSet.categoryId}`} disabled selected hidden>{flashcardSet.category.name}</option>
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
                                        <option value={`${flashcardSet.difficultyId}`} disabled selected hidden>{flashcardSet.difficulty.name}</option>
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
                        <Button color="primary nes-btn" onClick={saveFlashcardEdit}>Save</Button>
                        <Button color="secondary right nes-btn" onClick={toggleFlashcardModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* Modal for question and answer edits */}
                <Modal isOpen={qAndAModal} toggle={toggleQAndAModal} className="nes-dialog">
                    <ModalHeader toggle={toggleQAndAModal}>Q/A Edit</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="question">Question</Label>
                                <Input type="textarea"
                                    id="question"
                                    onChange={(e) => setUserQuestion(e.target.value)}
                                    value={userQuestion}
                                    rows="5"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="correctAnswer">Correct Answer</Label>
                                <Input type="textarea"
                                    id="correctAnswer"
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    value={correctAnswer}
                                    rows="2"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="wrongAnswer1">Wrong Answer</Label>
                                <Input type="textarea"
                                    id="wrongAnswer1"
                                    onChange={(e) => setWrongAnswer1(e.target.value)}
                                    value={wrongAnswer1}
                                    rows="2"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="wrongAnswer2">Wrong Answer</Label>
                                <Input type="textarea"
                                    id="wrongAnswer2"
                                    onChange={(e) => setWrongAnswer2(e.target.value)}
                                    value={wrongAnswer2}
                                    rows="2"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="wrongAnswer3">Wrong Answer</Label>
                                <Input type="textarea"
                                    id="wrongAnswer3"
                                    onChange={(e) => setWrongAnswer3(e.target.value)}
                                    value={wrongAnswer3}
                                    rows="2"
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary nes-btn" onClick={() => saveQAndAdEdit(questionId)}>Save</Button>
                        <Button color="secondary right nes-btn" onClick={toggleQAndAModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

        </div>
    )
}

export default FlashCardEdit