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
  AppointmentForm,
  ConfirmationDialog,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import axios from 'axios';
import {AuthContext} from "../utils/context";
import { calendarData } from "../utils/calendarData"

const axiosURL = process.env.NEXT_PUBLIC_LIST_URL;

//Requête à effectuer à chaque changement dans le calendrier
  const fetchData = async (changedData, url, token="", onChange=() => {}) => {

    const availabilities = changedData.filter((availability) => availability.type !== 'Appointment');

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

const TimeTableCell = React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={ onDoubleClick}
        />
    ))

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
    constructor(props, context) {
      super(props, context);
      this.state = {
        data: this.props.resList,
        sessionData: null,
        currentDate: this.props.resList[2].startDate,
        addedAppointment: {},
        appointmentChanges: {},
        isShiftPressed: false,
        mainResourceName: 'type',
        resources: calendarData
      };
      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    
      this.commitChanges = this.commitChanges.bind(this);
      this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
      this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
    }

    changeAddedAppointment(addedAppointment) {
      this.setState({ addedAppointment });
    }
    changeAppointmentChanges(appointmentChanges) {
      this.setState({ appointmentChanges });
    }

    async componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
      console.log("data calendar");console.log(this.state.data);console.log("/data calendar");

      //Les données du calendrier sont mis à jour en base de donnée à chaque fois que l'on charge ce calendrier
      fetchData(this.props.resList, axiosURL, this.context?.token ?? "");
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
        
        return { data };
      });
    }
  
    render() {
      const { currentDate, data, resources, addedAppointment, appointmentChanges } = this.state;
      const onEdit = this.props.onEdit;
  if(data){
      return (
        <Paper>
          
          <Scheduler
            data={data}
            height={700}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <WeekView
                startDayHour={9}
                endDayHour={18}
                timeTableCellComponent={TimeTableCell}
            />
            <Toolbar />
            <DateNavigator />
            <TodayButton />

            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
            />
            <IntegratedEditing />
            <ConfirmationDialog />
            <button className={`${this.props.onEdit ? 'inline' : 'hidden'} rounded-md shadow text-white bg-royalblue p-2 ml-20`}
                    title="Fontionnalité non-disponible"
                    onClick={() => fetchData(data, axiosURL, this.context.token ).then(() => this.props.onChange()) } >
                      Save changes
            </button>
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              showDeleteButton={onEdit}
              showOpenButton={onEdit}
            />
            {onEdit && <AppointmentForm/> }
            {onEdit && <DragDropProvider allowDrag={allowDrag} />}

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
  // On charge les données de AuthContext dans le composant Demo
  Demo.contextType = AuthContext;