import useAxios from 'axios-hooks'
import axios from 'axios';

const BASE_API_URL = process.env.AXIOS_BASE_URL
const AVAILABILITY = process.env.AVAILABILITY_API;
const tips = process.env.TIPS_API
const AMBASSADOR = process.env.AMBASSADOR_API;
const PROCESS = process.env.PROCESS_API
const MILESTONE = process.env.PROCESS_MILESTONE_API
const APPOINTMENT = process.env.APPOINTMENT_API
const INTERVIEW_TYPE = process.env.INTERVIEW_TYPE;
const CANDIDATE_API_URL = process.env.CANDIDATE_API_URL

const TOKEN_KEY = process.env.TOKEN_LOCAL_STORAGE_KEY;
const storedToken = window.localStorage.getItem(TOKEN_KEY)

export const useAPI = (path='', header={}) => {
    return useAxios({
        baseURL: BASE_API_URL,
        url: path,
        headers: header
    })
}
export const useSecureAPI = (path='', header={}) => {
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
    return useAPI(AVAILABILITY)
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
export const useAppointmentAPI = (path='', token='', data={}, method='get', manual=false) => {
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
    return useAppointmentAPI('add', token,data, 'post', true)
}
export const useEditAppointment = (id, data={}) => {
    return useAppointmentAPI(`/${id}`, data, 'put')
}
export const useMoveAppointment = (id, data={}) => {
    return useAppointmentAPI(`/${id}`, data, 'put')
}
export const useCancelAppointment = (id, data={}) => {
    return useAppointmentAPI(`/${id}`, data, 'delete')
}