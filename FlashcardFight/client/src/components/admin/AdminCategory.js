import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from '../../providers/CategoryProvider';

const AdminCategory = () => {
    const { getAllCategories } = useContext(CategoryContext);
    const [allCategories, setAllCategories] = useState([]);
    
    useEffect(() => {
        getAllCategories()
            .then(setAllCategories)
    })

    return (
        null
    )
}

export default AdminCategory;