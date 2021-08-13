import React, { useContext, useReducer, useState } from "react";

type payloadContextAction = {
    token: string,
    userName: string,
    userLastName?: string,
    profilePicture?: string,
    linkedinCode?: string,

    startDate: string,
    endDate: string,

    interlocutor: string,
    interviewType?: string,
    description: string,
    location?: string,
    onAppointment?: string,
}
type contextState = Objects.assign()
{
    token: string,
    userName: string,
    userLastName?: string,
    profilePicture?: string,
    linkedinCode?: string,

    startDate: string,
    endDate: string,

    interlocutor: string,
    interviewType?: string,
    description: string,
    location?: string,
    onAppointment?: string,

    dispatchUserData: () => void,
    setAppointment: () => void,
    setEnd: () => void,
    setInteview: () => void,
}

const initialState: contextState = {
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
    location: null,
    onAppointment: null,

    dispatchUserData: () => {},
    setAppointment: () => {},
    setEnd: () => {},
    setInteview: () => {}
}

export const AuthContext = React.createContext(initialState);

export const useAuthContext = () => {
    return useContext(AuthContext);
}


/**
 * Composant qui sert à distribuer les données du context dans l'application.
 * @param {données de contexte} props 
 * @returns 
 */
export default function BigProvider(props) {
    const { token, user, lastName, dispatchUser, linkedinCode, picture, setLinkedinCode,
        startDate, endDate, setAppointment,
        interlocutor, interviewDescription, interviewType, location, dispatchInterview } = useAuthContextData();

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
            location: location,
            dispatchUserData: dispatchUser, setAppointment: setAppointment, setInterview: setInterview, dispatchInterview: dispatchInterview } } >
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
    const [ state, dispatchUser ] = useReducer<any>(userDataReducer, initialState)
    
    const [ endDate, setEnd] = useState();
    const [ startDate, setStart] = useState();
    const [location, setLocation ] = useState();

    const [ interlocutor, setInterlocutor ] = useState();
    const [ interviewType, setType ] = useState();
    const [ interviewDescription, setDescription ] = useState();
    const [ onAppointment, setOnAppointment ] = useState();

    const initialInterview = {
        interlocutor: null,
        interviewType: null,
        interviewDescription: null,
        onAppointment: null
    }

    const [ interviewState, dispatchInterview ] = useReducer(interviewReducer);

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


    function interviewReducer(interviewState, action) {
        let payload = action.payload;
        switch (action.type) {
            case 'set-type':
                return setType(action.payload)
            case 'set-interlocutor-name':
                return setInterlocutor(action.payload)
            case 'set-interview-data' :
                {
                    setStart(payload.startDate);
                    setEnd(payload.endDate);
                    
                    setType(payload.interviewType)
                    setInterlocutor(payload.interlocutor)
                    setDescription(payload.description);
                    setOnAppointment(payload.count);
                    setLocation(payload.location)
                }
            }                
    }
    
    return { token, user, lastName, linkedinCode, picture,
        setLinkedinCode, dispatchUser,
        interviewType, interviewDescription, interlocutor, onAppointment, location,
         dispatchInterview,
        endDate, setEnd,
        startDate, setStart, 
        setAppointment, setInterlocutor }
}