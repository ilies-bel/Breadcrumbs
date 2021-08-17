import {useState, useEffect } from 'react';
import { useSendStatus} from "./axios";

const theme_url = process.env.GET_THEME

/**
 * Reçoit le thème envoyé depuis cet endpoint : /theme/themer/candidateWant
 * @param {*} synchro 
 * @returns 
 */
//TODO: utiliser Background Synchronization ( https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API)
//      à  la place du EventSource.
export const usePostTheme = (synchro)  => {
    
    let [data, updateData] = useState([]);
    const [ error, setError ] = useState();
    let countError  =0;

    useEffect(() => {
        let source = new EventSource(theme_url);

        !synchro && source.close()

        source.onerror = function logError(e) {    
            setError(e)
            countError++
            countError===5 && source.close();
        }
        source.onmessage = function logEvents(event) {
            const res = JSON.parse(event.data)?.[0]
            updateData(res);
            countError=0;
            //source.close();
        }
        return () => {
            source.close();
        }

    }, [synchro])

    return {data, error};
}

export const usePostEvent = (urlEventSource, openEventSource, pathToConnect, responseData=null, event='')  => {
    let [data, updateData] = useState([]);
    const [ error, setError ] = useState();
    let countError  =0;

    const [{data: dataConnect, error: errorConnect}, execute ] = useSendStatus(pathToConnect, responseData, true)

    useEffect(() => {
        let source = new EventSource(urlEventSource);

        !openEventSource && source.close()

        source.onerror = function logError(e) {
            setError(e)
            countError++
            countError===5 && source.close();
        }
        source.onmessage = function logEvents(event) {
            const res = JSON.parse(event.data)?.[0]
            updateData(res);
            countError=0;
            //source.close();

            responseData && execute({
                data: responseData,
                url: pathToConnect
            })
        }
        return () => {
            source.close();
        }

    }, [openEventSource])

    return {data, error};
}