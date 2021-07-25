import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, useRouteMatch, useHistory, Link} from 'react-router-dom';
import useAxios from 'axios-hooks'
import Moment from 'moment'; //TODO: essayer Luxon

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PageDescription } from 'Navigation';
import DateItem from './dateItem';

import { useGetDisponibilities } from 'utils/axios'

import {AuthContext, useAuthContext} from "../../AuthentificationJwt/context";

const useStyles = makeStyles(theme => ({
    dispoInput: theme.element.button.big,
    link: theme.element.link.secondary,
    
}))



const SelectDate = () => {
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
                    />
                )
            }
        <DateItem />
    </>
    );
}

export default SelectDate