import React, { useState} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useAuthContext} from "../../utils/context";
import LinearProgress from '@material-ui/core/LinearProgress';
import InputEmail from '../../components/Formulaire/InputEmail';
import InputPassword from '../../components/Formulaire/InputPassword';

export default function Form(props) {
    return (
        <form onSubmit={ props.onSubmit } className="border-2 border-gray-300 rounded-md font-roboto font-medium text-8x1" >
            <h1 className="font-roboto font-medium text-2xl tracking-wide"> {props.title} </h1>
            { props.onLoading && <LinearProgress /> }

            <fieldset className="p-10">
            {props.children}
            </fieldset>
            
        </form>
    )
}