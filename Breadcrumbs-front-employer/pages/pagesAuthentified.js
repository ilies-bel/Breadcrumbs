import React from 'react';
import {useSession} from "next-auth/client";
import LoginPage from "./Authentification/login";
import {CircularProgress} from "@material-ui/core";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Tips from "./tips";
import Office from "./office";
import {useAuthContext} from "../utils/context";

export default function RestrictedPages({children}) {
    const context = useAuthContext();
    const token = context.token;
    console.log(context);console.log("/context")

    if(!token) return (
        <>
            <h2>Login with your collaborator credentials</h2>
            <LoginPage />
        </>
    )
    if(token) return (
        <div className="restricted" >
            {children}
        </div>
    )
}