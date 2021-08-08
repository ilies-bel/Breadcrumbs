import axios from 'axios';

//Requête à effectuer à chaque changement dans le calendrier
export const fetchCalendarData = async (changedData, url, token="", onChange=() => {}) => {

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


  export const cancelAppointment = async (appointmentData, url, token="") => {

    return await axios.delete(url, {
        data: appointmentData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch(e => {
          console.error(e);
        }
    )
  };

  export const endAppointment = async (appointmentData, url, token="") => {

    return await axios.delete(url, {
        data: appointmentData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch(e => {
          console.error(e);
        }
    )
  };