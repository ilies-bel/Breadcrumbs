import React, {Component, useRef, useState} from "react";
import * as ROUTES from "constants/routes";
import {useForm} from "react-hook-form";
import axios from 'axios';
import {useHistory} from "react-router-dom";


const BASE_API_URL = process.env.AXIOS_BASE_URL

const SignInForm = () => {
    const {register, handleSubmit, setError, errors,clearErrors } = useForm();
    const invite_token = window.localStorage.getItem("invite_token") || ''
    const history = useHistory();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const url = `${BASE_API_URL}/candidates`;

        axios.post(url, {
                "token": data.token,
                "user_attributes": {
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "email": data.email,
                    "password": data.password }})
            .then((response) => {

                console.log("response " , response);
                if (response.statusText === "Created") {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log("login successfully");
                    history.push(ROUTES.SIGN_IN);

                } else if (response.data.code === 4000 ) {
                    console.log("Invitation token error");

                    setError("all", {
                        type: "server",
                        message: "Invitation code error"
                    });

                } else {
                    console.log("unknown error"); // TODO envoyer l'erreur au serveur
                    setError("all", {
                        type: "server",
                        message: "unknown error"
                    });
                }

            })
            .catch((e) => {
                console.log(e)

                const errors = e.response.data;
                console.log(errors)
                Object.keys(errors).forEach((field) => {
                    const messages = errors[field];

                    setError("all" , {
                        type: "server",
                        message: messages
                    });
                });
            });


    });

    return (
        <div className="RegisterOrLogIn">
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        name="token"
                        id="token"
                        ref={register}
                        defaultValue={invite_token}
                        type="text"
                        placeholder="Invitation code"
                    />
                </div>

                <div>
                    <input
                        autoFocus={true}
                        name="first_name"
                        id="first_name"
                        ref={register({required: true})}
                        type="text"
                        aria-label="firstname"
                        autoComplete="given-name"
                        placeholder="First name"
                    />
                    <div>{errors.first_name && errors.first_name.message}</div>
                </div>

                <div>
                    <input
                        name="last_name"
                        id="last_name"
                        ref={register}
                        type="text"
                        aria-label="lastname"
                        autoComplete="family-name"
                        placeholder="Last name"
                    />
                    <div>{errors.last_name && errors.last_name.message}</div>
                </div>


                <div>

                    <input type="email"
                           name="email"
                           id="email"
                           ref={register({required: true})}
                           placeholder="Your email"
                           aria-label="email"
                           autoComplete="email"

                    />

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
                           placeholder="Your password"
                           aria-label="password"
                           autoComplete="new-password"
                    />
                    <div>{errors.password && errors.password.message}</div>
                </div>



                <div>{errors.all && errors.all.message}</div>
                <button onClick={() => clearErrors()} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignInForm;