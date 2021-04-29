import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FlashCardSetContext = React.createContext();

export const FlashCardSetProvider = (props) => {
    const apiUrl = "/api/FlashCardSet";
    const [flashcardSetId, setFlashCardSetId] = useState(0);
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
            .then(setFlashCardSetId)
        )
    }

    return (
        <FlashCardSetContext.Provider value={{addSet, flashcardSetId}}>
            {props.children}
        </FlashCardSetContext.Provider>
    )
}