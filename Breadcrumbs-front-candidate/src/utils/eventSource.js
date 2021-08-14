import {useState, useEffect } from 'react';

const theme_url = process.env.GET_THEME
export const usePostTheme = ()  => {
    
    let [data, updateData] = useState([]);
    const [ error, setError ] = useState();
    let countError  =0;

    useEffect(() => {
        let source = new EventSource(theme_url);
        
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

    return {data, error};
}