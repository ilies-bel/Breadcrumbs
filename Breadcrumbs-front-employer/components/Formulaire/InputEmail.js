import React, { useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useAuthContext} from "../../utils/context";
import LinearProgress from '@material-ui/core/LinearProgress';



import InputText from './InputText';

export default function InputEmail(props) {
    const [ emailValue, setEmail ] = useState("");

  function handleChange(event) {
      setEmail(event.target.value);
      console.log(emailValue)
  }
    return (
        <InputText type='email' placeholder="email address" ariaLabel="email address"  onChange={ props?.onChange } />
    )
}