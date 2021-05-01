import React, { useContext, useEffect, useState } from "react"
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
import {FlashCardSetContext} from '../../providers/FlashCardSetProvider'
import { useHistory } from 'react-router-dom';
import { CardHeader } from "reactstrap";
import { QuestionContext } from "../../providers/QuestionProvider";
import { AnswerContext } from "../../providers/AnswerProvider";

export const FlashCardForm = () => {
    // Context
    const {flashcardSet} = useContext(FlashCardSetContext);
    const {addQuestion, question, setQuestion} = useContext(QuestionContext);
    const {addAnswers} = useContext(AnswerContext);

    const history = useHistory();

    // modal state
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [userQuestion, setUserQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswer1, setWrongAnswer1] = useState("");
    const [wrongAnswer2, setWrongAnswer2] = useState("");
    const [wrongAnswer3, setWrongAnswer3] = useState("");


    // Onload
    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if(question.id > 0)
        {
            const newCorrectAnswer = {
                questionId: question.id,
                answerText: correctAnswer,
                correct: true
            }

            const newWrongAnswer1 = {
                questionId: question.id,
                answerText: wrongAnswer1,
                correct: false
            }

            const newWrongAnswer2 = {
                questionId: question.id,
                answerText: wrongAnswer2,
                correct: false
            }

            const newWrongAnswer3 = {
                questionId: question.id,
                answerText: wrongAnswer3,
                correct: false
            }

            const answers = [newCorrectAnswer, newWrongAnswer1, newWrongAnswer2, newWrongAnswer3]

            addAnswers(answers)

            question.id = 0
            toggleModal()
        }
        
    },[question])

    const resetForm = () => {
        setUserQuestion('')
        setCorrectAnswer('')
        setWrongAnswer1('')
        setWrongAnswer2('')
        setWrongAnswer3('')
        toggleModal()
    }

    const completeSet = () => {
        question.id = 0
        history.push(`mylist`)
    }


    // Submit form
    const submit = () => {
        
        const newQuestion = {
            flashcardSetId: flashcardSet.id,
            questionText: userQuestion
        }

        addQuestion(newQuestion)
            .then(setQuestion) 
    }

    return (
        <main>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>
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
                            <button 
                                class="nes-btn is-primary nes-pointer"
                                color="info"
                                disabled={isLoading} 
                                onClick={submit}>
                                SUBMIT
                            </button>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div>
                <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog">
                    <ModalHeader toggle={toggleModal}>Save Your Deck</ModalHeader>
                    <ModalBody>
                    <label>Question Added! Would you like to add another?</label>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={resetForm}> Yes, please! </Button>{' '}
                        <Button color="secondary" onClick={completeSet}>No, I'm done.</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </main>
    )
}

export default FlashCardForm;