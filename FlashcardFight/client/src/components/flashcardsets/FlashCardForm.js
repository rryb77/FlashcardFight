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
import { Container } from "nes-react"


export const FlashCardForm = () => {
    // Context
    const {addSet, flashcardSet, setFlashcardSet} = useContext(FlashCardSetContext);
    const { categories, getAllCategories, setCategories } = useContext(CategoryContext);
    const { difficulties, getAllDifficulties, setDifficulties } = useContext(DifficultyContext);

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
            .then(setCategories)
            .then(getAllDifficulties)
            .then(setDifficulties)
    }, [])

    // Submit form
    const submit = () => {
        
        const newFlashCardSet = {
            title: title,
            description: description,
            categoryId: category,
            difficultyId: difficulty
        }

        addSet(newFlashCardSet)
            .then(setFlashcardSet)
            .then(() => history.push(`create/questions`))        
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Container>
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
                                    rows="5"
                                />
                            </FormGroup>
                            <FormGroup>

                                <Label for="category">Category</Label><br></br>
                                <div className="nes-select">
                                    <select required id="category" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="" disabled hidden>Select...</option>
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
                                        <option value="" disabled hidden>Select...</option>
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
                        <button 
                            className="nes-btn is-primary nes-pointer"
                            disabled={isLoading} 
                            onClick={submit}>
                            SUBMIT
                        </button>
                </Container>
            </div>
        </div>
    )
}

export default FlashCardForm;