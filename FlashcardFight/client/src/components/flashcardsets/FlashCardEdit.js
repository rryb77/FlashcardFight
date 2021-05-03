import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { QuestionContext } from '../../providers/QuestionProvider';
import { AnswerContext } from '../../providers/AnswerProvider';
import { DifficultyContext } from '../../providers/DifficultyProvider';
import { Container } from "nes-react"
import {
    Form,
    FormGroup,
    Label,
    Button,
    Input,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
  } from "reactstrap";

const FlashCardEdit = () => {

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);


    const [userIsCreator, setUserIsCreator] = useState(false);
    
    // Imported contexts
    const { getFlashcardSetWithQandA, updateSet, deleteSet } = useContext(FlashCardSetContext);
    const { categories, getAllCategories, setCategories } = useContext(CategoryContext);
    const { difficulties, getAllDifficulties, setDifficulties } = useContext(DifficultyContext);
    const { updateQuestion, deleteQuestion } = useContext(QuestionContext);
    const { updateAnswers } = useContext(AnswerContext);
    
    // flashcard set state
    const [flashcardSet, setFlashcardSet] = useState({});

    // Question state
    const [questionInfo, setQuestionInfo] = useState({})

    // Imported react router hooks
    const history = useHistory();  
    const {id} = useParams();

    // flashcard edit modal state
    const [flashcardModal, setFlashcardModal] = useState(false);
    const toggleFlashcardModal = () => setFlashcardModal(!flashcardModal);

    // flashcard edit form field states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // flashcard delete modale state
    const [flashcardDeleteModal, setFlashcardDeleteModal] = useState(false);
    const toggleFlashcardDeleteModal = () => setFlashcardDeleteModal(!flashcardDeleteModal);

    // question and answer edit modal state
    const [qAndAModal, setQAndAModal] = useState(false);
    const toggleQAndAModal = () => setQAndAModal(!qAndAModal);

    // question and answers edit form field states
    const [questionId, setQuestionId] = useState(0);
    const [userQuestion, setUserQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswer1, setWrongAnswer1] = useState("");
    const [wrongAnswer2, setWrongAnswer2] = useState("");
    const [wrongAnswer3, setWrongAnswer3] = useState("");

    // question and answer delete modal state
    const [qAndADeleteModal, setQAndADeleteModal] = useState(false);
    const toggleQAndADeleteModal = () => setQAndADeleteModal(!qAndADeleteModal);


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

        if(currentUser.id === flashcardSet.creatorId)
        {
            setUserIsCreator(true)
        }

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

    // Delete the flashcard set
    const deleteFlashcardSet = () => {
        deleteSet(id)
            .then(history.push(`/mysets`))
    }

    // Edit a question and its answers
    const questionEdit = (qId) => {
        
        question = flashcardSet.questions.find(q => q.id === qId)

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
        
        question = flashcardSet.questions.find(q => q.id === qId)

        const newQ = {
            Id: qId,
            FlashCardSetId: parseInt(id),
            QuestionText: userQuestion
        }

        const newCorrectAnswer = {
            Id: question.answers[0].id,
            questionId: qId,
            answerText: correctAnswer,
            correct: true
        }

        const newWrongAnswer1 = {
            Id: question.answers[1].id,
            questionId: qId,
            answerText: wrongAnswer1,
            correct: false
        }

        const newWrongAnswer2 = {
            Id: question.answers[2].id,
            questionId: qId,
            answerText: wrongAnswer2,
            correct: false
        }

        const newWrongAnswer3 = {
            Id: question.answers[3].id,
            questionId: qId,
            answerText: wrongAnswer3,
            correct: false
        }

        const answers = [newCorrectAnswer, newWrongAnswer1, newWrongAnswer2, newWrongAnswer3]

        updateQuestion(newQ)
            .then(() => updateAnswers(answers))
            .then(() => getFlashcardSetWithQandA(id))
            .then(setFlashcardSet)
            .then(toggleQAndAModal)
    }

    // Delete the question/answer set
    const questionDelete = (qId) => {
        deleteQuestion(qId)
            .then(() => getFlashcardSetWithQandA(id))
            .then(setFlashcardSet)
            .then(toggleQAndADeleteModal)
    }

    // Set the questionInfo so it can be displayed in the modal
    const questionFinder = (qId) => {
        setQuestionInfo(flashcardSet.questions.find(q => q.id === qId))
    }

    // Toggle the modal once the question can be accessed
    useEffect(() => {
        if(questionInfo.id !== undefined)
        {
            toggleQAndADeleteModal()
        }
    }, [questionInfo])

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
                    <h1>Flashcard Set Details</h1>
                    <div>Title: {flashcardSet?.title}</div>
                    <div>Description: {flashcardSet?.description}</div>
                    <div>Category: {flashcardSet?.category.name}</div>
                    <div>Difficulty: {flashcardSet?.difficulty.name}</div>
                    {
                        userIsCreator ?
                                <div><button className="right nes-btn is-error" onClick={toggleFlashcardDeleteModal}>Delete</button><button className="right nes-btn" onClick={toggleFlashcardModal}>Edit</button></div>
                            :
                                null

                    }
                    <br></br><br></br>
                </Container>

                {/* List of questions */}
                <Container>
                    <h1>Question Details</h1><br></br>
                    {
                        userIsCreator ? 
                                flashcardSet.questions.map(q => {
                                    return (
                                    <>
                                        <button className="marginBottom nes-btn is-success">Add Question</button>
                                        <div>
                                            <button className="nes-btn" onClick={() => questionEdit(q.id)}>Edit</button> {' '} <button className="nes-btn is-error" onClick={() => questionFinder(q.id)}>Delete</button> {q.questionText} <p></p>
                                        </div>
                                    </>
                                    )
                                }) 
                            : 
                                
                                flashcardSet.questions.map(q => {
                                    return (
                                    <div>
                                        {q.questionText} <p></p>
                                    </div>
                                    )
                                })
                            
                    }
                </Container>
            </div>
                
                {/* Modal for flashcard edits */}
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
                        <button color="primary nes-btn" onClick={saveFlashcardEdit}>Save</button>
                        <button color="secondary right nes-btn" onClick={toggleFlashcardModal}>Cancel</button>
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

                {/* Modal for flashcard delete */}
                <Modal isOpen={flashcardDeleteModal} toggle={toggleFlashcardDeleteModal} className="nes-dialog">
                    <ModalHeader toggle={toggleFlashcardDeleteModal}>Delete {flashcardSet.title}?</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this? This will delete ALL questions and answers as well, and it is NOT reversable.
                    </ModalBody>
                    <ModalFooter>
                        <button className="nes-btn is-warning" onClick={deleteFlashcardSet}>Delete</button>{' '}
                        <button className="nes-btn" onClick={toggleFlashcardDeleteModal}>Cancel</button>
                    </ModalFooter>
                </Modal>

                {/* Modal for question delete */}
                <Modal isOpen={qAndADeleteModal} toggle={toggleQAndADeleteModal} className="nes-dialog">
                    <ModalHeader toggle={toggleQAndADeleteModal}><b>Delete this question/ answer set?</b></ModalHeader>
                    <ModalBody>
                        <div><b>Are you sure you want to delete this?</b></div><br></br>
                        <div><b>Question:</b> {questionInfo.questionText}</div><br></br>
                        <div><b>This will delete the question and all answers as well. This is NOT reversable.</b></div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="nes-btn is-warning" onClick={() => questionDelete(questionInfo.id)}>Delete</button>{' '}
                        <button className="nes-btn" onClick={toggleQAndADeleteModal}>Cancel</button>
                    </ModalFooter>
                </Modal>

        </div>
    )
}

export default FlashCardEdit