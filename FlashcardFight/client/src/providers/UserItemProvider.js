import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UserItemContext = React.createContext();

export const UserItemProvider = (props) => {
    const apiUrl = "/api/useritems";
    const { getToken } = useContext(UserProfileContext);

    const addUserItem = (userItem) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userItem)
            })
        )
    }

    return (
        <UserItemContext.Provider value={{addUserItem}}>
            {props.children}
        </UserItemContext.Provider>
    )
}