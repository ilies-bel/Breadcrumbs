import React from 'react';
import {BrowserRouter as Router, useHistory } from 'react-router-dom';
import { DateTime } from "luxon";

import {CONFIRM, DISPO} from 'constants/routes';

const Accordion = React.lazy(() => import('@material-ui/core/Accordion'));
const AccordionDetails = React.lazy(() => import('@material-ui/core/AccordionDetails'));
const AccordionSummary = React.lazy(() => import("@material-ui/core/AccordionSummary"));

const ExpandMore = React.lazy(() => import("@material-ui/icons/ExpandMore"));

import { useCreateAppointment } from 'utils/axios';
import {AuthContext, useAuthContext} from "../../AuthentificationJwt/context";
import {FlashyButton} from "littleComponents";
import { PageDescription } from 'Navigation';


export default function DateItem(props) {
    const history = useHistory();    

    const context = useAuthContext();
    const token = window.localStorage.getItem("token");
    
    const day =  DateTime.fromISO(props.startDate).toFormat('dd MMMM yyyy')
    const startTime = DateTime.fromISO(props.startDate).toFormat(' hh:mm');
    const endTime = DateTime.fromISO(props.endDate).toFormat(' hh:mm');

    const [{data, loading, error}, execute] = useCreateAppointment({
        startDate: props?.startDate ?? "30 february 2005",
        endDate: props?.endDate ?? "30 february 202",
        interlocutor: props?.interlocutor
    }, token);
    
    
    const handleConfirm = async() => {

        await execute().then(res => context.setAppointment(props.startDate, props.endDate));

        history.replace(CONFIRM)
    }
    if (!(props.startDate && props.endDate)) {
        return (
            <React.Suspense fallback={<p>No data found</p>} >
            <Accordion>
                <AccordionSummary>
                    Error. Bad ressource <ExpandMore/>
                </AccordionSummary>
            </Accordion>
            </React.Suspense>
        )
    }
    else {
        return (
            <AuthContext.Consumer>
            {({ setAppointment, setInterview}) => (
                <React.Suspense fallback={<p>No data found</p>} >
                    <Accordion>
                        <AccordionSummary>
                        <span className="dayItem">{ day }</span>  <span className="timeItem">  | { startTime } to {endTime}</span> <ExpandMore/>             
                        </AccordionSummary>
                        <AccordionDetails className="appointmentDetails">
                            <PageDescription>
                                <div>
                                You’re about to book an appointment for your { context.interviewType } on {day} from {startTime}.<br/>
                                <div>
                                with <strong> {props?.interlocutor?.first_name} {props?.interlocutor?.last_name} </strong>
                                </div>
                                { props?.location &&
                                <div>
                                    in <strong> { props.location }</strong>
                                </div> }

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
                </React.Suspense>
            )}
            </AuthContext.Consumer>
        )
    }
}