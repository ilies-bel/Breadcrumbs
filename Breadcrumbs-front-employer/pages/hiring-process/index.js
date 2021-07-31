import React, { useState, useEffect } from 'react';

import Calendar from '@/components/Calendar';
import axios from 'axios';
import { Switch, FormControlLabel } from '@material-ui/core';
import {AMBASSADORS_DESCRIPTION} from "../../constants/description"
import { useSession } from 'next-auth/client';
import { useAuthContext } from '../../utils/context';


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

const URL_SOURCE = process.env.NEXT_PUBLIC_SOURCE_URL


const useEventSource = (url) => {
    let [data, updateData] = useState([]);

    useEffect(() => {
        let source = new EventSource(url);
        
        source.onerror = function logError(e) {    
            updateData("e - eeerero")
        }
        source.onmessage = function logEvents(event) {      
            updateData(JSON.parse(event.data));
            console.log(event);
        }
        return () => {
            source.close();
        }

    }, [])
    return data;
}

const fetchData = async (token) => { 
    const axios_url = process.env.NEXT_PUBLIC_AXIOS_URL
    return await axios.get(`${axios_url}/availability/andAppointments`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    .then(res =>{ 
        return res.data})
    .catch(e => { throw axios_url })
}



export default function Hiring() {
    const [checked, setChecked] = useState(false);
    const [currentDate, setCurrentDate] = useState(null);
    const [confirm, setText] = useState("Here you can edit your availabilities. Double click to add an availability");
    const [ resList, setRes ] = useState();
    const [ error, seterror ] = useState(null);

    const context = useAuthContext();

    const toggleChecked = () => {
        setChecked((prev) => !prev);
        setText("Here you can edit your availabilities.");
      }

      useEffect(() => {
        fetchData(context.token).then((res) => {
            seterror(null)
            setRes(res)
          }).catch((e) => {
              seterror(true)
              throw "axios_url"})
      }, [])


    const confirmChange = () => {
        setText("Change Saved !");
        setChecked(false);
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