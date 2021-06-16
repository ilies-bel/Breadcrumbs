import React, {useState} from "react";
import { PageDescription} from "Navigation";
import {useHistory} from "react-router-dom";
import { SignInGoogleBase, SignInLinkedinBase} from "littleComponents";
import Login from "components/AuthentificationJwt/login/loginEmail";


const LoginPage = () => {

    return (
        <div>
            <PageDescription>Sign in</PageDescription>
            <Login/>
            <SignInGoogleBase />
            <SignInLinkedinBase />
        </div>
    )
}
export default LoginPage;