import React, { useContext, useReducer, useState } from "react";

type userProps = {
    token: string,
    userFirstName: string,
    userLastName: string,
    profilePicture?: string,
    linkedinCode?: string,
    dispatchUserData: React.Dispatch<userProps>,
}
type interviewProps = {
    startDate?: string,
    endDate?: string,

    interlocutor: string,
    interviewType: string,
    description: string,
    location?: string,
    onAppointment: string,

    dispatchInterview: React.Dispatch<interviewProps>,
}

type contextState = userProps & interviewProps
type action = {
    type: string,
    payload: contextState & string,
}

const initialStateAuth: userProps = {
    token: window.localStorage.getItem("token"),
    userFirstName: window.localStorage.getItem("user"),
    userLastName: window.localStorage.getItem("last_name"),
    profilePicture: window.localStorage.getItem("picture_link"),
    linkedinCode: window.localStorage.getItem("link_code"),

    dispatchUserData: () => {},
}
const initialStateInterview: interviewProps = {
    startDate: null,
    endDate: null,

    interlocutor: null,
    interviewType: null,
    description: null,
    location: null,
    onAppointment: null,

    /**
     * action types :
     * <li> 'set-interview-data' </li>
     * <li> 'set-type' </li>
     */
    dispatchInterview: () => {},
}

export const AuthContext = React.createContext(initialStateAuth);
export const InterviewContext = React.createContext(initialStateInterview);

export const useAuthContext = () => {
    return useContext(AuthContext);
}
export const useInterviewContext = () => {
    return useContext(InterviewContext);
}


/**
 * Composant qui sert à distribuer les données du context dans l'application.
 * @param {données de contexte} props 
 * @returns 
 */
export default function BigProvider(props) {
    const { userState, dispatchUserData } = useAuthContextData(initialStateAuth);
    const { interviewState, dispatchInterview} = useAuthContextData(initialStateInterview);

    return (
        <AuthContext.Provider value={{
            ...initialStateAuth,
            ...userState,
            dispatchUserData: dispatchUserData,
            } } >
            <InterviewContext.Provider value={{ ...initialStateInterview, ...interviewState, dispatchInterview: dispatchInterview} } >
                { props.children }
            </InterviewContext.Provider>

        </AuthContext.Provider>
    )
}

export const useAuthContextData = (initial) => {


    const [ interviewState, dispatchInterview ] : [Partial<interviewProps>, React.Dispatch<interviewProps>] = useReducer<any>(interviewReducer, initial );
    const [ userState, dispatchUserData] : [Partial<userProps>, React.Dispatch<userProps>] = useReducer<any>(userDataReducer, initial );

    function userDataReducer(state: Partial<userProps>, action: Readonly<action>) {
        const assignState = (newState: Partial<userProps>) => {
            return Object.assign({}, state, newState);
        }
        const payload: Partial<userProps> = action.payload;
        switch (action.type) {
            case 'fill-user-data':
               return assignState({
                   token: payload.token,
                   userFirstName: payload.userFirstName, userLastName: payload?.userLastName})
            case 'fill-link-code' :
                return assignState({ linkedinCode: payload.linkedinCode })
            default:
                throw new Error("reducer invalid. Unknown action : " + action?.type);
        }
    }


    function interviewReducer(state: Partial<interviewProps>, action: action) {
        const assignState = (newState: any) => {
            return Object.assign({}, state, newState);
        }
        const assignType = (newState: Pick<interviewProps, 'interviewType'> ) => assignState(newState)
        const assingnInterviewData = (newState: Partial<interviewProps>) => assignState(newState)
        const payload = action.payload;
        switch (action.type) {
            case 'set-type':
                return assignType({ interviewType: payload.interviewType} )
            case 'set-interlocutor-name':
                return assignState({interlocutor: payload.interlocutor})
            case 'set-interview-data' :
                return assingnInterviewData({
                    interviewType: payload.interviewType,
                    description: payload.description,
                    startDate: payload.startDate, endDate: payload.endDate,
                    onAppointment: payload.onAppointment,
                    interlocutor: payload.interlocutor
                })
            default:
                throw new Error("action non  défini : " + action.type)
            }
    }
    
    return { userState, dispatchUserData, interviewState, dispatchInterview }
}