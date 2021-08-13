import React, {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import * as ROUTES from 'constants/routes';

import HomePage from '../Home';
import AccountPage from '../Account';
import {BottomNav, TopNav, PageDescription, MainNav} from 'Navigation';
import HiringProcessPage from '../HiringProcess';
import TipsPage from '../Tips';
import OfficePage from '../Office';
import AmbassadorsPage from '../Ambassadors';
import SocialPage from '../Social';
import ConfirmPage from '../HiringProcess/form/confirm'

import {TitleSource} from "Navigation/titleContext";
import {TitleDescriptionSource} from "Navigation/descriptionContext"
import {makeStyles} from "@material-ui/core";

import LoginPage from "components/AuthentificationJwt/login/";
import LoginEmailPage from "components/AuthentificationJwt/login/loginEmail";
import OnBoardingPage from "components/AuthentificationJwt/signIn";
import BigProvider, { AuthContext, useAuthContextData, useAuthContext } from 'utils/context';

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const App = () => {
    const classes = useStyles();
    const context = useAuthContext();

    const token = context.token;


    return (
        <div>            
            <Router>
                <BigProvider >
                { !token && <Redirect to="/login" /> }
                { token  && <Redirect to={ROUTES.HIRING_PROCESS}/>}
                    <TopNav/>
                    <MainNav>
                        <TitleSource>Breadcrumbs</TitleSource>
                        <div className={classes.offset}/>

                        <TitleDescriptionSource></TitleDescriptionSource>
                        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                        <Route path={ROUTES.HIRING_PROCESS} component={HiringProcessPage}/>
                        <Route path={ROUTES.TIPS} component={TipsPage}/>
                        <Route path={ROUTES.OFFICE} component={OfficePage}/>
                        <Route path={ROUTES.AMBASSADORS} component={AmbassadorsPage}/>
                        <Route path={ROUTES.SOCIAL} component={SocialPage}/>
                        <Route path={ROUTES.CONFIRM} component={ConfirmPage}/>

                        <Route path="/auth" component={OnBoardingPage} />
                        { !token &&  <Route path="/login" component={LoginPage}/> }
                        
                    </MainNav>
                    <BottomNav/>
                </BigProvider>
            </Router>
        </div>

    );
}

export default App;
