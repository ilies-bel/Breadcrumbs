import React from 'react';
import {BrowserRouter as Router, Link, Route, useHistory, useRouteMatch,} from 'react-router-dom';

import {TitleSource} from "../Navigation/titleContext";
import {AuthUserContext} from "../AuthentificationFirebase/Session";
import {HIRING_PROCESS_TITLE, DISPO, RESERVATION, CONFIRM} from "../../constants/routes";
import {HIRING_DESCRIPTION} from "../../constants/description";

import {TitleDescriptionSource} from "../Navigation/descriptionContext"
import { PageDescription } from 'littleComponents';

import ButtonBase from '@material-ui/core/ButtonBase';

import CircularProgress from '@material-ui/core/CircularProgress';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import InsertInvitationOutlinedIcon from '@material-ui/icons/InsertInvitationOutlined';
import './hiring.scss';
import { useGetProcess, useGetMilestone } from 'utils/axios';
import {HelpOutline} from "@material-ui/icons";
import {useAuthContext} from "components/AuthentificationJwt/context";

const HiringProcess = () => {
    const history = useHistory();
    
    const [{ data, loading, error }, refetch] = useGetMilestone();
    const context = useAuthContext();

    const handleButtonClick = (status) => {
        status !== 'pending' && history.push(`milestone/${process?.milestone_name}`)
    }

    if (loading) return <CircularProgress />
    if (error) return <strong>Error. No data found</strong>

    return (
        <>
            <PageDescription>{HIRING_DESCRIPTION.PROCESS}</PageDescription>
            <ol className="timeline">
                {data && data.map((process, i) =>
                <li key={i} className={process?.status} >
                    <ButtonBase onClick={() => handleButtonClick(process?.status) } >
                        <div className="buttonTitle">Due to 2{i} november - {process?.status}</div>
                            
                            { process?.milestone_name } - { process?.interview_type }

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
