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
        )
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

    const addCategory = (category) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category)
            })
            .then((res) => res.json())
        )
    }

    const updateCategory = (category) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            })
        )
    }

    const deleteCategory = (id) => {
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
        <CategoryContext.Provider value={{getAllCategories, getCategoryById, categories, setCategories, addCategory, updateCategory, deleteCategory}}>
            {props.children}
        </CategoryContext.Provider>
    )
}