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
import { CategoryContext } from '../../providers/CategoryProvider';
import { DifficultyContext } from '../../providers/DifficultyProvider';
import {FlashCardSetContext} from '../../providers/FlashCardSetProvider'
import { useHistory } from 'react-router-dom';
import { CardHeader } from "reactstrap";

export const FlashCardForm = () => {
    // Context
    const {addSet} = useContext(FlashCardSetContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { difficulties, getAllDifficulties } = useContext(DifficultyContext);

    const history = useHistory();

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // Onload
    useEffect(() => {
        getAllCategories()
            .then(getAllDifficulties)
    }, [])

    // Submit form
    const submit = () => {
        
        const flashCardSet = {
            title: title,
            description: description,
            category: category,
            difficulty: difficulty
        }

        addSet(flashCardSet).then(() => history.push(`/`))
    }

    if(categories === null || difficulties === null)
    {
        return null;
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Description</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    rows="10"
                                />
                            </FormGroup>
                            <FormGroup>

                                <Label for="category">Category</Label><br></br>
                                <select id="category" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="0">Select a category </option>
                                    {
                                        categories.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </FormGroup>
                            <FormGroup>

                                <Label for="difficulty">Difficulty</Label><br></br>
                                <select id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                                    <option value="0">Select a difficulty </option>
                                    {
                                        difficulties.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                    </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default FlashCardForm;