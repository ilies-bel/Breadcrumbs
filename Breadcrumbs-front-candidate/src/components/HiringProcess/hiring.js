import React from 'react';
import {BrowserRouter as Link, useHistory,} from 'react-router-dom';
import { DateTime } from "luxon";

import {HIRING_PROCESS_TITLE, DISPO, RESERVATION, CONFIRM} from "../../constants/routes";
import {HIRING_DESCRIPTION} from "../../constants/description";

import {TitleDescriptionSource} from "../Navigation/descriptionContext"
import { PageDescription } from 'littleComponents';

import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import InsertInvitationOutlinedIcon from '@material-ui/icons/InsertInvitationOutlined';

import './hiring.scss';
import { useGetProcess, useGetMilestone, useGetMyAppointment } from 'utils/axios';
import {HelpOutline} from "@material-ui/icons";
import {useAuthContext} from "components/AuthentificationJwt/context";

const HiringProcess = () => {
    const history = useHistory();
    
    const [{ data, loading, error }, executeMilestone] = useGetMilestone();
    const context = useAuthContext();
    
    const [{ data: appointmentData, loading: appointmentLoading, error: errorAppointment }, executeAppointment ] = useGetMyAppointment(context.token);

    React.useEffect(() => {
        executeMilestone()
        executeAppointment().then(() => setInterview(appointmentData))
    }, [])

    
    function setInterview(data) {
        context.dispatchInterview({type: 'set-interview-data', payload: {
            interviewType: data?.type.title,
            description: data?.type.description,
            onAppointment: appointmentData!=null,
            startDate: appointmentData?.startDate,
            endDate: appointmentData?.endDate,
            interlocutor: `${appointmentData?.interlocutor?.first_name} ${appointmentData?.interlocutor?.last_name}`
        }})
    }

    const handleButtonClick = (status) => {
       if( status === 'IN_PROGRESS' && !appointmentData) history.push(`milestone`)
       if( status === 'IN_PROGRESS' && appointmentData ) history.push(CONFIRM);
    }

    if (loading) return <CircularProgress />
    if (error) return <strong>Error. No data found</strong>

    return (
        <>
            <PageDescription>{HIRING_DESCRIPTION.PROCESS}</PageDescription>
            <ol className="timeline">
                {data && data.map((process, i) =>
                    <li key={i} className={process?.status} >
                        <ButtonBase onClick={() => {
                            process?.status=='IN_PROGRESS' && handleButtonClick(process?.status);
                            process?.status=='IN_PROGRESS' && setInterview(process)
                            } } >
                            <div className="buttonTitle">
                                { (process?.status==='IN_PROGRESS' && !appointmentData) && 'Check out availabilities'  }
                                {
                                    (process?.status==='IN_PROGRESS' && appointmentData) && 
                                    `Your next appointment : ${DateTime.fromISO(appointmentData?.startDate).toLocaleString()}`
                                }
                                </div>

                                { process?.milestone_name } -

                                { process?.type.title }

                            <HelpOutline color="primary" />
                            <Link to={`${DISPO}`}>
                                <InsertInvitationOutlinedIcon color="primary" />
                            </Link>
                        </ButtonBase>
                    </li>)
                }
            </ol>
        </>
    );
}

export default HiringProcess;
