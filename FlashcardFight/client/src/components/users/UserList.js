import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserTypeContext } from "../../providers/UserTypeProvider"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const UserList = () => {
    const {getAllProfiles, reactivateUserById, deactivateUserById} = useContext(UserProfileContext);
    const {updateUserType} = useContext(UserTypeContext);

    const [profiles, setProfiles] = useState([]);
    const [admins, setAdmins] = useState([]);
    
    // modal state
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const history = useHistory();

    useEffect(() => {
        getAllProfiles().then(setProfiles);
    }, []);

    useEffect(() => {
        if(profiles.length > 0)
        {
            const adminAccounts = profiles.filter(p => p.userTypeId === 1)
            setAdmins(adminAccounts)
        }
    }, [profiles])

    const deactivate = (id) => {
        const user = profiles.find(p => p.id === id)

        if(user.userTypeId === 1 && admins.length === 1)
        {
            toggleModal()
        }
        else
        {
            deactivateUserById(id).then(getAllProfiles).then(setProfiles)
        }
    };

    const reactivate = (id) => {
        reactivateUserById(id).then(getAllProfiles).then(setProfiles)
    };

    const changeAccountType = (profile) => {
        if(profile.userTypeId === 1)
        {
            if(admins.length === 1)
            {
                toggleModal()
            }
            else
            {
                profile.userTypeId = 2
            }
        }
        else
        {
            profile.userTypeId = 1
        }

        updateUserType(profile)
            .then(getAllProfiles).then(setProfiles);        
    }
    
    return (
        <>
        <div className="background">
            <div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div><div className="firefly"></div>
     
            <br></br>            
            <div className="container pt-4">
            <h1 className="headers">User Management</h1>
                <div className="row justify-content-center">
                
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>User Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                profiles.map(p => {
                                    return (
                                    
                                    <tr key={p.id}>
                                        <td>{p.userName}</td>
                                        <td>{p.userType.name}</td>
                                        <td>
                                        <Button 
                                        className="leftMargin"
                                        value={p.fullName}
                                        onClick={() =>
                                            history.push(
                                                `users/details/${p.id}`
                                            )
                                        }
                                        >View
                                        </Button>

                                            {p.userTypeId === 1 ?
                                                <Button color="warning" className="leftMargin" onClick={() => changeAccountType(p)}>Demote To User</Button>
                                                :
                                                <Button color="success" className="leftMargin" onClick={() => changeAccountType(p)}>Promote To Admin</Button>
                                            }
                                            
                                            {p.deactivated === false ?
                                                <Button className="leftMargin" color="danger" onClick={() => deactivate(p.id)}>Deactivate</Button>
                                                :
                                                <Button className="leftMargin" color="success" onClick={() => reactivate(p.id)}>Reactivate</Button>
                                            }
                                            
                                        </td>
                                    </tr>
                                )})
                            }
                        </tbody>
                            
                    </table>
                </div>
            </div>
        </div>
            <div>
                <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog">
                    <ModalHeader toggle={toggleModal}>Warning - Not Enough Admins</ModalHeader>
                    <ModalBody>
                    <label>You must have at least one admin, please assign a different admin before demoting or deactivating this account.</label>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="is-error" onClick={toggleModal}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )

}

export default UserList;