import React, { useState, useEffect } from 'react';
import {AMBASSADORS_DESCRIPTION} from "../../constants/description"
import Head from 'next/head';
import Label from 'components/Label';
import axios from 'axios';
import Form from 'components/Formulaire/Form';
import InputText from 'components/Formulaire/InputText';
import InputEmail from 'components/Formulaire/InputEmail';
import ButtonSubmit from 'components/Formulaire/ButtonSubmit';
import { useAuthContext } from 'utils/context';

const useEventSource = (url) => {
    const [data, updateData] = useState(null);

    useEffect(() => {
        const source = new EventSource(url);
        source.onmessage = function logEvents(event) {      
            updateData(JSON.parse(event.data));     
        }
    }, [])

    return data;
}


export default function Ambassadors() {
    const [ emailValue, setEmail ] = useState("");
  const [ passValue, setPass ] = useState();
  const [firstName, setFirst ] = useState()
  const [lastName, setLast ] = useState()
  const [ loading, setLoading ] = useState(false);
  const [error, setError ] = useState(false);

  const context = useAuthContext();


    function onSubmit(e) {
        e.preventDefault();
        const axios_url = process.env.NEXT_PUBLIC_AXIOS_URL+"/users/create";
        setLoading(true);
        axios.post(axios_url, {
            first_name: firstName,
            last_name: lastName,
            email: emailValue,
            role: "Ambassador",
            Entreprise: {
                raisonSocial: "Breadcrumbs"
            }
        },
        {
            headers: {
                Authorization: `Bearer ${context.token}` }
        })
        .then(res => {
            setLoading(false);
            console.log(res.data)})
        .catch(e => {
            setLoading(false);
            console.error(e)
            setError(e)
        })
    }
    function onSubmit2(e) {
        e.preventDefault();
        const axios_url = process.env.NEXT_PUBLIC_AXIOS_URL+"/users/create";
        axios.post(axios_url).then(res => console.log(res)).catch(e=> console.error(e))
    }
    function handleChange(event) {
        const target = event.target;
        const ariaLabel = target.ariaLabel;
        ariaLabel ==='email address' && setEmail(target.value);
        ariaLabel ==='first name' && setFirst(target.value);
        ariaLabel ==='last name' && setLast(target.value)
        ariaLabel ==='phone number' && setEmail(target.value);
    }
    return (
        <>
        <Head>
        <title>Ambassadors</title>
        </Head>

            <h2>Ambassadors</h2>
            <Label>{AMBASSADORS_DESCRIPTION}</Label>
            <br/>
            
            <Form onSubmit={onSubmit2} onLoading={loading} title="Create a new ambassador">
            <Label>Ce Formulaire ne fonctionne pas</Label>

            { error && error?.status }
                <InputText ariaLabel='first name' name="dkkd" placeholder='first name' onChange={ handleChange } />
                <InputText ariaLabel='last name' placeholder='last name' onChange={ handleChange } />
                <InputEmail  ariaLabel='email address' placeholder='email address' onChange={ handleChange } />
                <InputText ariaLabel="phone number" placeholder='phone number' onChange={ handleChange } />
                
                <InputText ariaLabel='Job title' placeholder='Job title' onChange={ handleChange } />
                <br/>
                <Label>Profile picture</Label>
                <InputText ariaLabel='Profile Picture' type='file' placeholder="Profile Picture" onChange={ handleChange } accept="image/png, image/jpeg" />

                <ButtonSubmit />
            </Form>
        
        </>
    );
}
