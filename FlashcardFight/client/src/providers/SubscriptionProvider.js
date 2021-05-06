import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const apiUrl = "/api/subscription"
    const { getToken } = useContext(UserProfileContext);

    const AddSubscription = (subscription) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription)
            })
        )
    }

    const DeleteSubscription = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
        )
    }

    return (
        <SubscriptionContext.Provider value={{AddSubscription, DeleteSubscription}}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}