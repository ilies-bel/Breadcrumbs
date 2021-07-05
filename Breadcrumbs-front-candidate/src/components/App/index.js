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

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const App = () => {
    const classes = useStyles();
    const [ token, setToken ] = useState(window.localStorage.getItem("token"));
    const [ user, setUser ] = useState(window.localStorage.getItem("user"));

    function setData(token, user) {
        setToken(token);
        setUser(user);
    }

    return (
        <div>
            <Router>
                <AuthContext.Provider value={ { token: token, userName: user, setData: setData } } >
                {/* { !token && <Redirect to="/login/email"/>} */}
                    <TopNav/>
                    <MainNav>
                        <TitleSource>Breadcrumbs</TitleSource>
                        <div className={classes.offset}/>

                        <TitleDescriptionSource></TitleDescriptionSource>
                        <Route exact path={ROUTES.LANDING} component={HiringProcessPage}/>
                        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                        <Route path={ROUTES.HIRING_PROCESS} component={HiringProcessPage}/>
                        <Route path={ROUTES.TIPS} component={TipsPage}/>
                        <Route path={ROUTES.OFFICE} component={OfficePage}/>
                        <Route path={ROUTES.AMBASSADORS} component={AmbassadorsPage}/>
                        <Route path={ROUTES.SOCIAL} component={SocialPage}/>
                        <Route path={ROUTES.CONFIRM} component={ConfirmPage}/>

                        <Route path="/auth" component={OnBoardingPage} />
                        { !token && <Route path="/login/email" component={LoginEmailPage}/>}
                    </MainNav>
                    <BottomNav/>
                </AuthContext.Provider>
            </Router>
        </div>

    );
}

export default App;
