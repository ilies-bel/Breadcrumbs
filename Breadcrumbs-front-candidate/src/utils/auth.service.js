import axios from 'axios';

const BASE_API_URL = process.env.AXIOS_BASE_URL


export const register = (first_name, last_name, email, password, token) => {
    return axios.post(`${BASE_API_URL}/candidates?token=${token}`,
        {
            "user_attributes": {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            }
        })
}


const login = (email, password) => {
    return axios
        .post(`${BASE_API_URL}/users/login`, {"user": {"email": email, "password": password}})
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};