import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ItemContext = React.createContext();

export const ItemProvider = (props) => {
    const apiUrl = "/api/item";
    const [items, setItems] = useState({});
    const { getToken } = useContext(UserProfileContext);

    const getAllItems = () => {
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
        <ItemContext.Provider value={{getAllItems, items, setItems}}>
            {props.children}
        </ItemContext.Provider>
    )
}