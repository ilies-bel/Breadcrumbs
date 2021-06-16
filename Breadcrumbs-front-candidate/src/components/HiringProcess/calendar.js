import React, {useState} from 'react';
import MomentUtils from '@date-io/moment';
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import Collapse from '@material-ui/core/Collapse';

const filterWeekends = (date) => {
    const day = date.day()
    return day() !== 0 && day() !== 6
}



function CalendarPage(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = React.useState(false);

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
        setOpen(!open)
    };
    const handleTimeChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };


    return (
        <div>

            <MuiPickersUtilsProvider utils={MomentUtils}>

                    <DatePicker
                        label="Select your day"

                        value={selectedDate}
                        onChange={handleDateChange}
                        inputVariant="outlined"
                        disablePast
                        showTodayButton

                    />
                    <Collapse in={open} unmountOnExit>
                    <TimePicker
                        label="Select the time"
                        onChange={handleTimeChange}
                        value={selectedDate}
                    />
                    </Collapse>
                    

            </MuiPickersUtilsProvider>

        </div>
    );
}

export default CalendarPage;
