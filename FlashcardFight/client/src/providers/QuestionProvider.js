import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const QuestionContext = React.createContext();

export const QuestionProvider = (props) => {
    const apiUrl = "/api/question";
    const [question, setQuestion] = useState(0);
    const { getToken } = useContext(UserProfileContext);
    let [theCount, setTheCount] = useState(0);
    let [amountCorrect, setAmountCorrect] = useState(0)

    const addQuestion = (question) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(question)
            })
            .then((res) => res.json())
        )
    }

    const updateQuestion = (question) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(question)
            })
        )
    }

    const deleteQuestion = (id) => {
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
        <QuestionContext.Provider value={{addQuestion, question, setQuestion, theCount, setTheCount, amountCorrect, setAmountCorrect, updateQuestion, deleteQuestion}}>
            {props.children}
        </QuestionContext.Provider>
    )
}