import {NextApiRequest, NextApiResponse} from "next";

const recurrenceAppointments = [{
    title: 'Phone call with Peter Smith',
    startDate: new Date(1622185391853),
    endDate: new Date(1624870991853),
    id: 100,
    rRule: 'FREQ=DAILY;COUNT=3',
    type: 'Availability',
  }, {
    title: 'Technical test with',
    startDate: new Date(2021, 5, 25, 12, 11),
    endDate: new Date(2021, 5, 25, 13, 0),
    id: 101,
    rRule: 'FREQ=DAILY;COUNT=4',
    exDate: '20210627T091100Z',
    allDay: true,
    type: 'Availability',
  }, {
    title: 'Teams Meeting',
    startDate: new Date(2021, 5, 25, 13, 30),
    endDate: new Date(2021, 5, 25, 14, 35),
    id: 102,
    rRule: 'FREQ=DAILY;COUNT=5',
    type: 'Availability',
    interlocutor_email: 'collaborator@breadcrumbs.com'
  }, {
    title: 'Interview Room 2',
    startDate: new Date(2021, 5, 26, 10, 0),
    endDate: new Date(2021, 5, 26, 11, 0),
    id: 3,
    location: 'Room 2',
    type: 'Availability',
    interlocutor_email: 'collaborator@breadcrumbs.com'
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 27, 11, 45),
    endDate: new Date(2021, 5, 27, 13, 20),
    id: 4,
    location: 'Room 2',
    type: 'Availability',
    interlocutor_email: 'collaborator@breadcrumbs.com'
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 26, 14, 40),
    endDate: new Date(2021, 5, 26, 15, 45),
    id: 5,
    location: 'Room 2',
    type: 'Availability',
    interlocutor_email: 'sengoku.le.bouddha@navy.gov'
  }, {
    title: 'Telegram call',
    startDate: new Date(2021, 5, 28, 9, 45),
    endDate: new Date(2021, 5, 28, 11, 15),
    id: 6,
    location: 'Room 1',
    type: 'Appointment',
    interlocutor_email: 'sengoku.le.bouddha@navy.gov'
  }, {
    title: 'Escargophone call',
    startDate: new Date(2021, 5, 29, 11, 45),
    endDate: new Date(2021, 5, 29, 13, 5),
    id: 7,
    location: 'Room 3',
    type: 'Appointment',
    interlocutor_email: 'rob_lucci@cp9.gov'
  }];

  
export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(recurrenceAppointments)
  }