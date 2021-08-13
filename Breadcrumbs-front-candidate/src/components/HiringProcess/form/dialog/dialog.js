import React, {useState, useEffect, lazy, Suspense } from 'react';

const DialogTitle = lazy(() => import('@material-ui/core/DialogTitle'));
const DialogContent = lazy(() => import('@material-ui/core/DialogContent'));
const DialogActions = lazy(() => import('@material-ui/core/DialogActions'));
const Dialog = lazy(() => import('@material-ui/core/Dialog'));
const RadioGroup = lazy(() => import('@material-ui/core/RadioGroup'));
const Radio = lazy(() => import('@material-ui/core/Radio'));
const FormControlLabel = lazy(() => import('@material-ui/core/FormControlLabel'));
const FormLabel = lazy(() => import('@material-ui/core/FormLabel'));
const FormControl = lazy(() => import('@material-ui/core/FormControl'));
const FormGroup = lazy(() => import('@material-ui/core/FormGroup'));
const Checkbox = lazy(() => import('@material-ui/core/Checkbox'));
const Button = lazy(() => import('@material-ui/core/Button'));
const EventAvailableOutlined = lazy(() => import('@material-ui/icons/EventAvailableOutlined'));

import DateTime from "luxon/src/datetime";
import { useInterviewContext } from 'utils/context';

const optionsCalendar = ['Google calendar','Outlook',]

const openCalendarLink = (goo, outl, startTime, endTime, type, location='No location provided') => {
  if(outl) {
    const forOutlookStartTime = DateTime.fromISO(startTime).toISO();
    const forOutlookEndTime = DateTime.fromISO(endTime).toISO();

    window.open(`https://outlook.office.com/calendar/0/deeplink/compose?enddt=${forOutlookEndTime}&location=${location}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${forOutlookStartTime}&subject=${type}`);
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
  const context = useInterviewContext();

  const startTime = context.startDate;
  const endTime = context.endDate;
  const type = context.interviewType;
  const location = context.location;
  
  const handleChange = (event) => {
    setState({ ...calendarChosen, [event.target.name]: event.target.checked });
  };

  const handleCancel = () => {
    props.onClose()
  };

  const handleOk = (goo, outl, startTime, endTime, type, location) => {
    openCalendarLink(goo, outl, startTime, endTime, type, location);
    props.onClose()
  };

  return (
    <Suspense fallback={ <p>Wait ...</p> } >
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
          <Button color='primary' variant='contained' onClick={() => handleOk(calendarChosen.google, calendarChosen.outlook, startTime, endTime, type, location) } startIcon={<EventAvailableOutlined />} >
            Confirm
          </Button>
        </div>
      </DialogActions>
    </Dialog>
    </Suspense>
  )
}