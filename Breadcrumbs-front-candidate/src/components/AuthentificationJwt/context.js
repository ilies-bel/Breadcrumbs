import React, { useContext, useState } from "react";

export const AuthContext = React.createContext({
    token: null,
    userName: null,
    profilePicture: null,
    title: null,
    startDate: null,
    endDate: null,
    interlocutor: null,

    setData: () => {},
    setAppointment: () => {},
    setEnd: () => {},
    setInterlocutor: () => {},
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}



export default function BigProvider(props) {
    const { token, user, setUserData, startDate, endDate, setData, setAppointment, interlocutor, setInterlocutor } = useContextdata();   

    return (
        <AuthContext.Provider value={ {
                            token: token,
                            userName: user,
                            startDate: startDate,
                            endDate: endDate,
                            interlocutor,
                            setData: setUserData, setAppointment: RegisterAppointments, setInterlocutor: setInterlocutorInformation } } >
                { props.children }
        </AuthContext.Provider>
    )
}

export const useContextdata = () => {
    const [ token, setToken ] = useState(window.localStorage.getItem("token"));
    const [ user, setUser ] = useState(window.localStorage.getItem("user"));
    const [ title, setTitle] = useState();
    const [ endDate, setEnd] = useState();
    const [ startDate, setStart] = useState();
    const [ interlocutor, setInterlocutor ] = useState();

    function setAppointment(startDate, endDate) {
        setEnd(endDate);setStart(startDate);
    }
    function setInterlocutorInformation(interlocutor) {
        setInterlocutor(interlocutor);
    }
    function setUserData(token, user) {
        setToken(token);
        setUser(user);
    }
    
    return { token, setToken, 
        user, setUser,
        setUserData,
        title, 
        setTitle,
        endDate, setEnd,
        startDate, setStart, 
        setAppointment,
        interlocutor, setInterlocutor }
}