import React, { useState, useEffect } from "react";
import {FlashyButton, PageDescription} from "Navigation";
import {useHistory, Link} from "react-router-dom";
import {useAuthContext} from "components/AuthentificationJwt/context";
import {useForm} from "react-hook-form";
import axios from "axios";
import { verify } from "jsonwebtoken";
import LinearProgress from '@material-ui/core/LinearProgress';

import LPopup from './AuthLinkedin';

const BASE_API_URL = process.env.AXIOS_BASE_URL
const jwtValidation = async(token) => {
    let payload;

    // On récupère la clé public depuis le serveur
    const publicKeyInstance  = axios.create({baseURL: BASE_API_URL, url:"/key/public", method: "get"});

    // Vérification du token à partir de la clé publique
    return publicKeyInstance.get("/key/public").then(res => verify(token, res.data, (err, decoded) =>{
        return decoded
     } ) )
        .catch((e) => {
            console.error("Public Key not loaded")
            console.error(e);
        });
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
                    jwtValidation(res.token).then((payload) => {
                        // payload = null si le token n'a pas été validé
                        if(payload) {
                            console.log(payload);console.log("/payload");

                            localStorage.setItem("user", res.user.first_name);
                            localStorage.setItem("last_name", res.user?.last_name);
                            localStorage.setItem("token", res.token);

                            context.dispatchUserData({ type: 'fill-user-data', 
                                                        payload: {
                                                            token: res.token,
                                                            first_name: res.user.first_name,
                                                            last_name: res.user.last_name
                                                        }
                                                    })
                        }
                        else {
                            throw "Your connection is maybe corrupted"
                        }
                    })
                    

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
            .then(() => {console.log(context.token);console.log("/context.token");})
            .then(() => console.log("toujours dans router"))
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
        <>
        <img src="/Logo.svg" />

        
            
        <div className="RegisterOrLogIn loginForm">
        <h2>Use your mail account</h2>
            { loading && <LinearProgress /> }
            <form onSubmit={onSubmit}>
                <div className='inputForm'>
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
                <div className='inputForm'>
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
                    <div className='inputForm'>{errors.password && errors.password.message}</div>
                </div>
                <div className='inputForm'>{errors.all && errors.all.message}</div>
                <FlashyButton onClick={() => clearErrors()} type="submit">Submit</FlashyButton>
            </form>
        </div>
        <span className='line'>
            <hr className='or'/>
            <span>Or</span>
            <hr className='or'></hr>
            </span>
        <LPopup />

        </>
    );
};

export default Login;
