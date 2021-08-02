import React, {useState} from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, useHistory, useParams, useRouteMatch,} from 'react-router-dom';
import { DateTime } from "luxon";
import { PageDescription } from 'Navigation';
import {HIRING_DESCRIPTION} from "constants/description";
import {FlashyButton, PaperDiv, SpacingVertical} from "littleComponents";
import { Calendar } from 'tabler-icons-react';
import ConfirmationDialogRaw from './dialog/dialog';
import { AuthContext, useAuthContext} from "../../AuthentificationJwt/context";
import { useCancelAppointment } from 'utils/axios';
import { HIRING_PROCESS } from '../../../constants/routes';

const ConfirmPage = () => {
    const [modalOpen, setOpen] = useState(false);
    const context = useAuthContext();
    const history = useHistory();

    const [{data: dataCancel}, execute] = useCancelAppointment(context.token, {
        startDate: context.startDate,
        endDate: context.endDate
    });

    const startDate = DateTime.fromISO(context?.startDate).toLocaleString(DateTime.DATETIME_SHORT);
    const endDate = DateTime.fromISO(context?.endDate).toFormat('hh:mm');
    const title = context?.title;
    const interlocutor = context?.interlocutor;

    async function cancel() {
        return await execute()
    }
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
   
            <SpacingVertical/>

                <PageDescription>
                    <div>Beginning at {startDate}</div>
                    <div> to {endDate} </div>
                    <div>with {interlocutor} </div>
                </PageDescription>

 
            <SpacingVertical/>

            {
                !dataCancel &&
                <FlashyButton onClick={handleOpen}>
                <Calendar
                    size={20}
                    strokeWidth={1}
                    color={'white'}
                />
                Add to my calendar
                </FlashyButton>
            }
            <ConfirmationDialogRaw open={modalOpen} onClose={handleClose} />

            <SpacingVertical/>

            <a onClick={() => history.goBack() } > {'<'} Back to home screen </a>
            <SpacingVertical/>
            { dataCancel && <strong>{dataCancel}</strong>}
            { !dataCancel && <button onClick={() => cancel()} >Cancel this appointment</button>}
            
        </PaperDiv>
    )
}

export default ConfirmPage;