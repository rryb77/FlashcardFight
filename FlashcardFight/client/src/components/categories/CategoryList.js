import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Card, 
    CardBody, 
    CardTitle, 
    CardFooter, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const CategoryList = () => {

    const {getAllCategories, addCategory, updateCategory, deleteCategory} = useContext(CategoryContext);
    const [categories, setCategories] = useState([])
    const [newCategoryName, setNewCategoryName] = useState("")

    // Question and answer add modal state
    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const toggleAddCategoryModal = () => {
        resetForm()
        setAddCategoryModal(!addCategoryModal);
    }

    const resetForm = () => {
        setNewCategoryName('')
    }

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
    }, [])

    

    const newCat = () => {
        if(newCategoryName !== "")
        {
            const newCategoryObj = {
                name: newCategoryName
            }

            console.log(newCategoryObj)
            addCategory(newCategoryObj)
                .then(getAllCategories)
                .then(setCategories)
            toggleAddCategoryModal()
        }  
    }

    const deleteCat = (id) => {
        deleteCategory(id)
            .then(getAllCategories)
            .then(setCategories)
    }

    return (
        <div className="container">
            <br></br>
            <h1>Category Manager <Button color="success" className="" onClick={toggleAddCategoryModal}>Add Category</Button></h1>
            
            <div className="row justify-content-center">
            
                {categories.map((category) => (
                    <Card className="m-4">
                    <CardBody>
                        <CardTitle tag="h2">
                            <strong> {category.name}</strong>
                        </CardTitle>
                    </CardBody>
                    <CardFooter>
                        <Button type="button" color="info">Edit</Button> {'  '} <Button color="danger" onClick={() => deleteCat(category.id)}>Delete</Button>
                    </CardFooter>
                </Card>
                ))}
                
            </div>
        

                {/* Modal to add new category */}
                <Modal isOpen={addCategoryModal} toggle={toggleAddCategoryModal} className="nes-dialog">
                <ModalHeader toggle={toggleAddCategoryModal}>Add A New Category</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="category">Category Name</Label>
                            <Input type="text" onChange={(e) => setNewCategoryName(e.target.value)}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={newCat}>Save</Button>
                    <Button color="secondary right" onClick={toggleAddCategoryModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

export default CategoryList;