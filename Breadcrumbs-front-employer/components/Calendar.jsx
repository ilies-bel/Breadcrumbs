/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  DragDropProvider,
  Toolbar,
  DateNavigator,
  TodayButton,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import axios from 'axios';

//Requête à effectuer à chaque changement dans le calendrier
  axios.defaults.baseURL = process.env.BASE_API_URL;
  const fetchData = async (changedData) => await
      axios.post(`/api/tips?data`, changedData)
          .then(res => (console.log(res.data)))
          .catch(() => ({
                  error: true,
                  tipsList: null,
              }),
          );

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: 'roylalblue',
      borderRadius: '8px',
      fontFamily: 'Roboto'
    }}
  >
    {children}
  </Appointments.Appointment>
);

  const SHIFT_KEY = 16;

  export default class Demo extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.resList,
        currentDate: this.props.resList[4].startDate,
        isShiftPressed: false,
      };
      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  
      this.commitChanges = this.commitChanges.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
      //fetchData();
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', function cal(){});
      window.removeEventListener('keyup', function cal(){});
    }
  
    onKeyDown(event) {
      if (event.keyCode === SHIFT_KEY) {
        this.setState({ isShiftPressed: true });
      }
    }
  
    onKeyUp(event) {
      if (event.keyCode === SHIFT_KEY) {
        this.setState({ isShiftPressed: false });
      }
    }
  
    commitChanges({ added, changed, deleted }) {
      this.setState((state) => {
        let { data } = state;
        const { isShiftPressed } = this.state;
        if (added) {
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
          if (isShiftPressed) {
            const changedAppointment = data.find(appointment => changed[appointment.id]);
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [
              ...data,
              { ...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id] },
            ];
          } else {
            data = data.map(appointment => (
              changed[appointment.id]
                ? { ...appointment, ...changed[appointment.id] }
                : appointment));
          }
        }
        if (deleted !== undefined) {
          data = data.filter(appointment => appointment.id !== deleted);
        }
        
        //On envoie une requête à une api pour enregistrer les changements
        fetchData(data);   
        return { data };
      });
    }
  
    render() {
      const { currentDate, data } = this.state;
  if(data){
      return (
        <Paper>
          <Scheduler
            data={data}
            height={1000}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <WeekView
                startDayHour={9}
                endDayHour={18}
            />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <EditingState
              onCommitChanges={this.commitChanges}
            />
            <IntegratedEditing />

            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              showDeleteButton
            />
            <DragDropProvider />
          </Scheduler>
        </Paper>
      );
  }
  else {
    return(null)
  }
    }
  }
  