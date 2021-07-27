import React, { useContext, useState } from "react";

export const AuthContext = React.createContext({
    token: null,
    userName: null,
    userLastName: null,
    profilePicture: null,
    
    startDate: null,
    endDate: null,

    interlocutor: null,
    interviewType: null,
    description: null,

    setUserData: () => {},
    setAppointment: () => {},
    setEnd: () => {},
    setInteview: () => {},
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}


/**
 * Composant qui sert à distribuer les données du context dans l'application.
 * @param {données de contexte} props 
 * @returns 
 */
export default function BigProvider(props) {
    const { token, user, lastName, setUserData, startDate, endDate, setData, setAppointment, interlocutor, interviewDescription, interviewType, setInterview } = useContextdata();

    return (
        <AuthContext.Provider value={ {
            token: token,
            userName: user,
            userLastName: lastName,
            startDate: startDate,
            endDate: endDate,
            interlocutor,
            interviewType: interviewType,
            description: interviewDescription,
            setUserData: setUserData, setAppointment: setAppointment, setInterview: setInterview } } >
                { props.children }
        </AuthContext.Provider>
    )
}

export const useContextdata = () => {
    const [ token, setToken ] = useState(window.localStorage.getItem("token"));
    const [ user, setUser ] = useState(window.localStorage.getItem("user"));
    const [ lastName, setLast ] = useState(window.localStorage.getItem("last_name"));
    
    const [ endDate, setEnd] = useState();
    const [ startDate, setStart] = useState();

    const [ interlocutor, setInterlocutor ] = useState();
    const [ interviewType, setType ] = useState();
    const [ interviewDescription, setDescription ] = useState();

    function setAppointment(startDate, endDate) {
        setEnd(endDate);setStart(startDate);
    }
    function setInterlocutorInformation(interlocutor) {
        setInterlocutor(interlocutor);
    }
    //TODO: remplacer par un useReducer
    function setUserData(token, firstname, lastname) {
        setToken(token);
        setUser(firstname);
        setLast(lastname);
    }
    /**
     * Méthode qui sert à changer les caractéristiques d'un type d'interview : type, interlocuteur et description
     * cette méthode est retourné parmi les states.
     * TODO: remplacer par un useReducer.
     * @param {*} param0 
     */
    function setInterview({type=null, interviewer=null, milestone_name=null, description="Votre prochain rendez-vous"}) {
        setType(type);
        interviewer && setInterlocutor(interviewer);
        console.log(description);console.log("/description");
        description != "Votre prochain rendez-vous" && setDescription(description);
    }
    
    return { token, setToken, 
        user, lastName, setUser,
        setUserData,
        interviewType, interviewDescription, interlocutor,
        setInterview,
        endDate, setEnd,
        startDate, setStart, 
        setAppointment,
        interlocutor, setInterlocutor }
}