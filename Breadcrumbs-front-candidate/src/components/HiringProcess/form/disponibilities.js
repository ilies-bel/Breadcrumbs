import React, {useEffect, useState} from 'react';
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
        startTime: "13:15",
        endTime: "14:00"
    },
    {
        day: "23 November 2021",
        startTime: "14:15",
        endTime: "15:00"
    },
    {
        day: "23 November 2021",
        startTime: "15:15",
        endTime: "16:00"
    },
    {
        day: "24 November 2021",
        startTime: "10:11",
        endTime: "11:00"
    },
    {
        day: "23 November 2021",
        startTime: "11:15",
        endTime: "12:00"
    }
]
const DateItem = (props) => {
    const history = useHistory();
    if (!(props.day && props.startTime && props.endTime)) {
        return (
            <Accordion>
                <AccordionSummary>
                    Error. No appointment Found <ExpandMore/>
                </AccordionSummary>
            </Accordion>
        )
    }
    else {
        return (
            <Accordion>
                <AccordionSummary>
                    {props.day} | {props.startTime} to {props.endTime} <ExpandMore/>
                </AccordionSummary>
                <AccordionDetails className="appointmentDetails">
                    <div>
                    You’re about to book an appointment for your phone interview.<br/>

                    Do you confirm this time slot?</div>
                    <FlashyButton onClick={() => history.push(CONFIRM)} > Confirm Appointment </FlashyButton>
                </AccordionDetails>
            </Accordion>
        )
    }
}
const SelectDate = () => {
    const [open, setOpen] = useState(false);
    const [{ data, loading, error }, refetch] = useGetDisponibilities();
    const history = useHistory();

    function handleModal() {
        setOpen(!open);
    }

    return (
        <>
        <PageDescription>Book your appointment</PageDescription>
            {
                datesTab.map((appointment, index) =>
                    <DateItem key={index}
                        day={appointment.day}
                    startTime={appointment.startTime}
                    endTime={appointment.endTime}
                    />
                )
            }
            <DateItem />
        <ConfirmModal handleModal={handleModal} open={open} />
    </>
    );
}

export default SelectDate