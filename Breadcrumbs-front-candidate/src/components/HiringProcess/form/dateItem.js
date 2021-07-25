import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, useRouteMatch, useHistory, Link} from 'react-router-dom';
import useAxios from 'axios-hooks'
import Moment from 'moment'; //TODO: essayer Luxon

import {CONFIRM, DISPO} from 'constants/routes';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {FlashyButton} from "littleComponents";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useCreateAppointment } from '../../../utils/axios';
import {AuthContext, useAuthContext} from "../../AuthentificationJwt/context";

import { PageDescription } from 'Navigation';


export default function DateItem(props) {
    const history = useHistory();    

    const context = useAuthContext();
    const token = window.localStorage.getItem("token");
    

    const [{data, loading, error}, execute] = useCreateAppointment({
        startDate: props?.startDate ?? "30 february 2005",
        endDate: props?.endDate ?? "30 february 202",
        interlocutor_email: "collaborator@breadcrumbs.com"
    }, token);
    
    
    const handleConfirm = async() => {

        await execute().then(res => console.log(res));

        history.push(CONFIRM)
    }
    if (!(props.startDate && props.endDate)) {
        return (
            <Accordion>
                <AccordionSummary>
                    Error. Bad ressource <ExpandMore/>
                </AccordionSummary>
            </Accordion>
        )
    }
    else {
        return (
            <AuthContext.Consumer>
            {({ setAppointment, setInterview}) => (
                <Accordion>
                    <AccordionSummary>
                        {props.startDate} to {props.endDate} <ExpandMore/>             
                    </AccordionSummary>
                    <AccordionDetails className="appointmentDetails">
                        <PageDescription>
                            <div>
                            with {props?.interlocutor?.first_name} {props?.interlocutor?.last_name}
                            </div>

                            <div>
                            You’re about to book an appointment for your phone interview.<br/>

                            Do you confirm this time slot?
                            </div>

                            <FlashyButton onClick={() => {
                                handleConfirm(props.startDate, props.endDate);
                                setInterview({ interviewer: props?.interlocutor?.first_name})
                                setAppointment(props.startDate, props.endDate);
                            }} > Confirm appointment 
                            </FlashyButton>
                        </PageDescription>
                    </AccordionDetails>
                </Accordion>
            )}
            </AuthContext.Consumer>
        )
    }
}