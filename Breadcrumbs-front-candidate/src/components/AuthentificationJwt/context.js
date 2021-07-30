import React, { useContext, useReducer, useState } from "react";

export const AuthContext = React.createContext({
    token: null,
    userName: null,
    userLastName: null,
    profilePicture: null,
    linkedinCode: null,
    
    startDate: null,
    endDate: null,

    interlocutor: null,
    interviewType: null,
    description: null,

    dispatchUserData: () => {},
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
    const { token, user, lastName, dispatchUser, linkedinCode, picture, setLinkedinCode, startDate, endDate, setAppointment, interlocutor, interviewDescription, interviewType, setInterview } = useAuthContextData();

    return (
        <AuthContext.Provider value={ {
            token: token,
            userName: user,
            userLastName: lastName,
            profilePicture: picture,
            linkedinCode: linkedinCode,
            startDate: startDate,
            endDate: endDate,
            interlocutor,
            interviewType: interviewType,
            description: interviewDescription,
            dispatchUserData: dispatchUser, setAppointment: setAppointment, setInterview: setInterview } } >
                { props.children }
        </AuthContext.Provider>
    )
}

export const useAuthContextData = () => {
    const [ token, setToken ] = useState(window.localStorage.getItem("token"));
    const [ user, setUser ] = useState(window.localStorage.getItem("user"));
    const [ lastName, setLast ] = useState(window.localStorage.getItem("last_name"));
    const [ picture, setPicture ] = useState(window.localStorage.getItem("picture_link"));
    const [linkedinCode, setLinkedinCode ] = useState(window.localStorage.getItem("link_code"))
    const [ state, dispatchUser ] = useReducer(userDataReducer, AuthContext)
    
    const [ endDate, setEnd] = useState();
    const [ startDate, setStart] = useState();

    const [ interlocutor, setInterlocutor ] = useState();
    const [ interviewType, setType ] = useState();
    const [ interviewDescription, setDescription ] = useState();

    function setAppointment(startDate, endDate) {
        setEnd(endDate);setStart(startDate);
    }
    
    function userDataReducer(state2, action) {
        switch (action.type) {
            case 'fill-token':
                return setToken(action.payload)
            case 'fill-user':
                return setUser(action.payload)
            case 'fill-last-name' :
                return setLast(action.payload)
            case 'fill-user-data':
               {
                setToken(action.payload.token);
                setUser(action.payload.first_name);
                setLast(action.payload.last_name)
                setPicture(action.payload.picture);
               }
            case 'fill-link-code' :
                return setLinkedinCode(action.payload)
        
            default:
                throw new Error("reducer invalid");
        }        
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
    
    return { token, user, lastName, linkedinCode, picture,
        setLinkedinCode, dispatchUser,
        interviewType, interviewDescription, interlocutor,
        setInterview,
        endDate, setEnd,
        startDate, setStart, 
        setAppointment,
        interlocutor, setInterlocutor }
}