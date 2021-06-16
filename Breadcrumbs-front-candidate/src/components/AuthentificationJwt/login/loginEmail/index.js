import React, {useState} from "react";
import {FlashyButton, PageDescription} from "Navigation";
import {useHistory, Link} from "react-router-dom";
import {useAuthContext} from "components/AuthentificationJwt/context";
import {useForm} from "react-hook-form";
import axios from "axios";


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

const Login = () => {
    const {register, handleSubmit, setError, errors, clearErrors} = useForm();

    const onSubmit = handleSubmit((data) => {

        console.log(data);
        const url = `${BASE_API_URL}/users/login`;
        console.log(url);

        axios
            .post(url, {"user": {"email": data.email, "password": data.password}})
            .then((response) => {
                const res = response.data;
                console.log(res);
                // handle server responses
                if (res.json.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log("login successfully");

                    localStorage.setItem("token", res.json.token);
                    localStorage.setItem("user", res.json.user.first_name);
                    //context.setData(res.token, res.json.user.first_name + ' ' + res.json.user?.last_name)

                } else if (res.status === "unprocessable_entity") {
                    console.log("mail or password invalid");

                    setError("all", {
                        type: "server",
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
            .catch((e) => {
                console.log(e);

                setError("all", {
                    type: "server",
                    message: "unable to reach the server"
                });
            })


    });

    return (
        <div className="RegisterOrLogIn">
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