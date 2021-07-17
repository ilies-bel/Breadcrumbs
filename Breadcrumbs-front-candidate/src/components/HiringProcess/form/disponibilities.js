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

const useStyles = makeStyles(theme => ({
    dispoInput: theme.element.button.big,
    link: theme.element.link.secondary,
    
}))

const DispoInput = (props) => {
  const classes = useStyles();
    return (
    <>
    <Button className={classes.dispoInput} variant="outlined" color="primary">
      <div>Beginning at :{props.start} </div>
      <div>End at : {props.end}</div>
      {props.interviewer && <pre>with {props.interviewer}</pre>}
    </Button>

    </>
    )

}
const datesTab = [
    {
        day: "23 November 2021",
        startDate: "13:15",
        endDate: "14:00"
    },
    {
        day: "23 November 2021",
        startDate: "14:15",
        endDate: "15:00"
    },
    {
        day: "23 November 2021",
        startDate: "15:15",
        endDate: "16:00"
    },
    {
        day: "24 November 2021",
        startDate: "10:11",
        endDate: "11:00"
    },
    {
        day: "23 November 2021",
        startDate: "11:15",
        endDate: "12:00"
    }
]
const DateItem = (props) => {
    const history = useHistory();
    const context = useContext();
    const [{data, loading, error}, execute] = useCreateAppointment({
        startDate: props.startDate,
        endDate: props.endDate,
        interviewer: 'collaborator',
        candidate_email: context.email
    });
    
    const handleConfirm = (startDate, endDate) => {
        execute();
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
            <Accordion>
                <AccordionSummary>
                    {props.startDate} to {props.endDate} <ExpandMore/>
                </AccordionSummary>
                <AccordionDetails className="appointmentDetails">
                    <div>
                    You’re about to book an appointment for your phone interview.<br/>

                    Do you confirm this time slot?</div>
                    <FlashyButton onClick={(startDate, endDate) => handleConfirm(startDate, endDate)} > Confirm appointment </FlashyButton>
                </AccordionDetails>
            </Accordion>
        )
    }
}
const SelectDate = () => {
    const [open, setOpen] = useState(false);
    const [{ data, loading, error }] = useGetDisponibilities();
    

    function handleModal() {
        setOpen(!open);
    }

    if (loading) return <CircularProgress />
    if(error) return <strong>Error. No data found</strong>

    return (
        <>
        <PageDescription>Book your appointment</PageDescription>
            {
                data.map((avalability, index) =>
                    <DateItem key={index}
                    startDate={avalability.startDate}
                    endDate={avalability.endDate}
                    />
                )
            }
            <DateItem />
        <ConfirmModal handleModal={handleModal} open={open} />
    </>
    );
}

export default SelectDate