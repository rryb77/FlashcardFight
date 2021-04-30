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

            history.push(`/`)
        }
        
    },[question])



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
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="content">Question</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setUserQuestion(e.target.value)}
                                    value={userQuestion}
                                    rows="10"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Correct Answer</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    value={correctAnswer}
                                    rows="10"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Wrong Answer</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setWrongAnswer1(e.target.value)}
                                    value={wrongAnswer1}
                                    rows="10"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Wrong Answer</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setWrongAnswer2(e.target.value)}
                                    value={wrongAnswer2}
                                    rows="10"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Wrong Answer</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setWrongAnswer3(e.target.value)}
                                    value={wrongAnswer3}
                                    rows="10"
                                />
                            </FormGroup>
                        </Form>
                        <Button 
                            color="info"
                            disabled={isLoading} 
                            onClick={submit}>
                            SUBMIT
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default FlashCardForm;