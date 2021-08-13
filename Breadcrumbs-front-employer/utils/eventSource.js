import React, { useState, useEffect } from 'react';

const URL_SOURCE = process.env.NEXT_PUBLIC_THEME_SOURCE

export const useThemeEvent = (url_source) => {

    let [data, updateData] = useState([]);
    const [ error, setError ] = useState();
    let countError  =0;
    
    useEffect(() => {
        let source = new EventSource(URL_SOURCE);
        
        source.onerror = function logError(e) {    
            setError(e)
            countError++
            countError===5 && source.close();
        }
        source.onmessage = function logEvents(event) {      
            updateData(JSON.parse(event.data));
            countError=0;
            //source.close();
        }
        return () => {
            source.close();
        }

    }, [])
    //console.log("==> Theme reçu : "); console.log(data); console.log("====Theme==`")
    return {data, error};
}