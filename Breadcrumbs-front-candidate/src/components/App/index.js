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

import LoginEmailPage from "components/AuthentificationJwt/login/loginEmail";
import OnBoardingPage from "components/AuthentificationJwt/signIn";
import BigProvider, { AuthContext, useContextdata, useAuthContext } from 'components/AuthentificationJwt/context';

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const App = () => {
    const classes = useStyles();
    const context = useAuthContext;

    // On commence par charger les données du context avant de les forunir depuis le BigProvider
    const { token, setUserData, profilePicture, linkedinCode, onConnect } = useContextdata();  

    return (
        <div>            
            <Router>
                <BigProvider >
                { ((!token && !linkedinCode) && !onConnect) && <Redirect to="/login/email" search="?code="/> }
                { ((!token && !linkedinCode) && onConnect) && <Redirect to="/login/email" search="?code="/>}
                { (token || linkedinCode) && <Redirect to={ROUTES.HIRING_PROCESS}/>}
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
                        { (!token || !linkedinCode) && <Route exact path="/login/email" component={LinkedInPopUp} /> }

                        <Route path="/auth" component={OnBoardingPage} />
                        { (!token || !linkedinCode) && <Route path="/login/email" component={LoginEmailPage}/> }
                        { (!token || !linkedinCode) && <Route path="/login/email?code=" component={LoginEmailPage}/> }
                    </MainNav>
                    
                    <BottomNav/>
                </BigProvider>
            </Router>
        </div>

    );
}

export default App;
