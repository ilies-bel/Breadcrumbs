import axios from 'axios';
import useAxios from 'axios-hooks'
import {useAuthContext} from "./context";

const axios_url = process.env.NEXT_PUBLIC_AXIOS_URL;

const apiInstance = axios.create({
    baseURL: axios_url
})
export const useSecureAPI = ({path='', data={}, method='post', header={}, manual=false}) => {
    const context = useAuthContext();
    const storedToken = context.token;
    header.Authorization = `Bearer ${storedToken}`;
    return useAxios({
        baseURL: axios_url,
        url: path,
        headers: header,
        method: method
    }, { manual: manual})
}

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

  export const getMilestoneOfUser = async(user, token) => {
      return await apiInstance.post('/milestone/ofUser', user, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-type': 'application/json;charset=UTF-8'
          }
      })
  }

  export const useIncrementProcess = (user) => {
      return useSecureAPI({path: '/milestone/increment', data: user, manual: true})
}