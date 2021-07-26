import React, {Context, ContextType, ReactNode, useContext, useState} from "react";

type authContextType = {
    userName: string;
    token: string,
    loading: boolean,

    setToken: (token: string) => void;
    setUserData: ({token, user}: { token?: string; user?: string; }) => {}
};

type Props = {
    children: ReactNode;
};

const authContextDefaultValues: authContextType = {
    userName: null,
    token: null,
    loading: false,
    setToken: () => {},
    // @ts-ignore
    setUserData: ({ token='', user=''}: { token?: string; user?: string; }) => {}
};

export const AuthContext = React.createContext<authContextType>(authContextDefaultValues);

export function useAuthContext() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }: Props) {
    let storageToken: string;
    if(process.browser) {
        storageToken = window.localStorage.getItem("token");
    }

    const [ token, setToken ] = useState<string>(storageToken);
    const [ name, setUser] = useState<string>();
    function tokenContext({token=null, user=''}) {
        token && setToken(token);
        user && setUser(user);
    }


    const value: authContextType = {
        userName: name,
        token: token,
        setToken: setToken,
        // @ts-ignore
        setUserData: tokenContext
    }
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
