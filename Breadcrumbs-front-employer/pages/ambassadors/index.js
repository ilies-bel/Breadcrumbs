import React, { useState, useEffect } from 'react';
import {AMBASSADORS_DESCRIPTION} from "../../constants/description"
import Head from 'next/head';
import Label from '../../components/Label';
import axios from 'axios';

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

axios.defaults.baseURL = 'http://localhost:8080';
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
    return (
        <>
        <Head>
        <title>Ambassadors</title>
        </Head>

            <h2>Ambassadors</h2>
            <Label>{AMBASSADORS_DESCRIPTION}</Label>
        
        </>
    );
}
