import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FlashCardSetContext = React.createContext();

export const FlashCardSetProvider = (props) => {
    const apiUrl = "/api/FlashCardSet";
    const [flashcardSet, setFlashcardSet] = useState({});
    const { getToken } = useContext(UserProfileContext);

    const addSet = (set) => {
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
        )
    }

    return (
        <FlashCardSetContext.Provider value={{addSet, flashcardSet, setFlashcardSet}}>
            {props.children}
        </FlashCardSetContext.Provider>
    )
}