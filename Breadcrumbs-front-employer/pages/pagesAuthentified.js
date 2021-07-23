import React from 'react';
import {useSession} from "next-auth/client";
import LoginPage from "./Authentification/login";
import {CircularProgress} from "@material-ui/core";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Tips from "./tips";
import Office from "./office";

const publicPages = [ Tips, Office ]
export default function RestrictedPages({children}) {
    const [ session, loading ] = useSession();
    if(loading) return ( <CircularProgress />)

    if( !session && publicPages.includes(children) ) return (
        <div className="restricted" >
            {children}
        </div>
    )

    if(!session && !publicPages.includes(children)) return ( <Button variant="outlined" ><Link href="api/auth/signin">Click here to Login with your collaborator credentials</Link></Button> )
    if(session) return (
        <div className="restricted" >
            {children}
        </div>
    )
}