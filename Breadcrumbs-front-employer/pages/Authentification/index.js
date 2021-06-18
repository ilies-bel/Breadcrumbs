import React from 'react';
import axios from 'axios';

import { providers, signIn, signOut, useSession } from 'next-auth/client'
import LoginPage from './login';

export default function AuthPage({Component}) {
    const [ session, loading ] = useSession();
    if(!session) return ( <LoginPage />)
    if(session) {
        return (
            <Component {...pageProps}/>
        )
    }
}