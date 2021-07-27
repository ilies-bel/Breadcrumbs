import React, {useState} from "react";
import {FlashyButton, PageDescription} from "Navigation";
import {useHistory, Link} from "react-router-dom";
import {useAuthContext} from "components/AuthentificationJwt/context";
import {useForm} from "react-hook-form";
import axios from "axios";
import { decode } from "jsonwebtoken";
import LinearProgress from '@material-ui/core/LinearProgress';

import * as ROUTES from 'constants/routes';

const LoginEmailPage = () => {
    const history = useHistory();

    const [email, setEmail] = useState(null);
    const [password, setPass] = useState(null);

    const [formData, setData] = useState({});
    const [error, setError] = useState(false)
    const context = useAuthContext();
    let storage = window.localStorage;
    console.log(storage);

    async function sendLogin(e) {
        e.preventDefault();
        await login(email, password).catch(e => setError(e))
            .then(res => {
                if (!res.token) {
                    setError(res?.errors);
                } else {
                    res && storage.setItem("token", res.token);
                    res && storage.setItem("user", res.user.first_name);
                    res && context.setData(res.token, res.user.first_name)
                    res && history.push("/auth/confirm");
                }
            });
    }

    return (
        <div>
            <Link to="/auth/welcome"> You don't have an account ? Let's Create one. &rarr;</Link>
            <PageDescription>You must be connected to use this application</PageDescription>

            <form onSubmit={(e) => sendLogin(e)}>

                <input autoFocus={true} autoComplete="email" type="email" placeholder="your Email"
                       aria-label="firstname"
                       onChange={(event) => {
                           setEmail(event.target.value);
                       }}/><br/>
                <input type="password" placeholder="choose your password" aria-label="password"
                       onChange={(event) => {
                           setPass(event.target.value);
                       }}/><br/>
                <FlashyButton type='submit'> LOGIN </FlashyButton>
            </form>

            {error && <div>Connection failed </div>}
        </div>
    )
}

const BASE_API_URL = process.env.AXIOS_BASE_URL
const jwtValidation = async(token) => {
    let payload;

    const publicKeyInstance  = axios.create({baseURL: BASE_API_URL, url:"/key/public", method: "get"});
    publicKeyInstance.get("/key/public").then(res => payload = decode(token, res.data) )
        .catch((e) => {
            console.error("Public Key not loaded")
            console.error(e);
        });

    return payload;
}
const Login = () => {
    const {register, handleSubmit, setError, errors, clearErrors} = useForm();
    const context = useAuthContext();
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    const onSubmit = handleSubmit((data) => {
        setLoading(true);
        const authInstance  = axios.create({baseURL: BASE_API_URL, method: "post"});

        authInstance({
            url: "/auth/login",
            data: {"email": data.email, "password": data.password}
        })
            .then((response) => {
                const res = response.data;

                // handle server responses
                if (res.status==="Success") {
                    const payload = jwtValidation(res.token);

                    localStorage.setItem("user", JSON.stringify(res));
         
                    if(payload) {
                        console.log("login successfully");
                        //TODO: Pour des raisons de sécurité, le token ne doit pas être dans les localStorage mais dans un cookie HttpOnly
                        localStorage.setItem("user", res.user.first_name);
                        localStorage.setItem("last_name", res.user?.last_name);
                        localStorage.setItem("token", res.token);
                        context.setUserData(res.token, res.user?.first_name, res.user?.last_name);
                    }

                } else if (res.status === "Connection_Failure_Wrong_Password") {
                    console.log("mail or password invalid");
                    console.log(payload);

                    setError("all", {
                        type: "invalid",
                        message: "mail or password invalid"
                    });

                } else {
                    console.log("unknown error"); // TODO envoyer l'erreur au serveur
                    setError("all", {
                        type: "server",
                        message: "unknown error"
                    });
                }

            })
            .then(() => setLoading(false))
            .then(() => history.replace(ROUTES.HIRING_PROCESS))
            .catch((e) => {
                console.log(e);
                setLoading(false)
                setError("all", {
                    type: "server",
                    message: "unable to reach the server"
                });
            })
    });

    return (
        <div className="RegisterOrLogIn">
            { loading && <LinearProgress /> }
            <form onSubmit={onSubmit}>
                <div>
                    <input type="email"
                           id="email"
                           name="email"
                           ref={register({required: true})}
                           autoFocus={true}
                           autoComplete="email"
                           placeholder="Your email"
                           aria-label="email"/>
                    <div>{errors.email && errors.email.message}</div>
                </div>
                <div>
                    <input type="password"
                           id="password"
                           name="password"
                           ref={register({
                               required: true,
                               minLength: {value: 6, message: 'Password must be at least 6 characters long'},
                           })}
                           autoComplete="password"
                           placeholder="Your password"
                           aria-label="password"/>
                    <div>{errors.password && errors.password.message}</div>
                </div>
                <div>{errors.all && errors.all.message}</div>
                <button onClick={() => clearErrors()} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
