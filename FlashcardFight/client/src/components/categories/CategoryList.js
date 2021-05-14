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

const CategoryList = () => {

    const {getAllCategories, addCategory, updateCategory, deleteCategory} = useContext(CategoryContext);
    const [categories, setCategories] = useState([])
    const [newCategoryName, setNewCategoryName] = useState("")
    let [category, setCategory] = useState({})

    // Category add modal state
    const [addCategoryModal, setAddCategoryModal] = useState(false)
    const toggleAddCategoryModal = () => {
        resetForm()
        setAddCategoryModal(!addCategoryModal);
    }

    // Category edit modal state
    const [editCategoryModal, setEditCategoryModal] = useState(false)
    const toggleEditCategoryModal = () => {
        resetForm()
        setEditCategoryModal(!editCategoryModal);
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
                Name: newCategoryName
            }

            addCategory(newCategoryObj)
                .then(getAllCategories)
                .then(setCategories)
            toggleAddCategoryModal()
        }  
    }

    const editCat = (category) => {
        setCategory(category)
        setNewCategoryName(category.name)
        toggleEditCategoryModal()
    }

    const saveEdit = () => {
        const editedCategoryObj = {
            Id: category.id,
            Name: newCategoryName
        }

        updateCategory(editedCategoryObj)
            .then(getAllCategories)
            .then(setCategories)
        toggleEditCategoryModal()
    }

    const deleteCat = (id) => {
        deleteCategory(id)
            .then(getAllCategories)
            .then(setCategories)
    }

    return (
        <div className="background">
        <div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div>
        <div className="container">
            <br></br>
            <h1 className="headers">Category Manager <Button color="success" className="" onClick={toggleAddCategoryModal}>Add Category</Button></h1>
            
            <div className="row justify-content-center">
            
                {categories.map((category) => (
                    <Card key={category.id} className="m-4">
                    <CardBody>
                        <CardTitle tag="h2">
                            <strong> {category.name}</strong>
                        </CardTitle>
                    </CardBody>
                    <CardFooter>
                        <Button type="button" color="info" onClick={() => editCat(category)}>Edit</Button> {'  '} <Button color="danger" onClick={() => deleteCat(category.id)}>Delete</Button>
                    </CardFooter>
                </Card>
                ))}
                
            </div>
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

            {/* Modal to edit category */}
            <Modal isOpen={editCategoryModal} toggle={toggleEditCategoryModal} className="nes-dialog">
                <ModalHeader toggle={toggleEditCategoryModal}>Edit Category</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="category">Category Name</Label>
                            <Input type="text" onChange={(e) => setNewCategoryName(e.target.value)} value={newCategoryName}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveEdit}>Save</Button>
                    <Button color="secondary right" onClick={toggleEditCategoryModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

export default CategoryList;