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
  ViewSwitcher,
  MonthView,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';

import {AuthContext, useAuthContext} from "utils/context";
import { calendarData } from "utils/calendarData"
import { fetchCalendarData } from 'utils/axios';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Tooltip from '@material-ui/core/Tooltip';
import { cancelAppointment, endAppointment } from '../utils/axios';

const axiosURL = process.env.NEXT_PUBLIC_AXIOS_URL;
const updateURL = `${axiosURL}/availability/update`
const cancelURL = axiosURL + '/appointment/cancel'
const endURL = axiosURL + '/appointment/end'



  const AppointHeader = (props) => {
    const context = useAuthContext();

    return (
    <AppointmentTooltip.Header {...props} >
      { props?.appointmentData.type==='Appointment' &&
      <Tooltip title='Appointment over ?'>
        <IconButton onClick={() =>{
          endAppointment(props.appointmentData, endURL, context.token).then(() => props.onChange("Appointment Over !"))
          }}
          children={ <AssignmentTurnedInIcon/> }
          />
      </Tooltip>
        }
      { props?.appointmentData.type==='Appointment' &&
      <Tooltip title='Cancel appointment'>
        <IconButton onClick={() =>{
          cancelAppointment(props.appointmentData, cancelURL, context.token).then(() => props.onChange("Appointment Cancelled !"))
          }}
          children={ <CancelPresentationIcon /> }
          />
        </Tooltip>
        }
    </AppointmentTooltip.Header>)
  }


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
        currentDate: this.props.resList[0].startDate,
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

      //Les données du calendrier sont mis à jour en base de donnée à chaque fois que l'on charge ce calendrier
      //fetchCalendarData(this.props.resList, updateURL, this.context?.token ?? "");
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
      if(this.props.loading) return <CircularProgress/>
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
                startDayHour={8}
                endDayHour={19}
                timeTableCellComponent={TimeTableCell}
            />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
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
                    onClick={() => fetchCalendarData(data, updateURL, this.context.token ).then(() => this.props.onChange()) } >
                      Save changes
            </button>
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              showDeleteButton={onEdit}
              showOpenButton={onEdit}
              onChange={() => this.props.onChange()}
              headerComponent={ (props) => <AppointHeader { ...props} onChange={this.props.onChange} /> }
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