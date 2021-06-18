import React, { useState, useEffect } from 'react';
import Label from '../../components/Label';
import Calendar from '../../components/Calendar';
import axios from 'axios';
import { Switch, FormControlLabel } from '@material-ui/core';
import {AMBASSADORS_DESCRIPTION} from "../../constants/description"
import { useSession } from 'next-auth/client';


const style = {
    calendar: {
        width: "800px",
        height: "1000px",
        resize: "both",
    },
    form: {
        display: "inline-block"
    }
}

const useEventSource = (url) => {
    let [data, updateData] = useState([]);

    useEffect(() => {
        let source = new EventSource(url);
        
        source.onerror = function logError(e) {    
            updateData("e - eeerero")
        }
        source.onmessage = function logEvents(event) {      
            updateData(JSON.parse(event.data));     
        }
        return () => {
            source.close();
            //console.log('event closed')
        }

    }, [])
//console.log(data)
    return data;
}

axios.defaults.baseURL = 'http://localhost:3000';
const fetchData = async () => await
    axios.get('/api/recurrence')
        .then(res => ({
            error: false,
            resList: res.data,
        }))
        .catch(() => ({
                error: true,
                resList: null,
            }),
        );


export default function Hiring({resList, error}) {
    const [checked, setChecked] = useState(false);
    const [currentDate, setCurrentDate] = useState(null);
    const [session, loading] = useSession();
    const toggleChecked = () => {
        setChecked((prev) => !prev);
      };
    
    if(!session) return (<strong>You must be signed in to view this page</strong>)
    if(loading) return (<strong>Loading ...</strong>)
    
    if(session) return (
        <>
            <h2>Hiring process</h2>
            <br/>

            <div>
                <FormControlLabel
                    control={<Switch size="small" checked={checked} onChange={toggleChecked} />}
                    label={!checked ? 'Locked' : 'Editing'}
                />
                {error && <div>There was an error.</div>}
                {!error && resList && (<div style={style.calendar}>  <Calendar resList={resList} /> </div>)}
            </div>

            
        </>
    );
}


export const getServerSideProps = async () => {
    const data = await fetchData();
    return {
        props: data,
    };
}
