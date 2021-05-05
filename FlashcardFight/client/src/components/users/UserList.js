import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { UserTypeContext } from "../../providers/UserTypeProvider"


const UserList = () => {
    const {getAllProfiles, reactivateUserById, deactivateUserById} = useContext(UserProfileContext);
    const {updateUserType} = useContext(UserTypeContext);

    const [profiles, setProfiles] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllProfiles().then(setProfiles);
    }, []);

    const deactivate = (id) => {
        deactivateUserById(id).then(getAllProfiles).then(setProfiles)
    };

    const reactivate = (id) => {
        reactivateUserById(id).then(getAllProfiles).then(setProfiles)
    };

    const viewDeactivated = () => {
        history.push(`/deactivatedusers`)
    }

    const changeAccountType = (profile) => {
        if(profile.userTypeId === 1)
        {
            profile.userTypeId = 2
        }
        else
        {
            profile.userTypeId = 1
        }

        updateUserType(profile)
            .then(getAllProfiles).then(setProfiles);        
    }

    console.log(profiles)
    return (
        <>
            <br></br>
            <h1>User Management</h1>
            <div className="container pt-4">
                <Button color="primary right" onClick={viewDeactivated}>View Deactivated Users</Button>
            </div>
            
            <div className="container pt-4">
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
                                    >
                                        View
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
        </>
    )

}

export default UserList;