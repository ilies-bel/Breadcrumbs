import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from 'react-router-dom'

import EmailSignInPage from "./emailSignIn"
import OnBoardingPage from "./onboarding"
import ConfirmationPage from "./confirmation"
import LoginPage from "components/AuthentificationJwt/login";

const welcomePage = () => {

    return (

        <>
            <Router>

                <Switch>

                    <Route exact path="/auth/signup/" component={OnBoardingPage}/>
                    <Route path="/auth/signup/email" component={EmailSignInPage}/>
                    <Route path="/auth/signup/confirmation" component={ConfirmationPage}/>
                    <Route path="/auth/login" component={LoginPage}/>

                </Switch>

            </Router>
        </>
    )
}

export default welcomePage;