import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const DifficultyContext = React.createContext();

export const DifficultyProvider = (props) => {
    const apiUrl = "/api/difficulty";
    const [difficulties, setDifficulties] = useState({});
    const { getToken } = useContext(UserProfileContext);

    const getAllDifficulties = () => {
        return getToken().then((token) =>
          fetch(`${apiUrl}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
        )
    }

    const getDifficultyById = (id) => {
        return getToken().then((token) =>
          fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
            .then((res) => res.json())
        );
    }

    return (
        <DifficultyContext.Provider value={{getAllDifficulties, getDifficultyById, difficulties, setDifficulties}}>
            {props.children}
        </DifficultyContext.Provider>
    )
}