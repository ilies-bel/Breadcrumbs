import React, {useContext, useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PageDescription } from 'Navigation';
import PaperDiv from "littleComponents/PaperDiv"
import DateItem from './dateItem';

import { useGetDisponibilities } from 'utils/axios'

import { useInterviewContext} from "../../../utils/context";

const useStyles = makeStyles(theme => ({
    dispoInput: theme.element.button.big,
    link: theme.element.link.secondary,
    
}))


const SelectDate = () => {
    const [{ data, loading, error }, execute] = useGetDisponibilities();
    const context = useInterviewContext();

    React.useEffect(() => {
        execute()
    }, [])

    if (loading) return <CircularProgress />
    if(error) return <strong>Error. No data found</strong>
    let isdataEmpty = data.length <= 0;

    if(isdataEmpty) return <strong>table availability is empty</strong>

    if(!isdataEmpty) return (
        <PaperDiv>
        <h1>{ context.interviewType } </h1>
        <hr className="titleUnderline" />
        <PageDescription>Book your appointment</PageDescription>
            {
                data.map((avalability, index) =>
                    <DateItem key={index}
                    startDate={avalability?.startDate}
                    endDate={avalability?.endDate}
                    interlocutor={avalability?.interlocutor}
                    location={avalability?.location}
                    />
                )
            }
        <DateItem />
    </PaperDiv>
    );
}

export default SelectDate