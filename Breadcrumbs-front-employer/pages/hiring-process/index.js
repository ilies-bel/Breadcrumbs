import React, { useState, useEffect } from 'react';

import Calendar from '@/components/Calendar';
import axios from 'axios';
import { Switch, FormControlLabel } from '@material-ui/core';

import { useAuthContext } from 'utils/context';
import CircularProgress from '@material-ui/core/CircularProgress';


const style = {
    calendar: {
        resize: "both",
        borderStyle: "solid",
        borderColor: "royalblue",
        borderWidth: "2px",
    },
    form: {
        display: "inline-block"
    }
}

const URL_SOURCE = process.env.NEXT_PUBLIC_SOURCE_URL

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
    const [ loading, setLoading ] = useState(false)
    const [ toggling, setToggling ] = useState(false)

    const context = useAuthContext();


    const toggleChecked = async() => {
        await setToggling(true);
        setChecked((prev) => !prev);
        setText("Here you can edit your availabilities.");
        setToggling(false);
      }

      useEffect(() => {
          setLoading(true);
        fetchData(context.token).then((res) => {
            seterror(null)
            setRes(res)
            setLoading(false);
          }).catch((e) => {
              seterror(true);setLoading(false);
              throw "axios_url"})
      }, [toggling])


    const confirmChange = async(message="Change Saved !") => {
        setText(message);
        await setToggling(true);
        setChecked(false);
        setToggling(false);
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
                    title="Fonctionnalité non disponible"
                />
                <br/>
                {error && <strong>Please log in.</strong>}
                <div style={style.calendar}>
                { loading && <CircularProgress/> }
                {!error && !loading && resList && ( <Calendar onChange={confirmChange} resList={resList} onEdit={checked} loading={loading} /> )}
                </div>
            </div>            
        </>
    );
}