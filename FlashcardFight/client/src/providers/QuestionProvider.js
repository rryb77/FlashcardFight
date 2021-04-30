import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const QuestionContext = React.createContext();

export const QuestionProvider = (props) => {
    const apiUrl = "/api/question";
    const [questionId, setQuestionId] = useState(0);
    const { getToken } = useContext(UserProfileContext);

    const addQuestion = (set) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(set)
            })
            .then((res) => res.json())
            .then(setQuestionId)
        )
    }

    return (
        <QuestionContext.Provider value={{addQuestion, questionId}}>
            {props.children}
        </QuestionContext.Provider>
    )
}