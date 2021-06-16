import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import PaperDiv from "components/littleComponents/PaperDiv";
import LoginEmailPage from "components/AuthentificationJwt/login/loginEmail";
import LoginPage from "components/AuthentificationJwt/login";
import ConfirmLoginPage from "components/AuthentificationJwt/confirm";
import {FlashyButton, PageDescription, SignInGoogleBase, SignInLinkedinBase} from "littleComponents";

export const AuthRouterPage = () => {
    const history = useHistory();

    return (
        <Router>
            <>
                <h1>Welcome</h1>
                <PageDescription>Sign in and get started</PageDescription>
                <FlashyButton onClick={() => history.push("/auth/signin/name")} > Sign in with your email</FlashyButton> <br/> <br/>
                <SignInLinkedinBase /><br/>
                <SignInGoogleBase /><br/>
            </>
            <PaperDiv>
                <Switch>
                    <Route path="/auth/login/email" component={LoginEmailPage}/>
                    <Route path="/auth/login" component={LoginPage}/>
                    <Route path="/auth/confirm" component={ConfirmLoginPage}/>
                </Switch>
                <img src="/Frame.svg" alt="Illustration of welcome page"/>
            </PaperDiv>
        </Router>

    )
}