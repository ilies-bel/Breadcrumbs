import React, { useState, useEffect } from 'react';

const URL_SOURCE = process.env.NEXT_PUBLIC_THEME_SOURCE

export const useThemeEvent = (url_source) => {

    let [data, updateData] = useState([]);
    const [ error, setError ] = useState()
    
    useEffect(() => {
        let source = new EventSource(URL_SOURCE);
        
        
        source.onerror = function logError(e) {    
            setError(e)
        }
        source.onmessage = function logEvents(event) {      
            updateData(JSON.parse(event.data));
            //source.close();
        }
        return () => {
            source.close();
        }

    }, [])
    //console.log("==> Theme reçu : "); console.log(data); console.log("====Theme==`")
    return {data, error};
}