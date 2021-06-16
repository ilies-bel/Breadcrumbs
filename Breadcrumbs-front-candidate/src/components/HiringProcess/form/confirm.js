import React, {useState} from 'react';
import {BrowserRouter as Router, NavLink, Route, useParams, useRouteMatch,} from 'react-router-dom';
import DateFnsAdapter from "@date-io/date-fns"; //TODO: essayer downgrade cette librairie à la version 1.3.13 pour pouvoir formatter les dates
import { PageDescription } from 'Navigation';
import {HIRING_DESCRIPTION} from "constants/description";
import {FlashyButton, PaperDiv} from "littleComponents";
import { Calendar } from 'tabler-icons-react';
import ConfirmationDialogRaw from './dialog/dialog';

const ConfirmPage = () => {
    const [modalOpen, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <PaperDiv>
            <h3> <PageDescription> {HIRING_DESCRIPTION.CONFIRMATION_SUCCESSFUL} </PageDescription></h3>
            <PageDescription>{HIRING_DESCRIPTION.CONFIRMATION_SUCCESSFUL2}</PageDescription>
            <FlashyButton onClick={handleOpen}>
                <Calendar
                    size={20}
                    strokeWidth={1}
                    color={'white'}
                />
                Add to my calendar
            </FlashyButton>
            <ConfirmationDialogRaw open={modalOpen} onClose={handleClose} />
        </PaperDiv>
    )
}

export default ConfirmPage;