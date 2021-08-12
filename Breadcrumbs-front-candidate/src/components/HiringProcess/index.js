import React, { useEffect } from 'react';
import {BrowserRouter as Router, Link, NavLink, Redirect, Route, useRouteMatch, useHistory} from 'react-router-dom';

import {TitleSource} from "../Navigation/titleContext";

import {CONFIRM, DISPO, HIRING_PROCESS_TITLE, HIRING_PROCESS} from "constants/routes";

import HiringProcess from './hiring';
import MilestonePage from './milestone'
import SelectDate from './form/disponibilities';
import ConfirmPage from './form/confirm';
import {useGetMyAppointment, useGetProcess} from "../../utils/axios";
import {useAuthContext} from "components/AuthentificationJwt/context";
import NotFound from "components/NotFound";
import CircularProgress from "@material-ui/core/CircularProgress";

import { PageDescription } from 'Navigation';

const HiringProcessPage = (props) => {
    const {path, url} = useRouteMatch();
    const authContext = useAuthContext();
    const [{ dataProcess, loadingProcess, errorProcess }, refetch] = useGetProcess();

    if( (!authContext.token && !authContext.linkedinCode)) { return  <NotFound /> }
    if(errorProcess) {return ( <strong>Error. No found data</strong> )}
    if( loadingProcess ) { return <CircularProgress /> }

    return (
        <>
            <TitleSource>{HIRING_PROCESS_TITLE}</TitleSource>
            <h2>Hey {authContext.userName} !</h2>
            <Router>
                <div>
                <Redirect to={`${url}/hiring`} />
                    <Route path={`${url}/hiring`} component={HiringProcess} />
                    <Route path={CONFIRM} component={ConfirmPage} />
                    <Route path={`${url}/milestone`} component={MilestonePage} />
                    <Route path={DISPO} component={SelectDate} />
                    
                </div>
            </Router>
        </>

    );
}

export default HiringProcessPage;
