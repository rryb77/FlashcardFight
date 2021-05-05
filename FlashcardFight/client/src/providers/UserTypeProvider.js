import React, { useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const UserTypeContext = React.createContext();

export const UserTypeProvider = (props) => {
  const apiUrl = "/api/usertype";
  const { getToken } = useContext(UserProfileContext);

  const updateUserType = (userProfile) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/${userProfile.id}/${userProfile.userTypeId}`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
      )
  }

  return (
    <UserTypeContext.Provider value={{updateUserType}}>
      {props.children}
    </UserTypeContext.Provider>
  )
} 