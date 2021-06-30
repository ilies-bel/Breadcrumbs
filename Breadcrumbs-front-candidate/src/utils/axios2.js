import useAxios from 'axios-hooks'

const BASE_API_URL = process.env.AXIOS_BASE_URL2
const AVAILABILITY = process.env.AVAILABILITY_API;
const tips = process.env.TIPS_API
const AMBASSADOR = process.env.AMBASSADOR_API;
const PROCESS = process.env.PROCESS_API
const APPOINTMENT = process.env.APPOINTMENT_API
const INTERVIEW_TYPE = process.env.INTERVIEW_TYPE;
const CANDIDATE_API_URL = process.env.CANDIDATE_API_URL


export const useAPI = (path='') => {
    return useAxios({
        baseURL: BASE_API_URL,
        url: path
    })
}

export const useGetTips2 = () => {
    return useAPI(tips);
}