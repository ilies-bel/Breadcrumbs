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

const optionsCalendar = ['Google calendar','Outlook',]

const openCalendarLink = (goo, outl) => {
  outl && window.open('https://outlook.office.com/calendar/0/deeplink/compose?enddt=2021-06-15T08%3A45%3A00%2B00%3A00&location=Our%20office&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2021-06-15T08%3A15%3A00%2B00%3A00&subject=Phone%20call');
  goo && window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20210615T081500Z%2F20210615T084500Z&location=Our%20office&text=Phone%20call')
}

export default function ConfirmationDialogRaw(props) {
  const [calendarChosen, setState] = useState({
    google: false,
    outlook: false,
  });
  const handleChange = (event) => {
    setState({ ...calendarChosen, [event.target.name]: event.target.checked });
  };

  const handleCancel = () => {
    props.onClose()
  };

  const handleOk = (goo, outl) => {
    openCalendarLink(goo, outl);
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
          <button onClick={props.onClose}>Cancel</button>
          <button onClick={() => handleOk(calendarChosen.google, calendarChosen.outlook) }>Confirm</button>          
      </DialogActions>
    </Dialog>
  )
}