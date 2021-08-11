import React, {useEffect, useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useAuthContext} from "../../utils/context";
import LinearProgress from '@material-ui/core/LinearProgress';
import InputEmail from 'components/Formulaire/InputEmail';
import InputPassword from 'components/Formulaire/InputPassword';
import Form from 'components/Formulaire/Form';

export default function LoginPage() {
  const [ emailValue, setEmail ] = useState("");
  const [ passValue, setPass ] = useState();
  const [ loading, setLoading ] = useState(false);

  const auth_url = process.env.NEXT_PUBLIC_AUTH_URL;
  const context = useAuthContext();

  useEffect(() => {
      return () => {}
  }, [])
  function handleChange(event) {
      const target = event.target;
      target.type ==='email' && setEmail(event.target.value);
      target.type ==='password' && setPass(event.target.value)
  }
  async function handleSubmit(event) {
      event.preventDefault();
      setLoading(true);
      await axios.post(auth_url, {email: emailValue, password: passValue})
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
                  }
                  else {
                      throw "Invalid token"
                      }
              }
              else {
                  throw "Invalid credentials.";
              }
          })
          .then(() => setLoading(false))
          .catch(e => {
              console.error(e)
              setLoading(false)
            }).then(() => console.log("Connexion réussi"));
  }
    return (
        <div>
            <Form onSubmit={handleSubmit} onLoading={loading} >
                <InputEmail onChange={handleChange} />
                <InputPassword onChange={handleChange} />
                <button type="submit" className="block rounded-md shadow text-white bg-royalblue p-2 mt-10 w-1/2" >Submit</button>
            </Form>
        </div>
            )
}

