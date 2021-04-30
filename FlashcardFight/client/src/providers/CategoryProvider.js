import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const apiUrl = "/api/category";
    const [categories, setCategories] = useState({});
    const { getToken } = useContext(UserProfileContext);

    const getAllCategories = () => {
        return getToken().then((token) =>
          fetch(`${apiUrl}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((res) => res.json())
          .then(setCategories))
    }

    const getCategoryById = (id) => {
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
        <CategoryContext.Provider value={{getAllCategories, getCategoryById, categories}}>
            {props.children}
        </CategoryContext.Provider>
    )
}