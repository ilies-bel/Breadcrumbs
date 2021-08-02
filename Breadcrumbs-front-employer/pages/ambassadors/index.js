import React, { useState, useEffect } from 'react';
import {AMBASSADORS_DESCRIPTION} from "../../constants/description"
import Head from 'next/head';
import Label from '../../components/Label';
import axios from 'axios';
import Form from 'components/Formulaire/Form';
import InputText from 'components/Formulaire/InputText';
import InputEmail from 'components/Formulaire/InputEmail';
import ButtonSubmit from 'components/Formulaire/ButtonSubmit';

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

axios.defaults.baseURL = process.env.BASE_API_URL;
const fetchData = async () => await
    axios.get('/facet.json')
        .then(res => ({
            error: false,
            facet: res.data.entries,
        }))
        .catch(() => ({
                error: true,
                facet: null,
            }),
        );

export default function Ambassadors({facet, error}) {
    function onSubmit() {
        const axios_url = process.env.NEXT_PUBLIC_AXIOS_URL+"/users/create";
        axios.post(axios_url, {});
    }
    function handleChange(event) {
        console.log(event.target.name)
        const target = event.target;
        target.type ==='email' && setEmail(event.target.value);
        target.type ==='password' && setPass(event.target.value)
    }
    return (
        <>
        <Head>
        <title>Ambassadors</title>
        </Head>

            <h2>Ambassadors</h2>
            <Label>{AMBASSADORS_DESCRIPTION}</Label>
            <br/>
            
            <Form title="Create a new ambassador">
            <Label>Ce Formulaire ne fonctionne pas</Label>
                <InputText required ariaLabel='first name' placeholder='first name' />
                <InputText ariaLabel='last name' placeholder='last name' />
                <InputEmail required ariaLabel='email address' placeholder='email address' />
                <InputText ariaLabel="phone number" placeholder='phone number' />
                
                <InputText ariaLabel='Job title' placeholder='Job title' />

                <ButtonSubmit />
            </Form>
        
        </>
    );
}
