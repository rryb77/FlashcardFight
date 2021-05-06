import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CharacterImageContext = React.createContext();

export const CharacterImageProvider = (props) => {
    const apiUrl = "/api/characterimage";
    const { getToken } = useContext(UserProfileContext);

    const getAllCharacterImages = () => {
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


    return (
        <CharacterImageContext.Provider value={{getAllCharacterImages}}>
            {props.children}
        </CharacterImageContext.Provider>
    )
}