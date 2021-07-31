import {NextApiRequest, NextApiResponse} from "next";

const recurrenceAppointments = [{
    title: 'Phone call with Peter Smith',
    startDate: new Date(1622185391853).toISOString(),
    endDate: new Date(1624870991853).toISOString(),
    id: 100,
    rRule: 'FREQ=DAILY;COUNT=3',
    type: 'Availability',
  }, {
    title: 'Technical test with',
    startDate: new Date(2021, 5, 25, 12, 11).toISOString(),
    endDate: new Date(2021, 5, 25, 13, 0).toISOString(),
    id: 101,
    rRule: 'FREQ=DAILY;COUNT=4',
    exDate: '20210627T091100Z',
    allDay: true,
    type: 'Availability',
  }, {
    title: 'Teams Meeting',
    startDate: new Date(2021, 5, 25, 13, 30).toISOString(),
    endDate: new Date(2021, 5, 25, 14, 35).toISOString(),
    id: 102,
    rRule: 'FREQ=DAILY;COUNT=5',
    type: 'Availability',
    interlocutor_email: 'collaborator@breadcrumbs.com'
  }, {
    title: 'Interview Room 2',
    startDate: new Date(2021, 5, 26, 10, 0).toISOString(),
    endDate: new Date(2021, 5, 26, 11, 0).toISOString(),
    id: 3,
    location: 'Room 2',
    type: 'Availability',
    interlocutor_email: 'collaborator@breadcrumbs.com'
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 27, 11, 45).toISOString(),
    endDate: new Date(2021, 5, 27, 13, 20).toISOString(),
    id: 4,
    location: 'Room 2',
    type: 'Availability',
    interlocutor_email: 'collaborator@breadcrumbs.com'
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 26, 14, 40).toISOString(),
    endDate: new Date(2021, 5, 26, 15, 45).toISOString(),
    id: 5,
    location: 'Room 2',
    type: 'Availability',
    interlocutor_email: 'sengoku.le.bouddha@navy.gov'
  }, {
    title: 'Telegram call',
    startDate: new Date(2021, 5, 28, 9, 45).toISOString(),
    endDate: new Date(2021, 5, 28, 11, 15).toISOString(),
    id: 6,
    location: 'Room 1',
    type: 'Appointment',
    interlocutor_email: 'sengoku.le.bouddha@navy.gov'
  }, {
    title: 'Escargophone call',
    startDate: new Date(2021, 5, 29, 11, 45).toISOString(),
    endDate: new Date(2021, 5, 29, 13, 5).toISOString(),
    id: 7,
    location: 'Room 3',
    type: 'Appointment',
    interlocutor_email: 'rob_lucci@cp9.gov'
  }];

  
export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(recurrenceAppointments)
  }