import React from 'react';
import {useSession} from "next-auth/client";
import LoginPage from "./Authentification/login";
import {CircularProgress} from "@material-ui/core";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Tips from "./tips";
import Office from "./office";
import {useAuthContext} from "./Authentification/context";

const publicPages = [ Tips, Office ]
export default function RestrictedPages({children}) {
    const context = useAuthContext();

    const token = context.token;

    if( !token && publicPages.includes(children) ) return (
        <div className="restricted" >
            {children}
        </div>
    )

    if(!token) return <strong>You have to be signed in.<LoginPage /></strong>
    if(token) return (
        <div className="restricted" >
            {children}
        </div>
    )
}