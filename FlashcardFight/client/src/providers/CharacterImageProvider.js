import React from "react";

export const CharacterImageContext = React.createContext();

export const CharacterImageProvider = (props) => {
    const apiUrl = "/api/characterimage";

    const getAllCharacterImages = () => {
          return fetch(`${apiUrl}`)
          .then((res) => res.json())
    }


    return (
        <CharacterImageContext.Provider value={{getAllCharacterImages}}>
            {props.children}
        </CharacterImageContext.Provider>
    )
}