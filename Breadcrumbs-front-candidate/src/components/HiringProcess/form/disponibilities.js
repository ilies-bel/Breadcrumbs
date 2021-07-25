import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, useRouteMatch, useHistory, Link} from 'react-router-dom';
import useAxios from 'axios-hooks'
import Moment from 'moment'; //TODO: essayer Luxon
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PageDescription } from 'Navigation';
import ConfirmModal from './modal';
import {CONFIRM, DISPO} from 'constants/routes';

import { useGetDisponibilities } from 'utils/axios'
import Grid from "@material-ui/core/Grid";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {FlashyButton} from "littleComponents";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useCreateAppointment } from '../../../utils/axios';
import {AuthContext, useAuthContext} from "../../AuthentificationJwt/context";

const useStyles = makeStyles(theme => ({
    dispoInput: theme.element.button.big,
    link: theme.element.link.secondary,
    
}))


const DateItem = (props) => {
    const history = useHistory();

    const context = useAuthContext();
    const token = window.localStorage.getItem("token");

    const [{data, loading, error}, execute] = useCreateAppointment({
        startDate: props?.startDate ?? "30 february 2005",
        endDate: props?.endDate,
        title: props?.title ?? "Phone Call",
        interlocutor_email: "collaborator@breadcrumbs.com"
    }, token);
    
    const handleConfirm = async(startDate, endDate, setAppointment) => {
        await execute({}).then(res => console.log(res));
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
            {({title, startDate, endDate, interlocutor, setAppointment}) => (
                <Accordion>
                    <AccordionSummary>
                        {props.startDate} to {props.endDate} <ExpandMore/>             
                    </AccordionSummary>
                    <AccordionDetails className="appointmentDetails">
                        <h3>
                        with {props?.interlocutor?.first_name} {props?.interlocutor?.last_name}
                        </h3>

                        <div>
                        You’re about to book an appointment for your phone interview.<br/>

                        Do you confirm this time slot?</div>
                        <FlashyButton onClick={() => {
                            handleConfirm(props.startDate, props.endDate);
                            setAppointment('Phone Call', props.startDate, props.endDate, "Collaborator Beldji");
                        }} > Confirm appointment </FlashyButton>
                    </AccordionDetails>
                </Accordion>
            )}
            </AuthContext.Consumer>
        )
    }
}
const SelectDate = () => {
    const [open, setOpen] = useState(false);
    const [{ data, loading, error }] = useGetDisponibilities();

    if (loading) return <CircularProgress />
    if(error) return <strong>Error. No data found</strong>
    let isdataEmpty = data.length <= 0;

    if(isdataEmpty) return <strong>table availability is empty</strong>

    if(!isdataEmpty) return (
        <>
        <PageDescription>Book your appointment</PageDescription>
            {
                data.map((avalability, index) =>
                    <DateItem key={index}
                    startDate={avalability?.startDate}
                    endDate={avalability?.endDate}
                              interlocutor={avalability?.interlocutor}
                              title={avalability?.title}
                    />
                )
            }
            <DateItem />
    </>
    );
}

export default SelectDate