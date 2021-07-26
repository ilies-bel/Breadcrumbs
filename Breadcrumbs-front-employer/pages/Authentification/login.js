import React, { useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useAuthContext} from "./context.tsx";

export default function LoginPage() {
  const [ emailValue, setEmail ] = useState("");
  const [ passValue, setPass ] = useState();
  const auth_url = process.env.NEXT_PUBLIC_AUTH_URL;
  const context = useAuthContext();

  function handleChange(event) {
      const target = event.target;
      target.type ==='text' && setEmail(event.target.value);
      target.type ==='password' && setPass(event.target.value)
  }
  function handleSubmit(event) {
      event.preventDefault();
      axios.post(auth_url, {email: emailValue, password: passValue})
          .then(res => {
              if(res.data.status ==='Success') {
                  const token = res.data.token;
                  console.log(res.data)
                  const payload = jwt_decode(token);
                  console.log(payload)

                  //Validation du token. TODO : Rajouter d'autres conditions de vérification
                  if(payload.iss === 'breadcrumbs') {
                      context.setUserData({token: token, user: payload.name});
                      window.localStorage.setItem("token", token);
                      console.log(context)
                  }
                  else {
                      throw "Invalid token"
                      }
              }
              else {
                  throw "Invalid credentials.";
              }
          })
          .catch(e => console.error(e));
  }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='email adress' aria-label='email' value={emailValue} onChange={handleChange} />
                <input type='password' placeholder='password' aria-label='password' onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
            )
}

export const getServerSideProps = async (context) => {
    return {
        props: {
        },
    };
}
