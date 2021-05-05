import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserList = () => {
    const {getAllProfiles, reactivateUserById, deactivateUserById} = useContext(UserProfileContext);
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
                                    return p.deactivated === false ?
                                    
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

                                            <Button className="leftMargin" onClick={() => history.push(`/userprofiles/edit/${p.id}`)}>Edit</Button>
                                            <Button className="leftMargin" color="danger" onClick={() => deactivate(p.id)}>Deactivate</Button>
                                        </td>
                                    </tr>

                                    :

                                    <tr>
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
                                            <Button className="leftMargin" onClick={() => history.push(`/userprofiles/edit/${p.id}`)}>Edit</Button>
                                            <Button className="leftMargin" color="success" onClick={() => reactivate(p.id)}>Reactivate</Button>
                                        </td>
                                    </tr>

                                })
                            }
                        </tbody>
                            
                    </table>
                </div>
            </div>
        </>
    )

}

export default UserList;