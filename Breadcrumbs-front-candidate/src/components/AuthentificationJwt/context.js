import React, { useContext } from "react";

export const AuthContext = React.createContext({
    token: '',
    userName: '',
    profilePicture: null,
    title: null,
    startDate: null,
    endDate: null,
    interlocutor: null,

    setData: () => {},
    setAppointment: () => {}
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}