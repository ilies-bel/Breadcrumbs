import React from 'react';
import {BrowserRouter as Router, Link, Route, useHistory, useRouteMatch,} from 'react-router-dom';

import {TitleSource} from "../Navigation/titleContext";
import {AuthUserContext} from "../AuthentificationFirebase/Session";
import {HIRING_PROCESS_TITLE, DISPO, RESERVATION, CONFIRM} from "../../constants/routes";
import {HIRING_DESCRIPTION} from "../../constants/description";

import {TitleDescriptionSource} from "../Navigation/descriptionContext"
import { PageDescription } from 'littleComponents';

import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import InsertInvitationOutlinedIcon from '@material-ui/icons/InsertInvitationOutlined';
import './hiring.scss';
import { useGetProcess } from '../../utils/axios';
import {HelpOutline} from "@material-ui/icons";
import {useAuthContext} from "components/AuthentificationJwt/context";

const useStyles = makeStyles(theme => ({
    button: {
        height: '50px',
        width: '100%',
        borderStyle: 'Solid',
        borderColor: '#3572F1',
        borderWidth: '2px',
        borderRadius: '5px',
        padding: '50px',
        background: '#EBF1FE',
        color: '#3572F1',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: '20px',
        lineHeight: '23px',
        letterSpacing: '-0.01em'
    },
    link: theme.element.link.secondary,
}))

const HiringProcess = () => {
    const history = useHistory();
    const {path, url} = useRouteMatch();
    const classes = useStyles();
    const [{ data, loading, error }, refetch] = useGetProcess();
    const context = useAuthContext();

    if (loading) return <CircularProgress />
    if (error) return <strong>Error. No data found</strong>

    return (
        <>
            <PageDescription>{HIRING_DESCRIPTION.PROCESS}</PageDescription>
            <ol className="timeline">
                {data.map((process, i) =>
                <li key={i} >
                    <ButtonBase className={classes.button} onClick={() => history.push(`milestone/${process?.milestone_name}`)} >
                        <div className="buttonTitle">Due to 2{i} november</div>
                        <a className={classes.label} >
                                { process?.milestone_name }
                        </a>
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
