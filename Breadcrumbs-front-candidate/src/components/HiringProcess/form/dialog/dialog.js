import React, {useState, useEffect, useRef} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import EventAvailableOutlined from '@material-ui/icons/EventAvailableOutlined';

import { DateTime } from "luxon";
import { useAuthContext } from '../../../AuthentificationJwt/context';

const optionsCalendar = ['Google calendar','Outlook',]

const openCalendarLink = (goo, outl, startTime, endTime, type) => {
  if(outl) {
    const forOutlookStartTime = DateTime.fromISO(startTime).toISO();
    const forOutlookEndTime = DateTime.fromISO(endTime).toISO();

    window.open(`https://outlook.office.com/calendar/0/deeplink/compose?enddt=${forOutlookEndTime}&location=Ouroffice&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${forOutlookStartTime}&subject=${type}`);
  }
  if(goo) {
    const forGoogleStartTime = DateTime.fromISO(startTime).toFormat("yyyyMMdd'T'hhmmss");
    const forGoogleEndTime = DateTime.fromISO(endTime).toFormat("yyyyMMdd'T'hhmmss'Z'");

    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${forGoogleStartTime}%2F${forGoogleEndTime}&location=Ouroffice&text=${type}`)
  }  
  
}

export default function ConfirmationDialogRaw(props) {
  const [calendarChosen, setState] = useState({
    google: false,
    outlook: false,
  });
  const context = useAuthContext();

  const startTime = context.startDate;
  const endTime = context.endDate;
  const type = context.interviewType;
  
  const handleChange = (event) => {
    setState({ ...calendarChosen, [event.target.name]: event.target.checked });
  };

  const handleCancel = () => {
    props.onClose()
  };

  const handleOk = (goo, outl, startTime, endTime, type) => {
    openCalendarLink(goo, outl, startTime, endTime, type);
    props.onClose()
  };

  return (
  <Dialog
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle id="confirmation-dialog-title">Choose your calendar app</DialogTitle>
      <DialogContent>
          <FormControl>
          <FormControlLabel
            control={<Checkbox checked={calendarChosen.google} onChange={handleChange} name="google" />}
            label="Google Calendar"
          />
          <FormControlLabel
            control={<Checkbox checked={calendarChosen.outlook} onChange={handleChange} name="outlook" />}
            label="Outlook"
          />
          </FormControl>
      </DialogContent>
      <DialogActions>
        <div className='dialogButtons' >
          <Button variant='contained' onClick={props.onClose}>Cancel</Button>
          <Button color='primary' variant='contained' onClick={() => handleOk(calendarChosen.google, calendarChosen.outlook, startTime, endTime, type) } startIcon={<EventAvailableOutlined />} >
            Confirm
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}