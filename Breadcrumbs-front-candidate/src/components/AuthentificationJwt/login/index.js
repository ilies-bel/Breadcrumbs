import React, {useState, useEffect} from "react";
import { PageDescription} from "Navigation";
import {BrowserRouter as Switch, Route, useHistory, useRouteMatch, Redirect} from "react-router-dom";
import { SignInGoogleBase, SignInLinkedinBase} from "littleComponents";
import LoginEmailPage from "./loginEmail"
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import * as ROUTES from 'constants/routes';
import { useAuthContext } from "../context";


const LoginPage = () => {
    const { url, path } = useRouteMatch();
    console.log(path);
    console.log(url);
    const history = useHistory();
    const context = useAuthContext();

    useEffect(() => {
        return () => history.replace(ROUTES.HIRING_PROCESS)
    }, [context.token])

    return (
        <div>
            <Switch>
                <Redirect to={`${path}/email`}/>
                <Route path={`${path}/email`} component={LoginEmailPage}/>
                <Route path={`${url}/linkedin`} component={LinkedInPopUp} /> 
            </Switch>
            <div>
                <img className='frame' src="/Frame.svg" />
            </div>
        </div>
    )
}
export default LoginPage;