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

import {AuthContext} from "components/AuthentificationJwt/context";
import LoginEmailPage from "components/AuthentificationJwt/login/loginEmail";
import OnBoardingPage from "components/AuthentificationJwt/signIn";
import BigProvider, { useContextdata } from '../AuthentificationJwt/context';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const App = () => {
    const classes = useStyles();

    const { token, user, setUserData, startDate, endDate, setData, setAppointment, interlocutor, setInterlocutor } = useContextdata();    

    return (
        <div>            
            <Router>
                <AuthContext.Provider value={ {
                    token: token,
                    userName: user,
                    startDate: startDate,
                    endDate: endDate,
                    interlocutor,
                    setData: setUserData, setAppointment: setAppointment, setInterlocutor: setInterlocutor } } >
                { !token && <Redirect to="/login/email"/>}
                { token && <Redirect to={ROUTES.HIRING_PROCESS}/>}
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
                        <Route path="/login/email" component={LoginEmailPage}/>
                    </MainNav>
                    <BottomNav/>
                </AuthContext.Provider>
            </Router>
        </div>

    );
}

export default App;
