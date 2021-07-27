import React, { useState, useEffect } from 'react';

import Calendar from '@/components/Calendar';
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
        }

    }, [])
    return data;
}

axios.defaults.baseURL = process.env.BASE_API_URL;
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
    const [confirm, setText] = useState("Here you can edit your availabilities. Double click to add an availability");
    const toggleChecked = () => {
        setChecked((prev) => !prev);
        setText("Here you can edit your availabilities.");
      }

    const confirmChange = () => {
        setText("Change Saved !");
    }
    
    return (
        <>
            <h1>Hiring process</h1>
            <br/>

            <div>
            <div><strong>{confirm}</strong></div>
                <FormControlLabel
                    control={<Switch size="small" checked={checked} onChange={toggleChecked} />}
                    label={!checked ? 'Locked' : 'Editing'}
                />
                <br/>
                <FormControlLabel
                    control={<Switch size="small" checked={true} onChange={toggleChecked} />}
                    label={"Ask confirmation before deleting "}
                />
                {error && <div>There was an error.</div>}
                {!error && resList && (<div style={style.calendar}>  <Calendar onChange={confirmChange} resList={resList} onEdit={checked} /> </div>)}
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
