const recurrenceAppointments = [{
    title: 'Phone call with Peter Smith',
    startDate: new Date(2021, 5, 25, 9, 15),
    endDate: new Date(2021, 5, 25, 11, 30),
    id: 100,
    rRule: 'FREQ=DAILY;COUNT=3',
    exDate: '20210628T063500Z,20210626T061500Z',
  }, {
    title: 'Technical test with',
    startDate: new Date(2021, 5, 25, 12, 11),
    endDate: new Date(2021, 5, 25, 13, 0),
    id: 101,
    rRule: 'FREQ=DAILY;COUNT=4',
    exDate: '20210627T091100Z',
    allDay: true,
  }, {
    title: 'Teams Meeting',
    startDate: new Date(2021, 5, 25, 13, 30),
    endDate: new Date(2021, 5, 25, 14, 35),
    id: 102,
    rRule: 'FREQ=DAILY;COUNT=5',
  }, {
    title: 'Interview with Jane Cooper',
    startDate: new Date(2021, 5, 26, 10, 0),
    endDate: new Date(2021, 5, 26, 11, 0),
    id: 3,
    location: 'Room 2',
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 27, 11, 45),
    endDate: new Date(2021, 5, 27, 13, 20),
    id: 4,
    location: 'Room 2',
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 26, 14, 40),
    endDate: new Date(2021, 5, 26, 15, 45),
    id: 5,
    location: 'Room 2',
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 28, 9, 45),
    endDate: new Date(2021, 5, 28, 11, 15),
    id: 6,
    location: 'Room 1',
  }, {
    title: 'Phone call',
    startDate: new Date(2021, 5, 29, 11, 45),
    endDate: new Date(2021, 5, 29, 13, 5),
    id: 7,
    location: 'Room 3',
  }];

  
export default (req: any, res) => {
    res.status(200).json(recurrenceAppointments)
  }