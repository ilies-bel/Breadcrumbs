import useAxios from 'axios-hooks'
import axios from 'axios';

const BASE_API_URL = process.env.AXIOS_BASE_URL
const AVAILABILITY = process.env.AVAILABILITY_API;
const tips = process.env.TIPS_API
const AMBASSADOR = process.env.AMBASSADOR_API;
const PROCESS = process.env.PROCESS_API
const MILESTONE = process.env.PROCESS_MILESTONE_API
const APPOINTMENT = process.env.APPOINTMENT_API
const MY_APPOINTMENT = process.env.MY_APPOINTMENT
const INTERVIEW_TYPE = process.env.INTERVIEW_TYPE;
const CANDIDATE_API_URL = process.env.CANDIDATE_API_URL

const TOKEN_KEY = process.env.TOKEN_LOCAL_STORAGE_KEY;
const storedToken = window.localStorage.getItem(TOKEN_KEY)

export const useAPI = (path='', header={}, manual=false) => {
    return useAxios({
        baseURL: BASE_API_URL,
        url: path,
        headers: header
    })
}
export const useSecureAPI = ({path='', header={}, manual=false}) => {
    header.Authorization = `Bearer ${storedToken}`;
    return useAxios({
        baseURL: BASE_API_URL,
        url: path,
        headers: header
    })
}
export const axiosSecure = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Authorization: `Bearer ${storedToken}`
    }
})

export const useGetAccount = () => {
    return useAPI(CANDIDATE_API_URL);
}

export const useGetDisponibilities = () => {
    return useAPI(AVAILABILITY, {}, true)
}
export const useGetTips = () => {
    return useAPI(tips);
}
export const useGetAmbassador = () => {
    return useAPI(AMBASSADOR);
}
export const useGetProcess = () => {
    return useAPI(MILESTONE);
}
export const useGetMilestone = () => {
    return useAPI(MILESTONE);
}
export const useInterviewType = (id='') => {
    return useAPI(`${INTERVIEW_TYPE}/${id}`)
}


//TODO: Fonctions à compléter en fonctions de l'API mis en place
export const useAppointmentAPI = ({path='', token='', data={}, method='get', manual=false}) => {
    return useAxios({
        baseURL: `${BASE_API_URL}`,
        method: method,
        url: `${APPOINTMENT}/${path}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, {manual: manual});
}

export const useCreateAppointment = (data={}, token) => {
    return useAppointmentAPI({path: 'add', token: token, data: data, method: 'post', manual: true})
}
export const useGetMyAppointment = (token) => {
    return useAppointmentAPI({path: MY_APPOINTMENT, token: token, manual: true});
}
export const useMoveAppointment = (id, data={}) => {
    return useAppointmentAPI(`/${id}`, data, 'put')
}
export const useCancelAppointment = (token, data) => {
    return useAppointmentAPI({path: `cancel`, token: token, data: data, method: 'delete', manual: true})
}