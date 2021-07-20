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
  Resources,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import axios from 'axios';
import { getSession } from 'next-auth/client';

const axiosURL = process.env.NEXT_PUBLIC_LIST_URL;

//Requête à effectuer à chaque changement dans le calendrier
  const fetchData = async (changedData, url, token="", onChange=() => {}) => {

    const availabilities = changedData.filter((availability) => availability.type === 'Availability');

    return await axios.put(url, availabilities, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
            .catch(e => {
                  console.error(e);
                }
            )
  };


const allowDrag = ({ type }) => type !== 'Appointment';

const Appointment = ({
  children, style, data, ...restProps
}) => {
    return (
      <Appointments.Appointment
      data={data}
        {...restProps}
        style={{
          ...style,
          borderRadius: '8px',
          fontFamily: 'Roboto',
          cursor: allowDrag(data) ? 'pointer' : 'not-allowed'
        }}
      >
        {children}
      </Appointments.Appointment>
    )
} 
  const SHIFT_KEY = 16;

  export default class Demo extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.resList,
        sessionData: null,
        currentDate: this.props.resList[4].startDate,
        isShiftPressed: false,
        mainResourceName: 'type',
        resources: [
          {
            fieldName: 'type',
            instances: [
              {id: 'Availability', text: 'Free time', color: 'royalblue'},
              {id: 'Appointment', text: 'Appointment with a candidate', color: 'darkgray'}
            ]
          }
        ]
      };
      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
      this.getToken= () => {
        return getSession().then(response => this.setState({sessionData: response?.user?.name?.[3] ?? "No token" }) )
      }
  
      this.commitChanges = this.commitChanges.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
    }
  
    async componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);

      await this.getToken();
      //Les données du calendrier sont mis à jour en base de donnée à chaque fois que l'on charge ce calendrier
      fetchData(this.props.resList, axiosURL, this.state.sessionData ?? "");
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
        
        //On envoie une requête à une api pour enregistrer les changements.
        fetchData(data, axiosURL, this.state.sessionData).then(() => this.props.onChange());
        return { data };
      });
    }
  
    render() {
      const { currentDate, data, resources } = this.state;
  if(data){
      return (
        <Paper>
          <Scheduler
            data={data}
            height={800}
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
            {this.props.onEdit && (<DragDropProvider allowDrag={allowDrag} />) }
            <Resources
              data={resources}
            />
          </Scheduler>
        </Paper>
      );
  }
  else {
    return(null)
  }
    }
  }
  