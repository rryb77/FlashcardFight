import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FlashCardSetContext = React.createContext();

export const FlashCardSetProvider = (props) => {
    const apiUrl = "/api/FlashCardSet";
    const [flashcardSet, setFlashcardSet] = useState({});
    const [flashcards, setFlashcards] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const [flashcardSetData, setFlashcardSetData] = useState({
        questionAmount: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        setId: 0,
        EXPgained: 0,
        HP: 0,
        Level: 0,
        ExpToNextLevel: 0
    })

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

    const updateSet = (set) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${set.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(set)
            })
        )
    }

    const getAllFlashcards = () => {
        return getToken().then((token =>
            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllFlashcardUserSubs = (id) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetAllBySubscription/${id}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllByUserId = (id) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetAllByUserId/${id}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllWithoutUserSubscriptions = (id) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetAllWithoutUserSubscriptions/${id}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllWithoutUserSubsByCategory = (id, categoryId) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetAllWithoutUserSubscriptionsFilteredByCategory/${id}/${categoryId}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllWithoutUserSubsByDifficulty = (id, difficultyId) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetAllWithoutUserSubsFilteredByDifficulty/${id}/${difficultyId}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllWithoutUserSubsByDifficultyAndCategory = (id, difficultyId, categoryId) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetAllWithoutUserSubsFilteredByCategoryAndDifficulty/${id}/${difficultyId}/${categoryId}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getAllUserFlashcards = () => {
        return getToken().then((token =>
            fetch(`${apiUrl}/UserSets`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const getFlashcardSetWithQandA = (setId) => {
        return getToken().then((token =>
            fetch(`${apiUrl}/GetWithQuestionsAndAnswers/${setId}`, {
            method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
        ))
    }

    const deleteSet = (id) => {
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
        <FlashCardSetContext.Provider value={{addSet, flashcardSet, setFlashcardSet, flashcards, setFlashcards, getAllFlashcards, updateSet, 
                                              getAllUserFlashcards, getFlashcardSetWithQandA, flashcardSetData, setFlashcardSetData, deleteSet,
                                              getAllByUserId, getAllFlashcardUserSubs, getAllWithoutUserSubscriptions, getAllWithoutUserSubsByCategory,
                                              getAllWithoutUserSubsByDifficulty, getAllWithoutUserSubsByDifficultyAndCategory}}>
            {props.children}
        </FlashCardSetContext.Provider>
    )
}