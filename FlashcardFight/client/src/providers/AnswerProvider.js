import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const AnswerContext = React.createContext();

export const AnswerProvider = (props) => {
    const apiUrl = "/api/answer";
    const { getToken } = useContext(UserProfileContext);

    const addAnswers = (answers) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(answers)
            })
        )
    }

    const updateAnswers = (answers) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answers)
            })
        )
    }

    return (
        <AnswerContext.Provider value={{addAnswers, updateAnswers}}>
            {props.children}
        </AnswerContext.Provider>
    )
}