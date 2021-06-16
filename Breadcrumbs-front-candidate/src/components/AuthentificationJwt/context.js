import React, { useContext } from "react";

export const AuthContext = React.createContext({
    token: '',
    userName: '',
    profilePicture: null,
    setData: () => {}
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}