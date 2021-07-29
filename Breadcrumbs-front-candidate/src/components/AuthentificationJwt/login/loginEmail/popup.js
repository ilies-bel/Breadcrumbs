import React, {useState} from "react";

import axios from "axios";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { LinkedIn } from 'react-linkedin-login-oauth2';

import PaperDiv from 'littleComponents/PaperDiv'
import { useAuthContext } from "../../context";
import "./login.scss"
import { useHistory } from "react-router-dom";
import * as ROUTES from 'constants/routes';

export default function LPopup() {
    const [ linkedinCode, setCode ] = React.useState('');
    const [ linkedinError, setError ] = React.useState('');
    const [alldata, setAll] = useState('');

    const context = useAuthContext();
    const history = useHistory()
    
    const base_url =process.env.AXIOS_BASE_URL;
    const redirect_uri=base_url+"/login/email"

    const main_url = process.env.MAIN_URL
    const handleSuccess = async(data) => {
        console.log(context.onConnect);console.log("context.onConnect")
        context.setConnect(true);
        setCode(data.code); setError('');
        context.setLinkedinCode(data.code);
        context.setConnect(true);
        console.log(context.onConnect);console.log("context.onConnect")
        console.log(data.code)
        
        window.localStorage.setItem("link_code", data.code);
        axios.post(`/auth/linkedin`, {
            code: data.code,
            redirect_uri: redirect_uri,
        },{
            baseURL: base_url,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": "*",
            },
        }
        ).then(res => {
            let rr = JSON.stringify(res);
            console.log("access_token");console.log(res.data?.access_token);console.log("/access_token")
            window.localStorage.setItem("access_token", res.data?.access_token);
            setAll(rr.data);
        })
        .then(context.setConnect(false))
        .then(() => data.code && history.replace(ROUTES.HIRING_PROCESS))
        .catch(e => {
            data.code && history.replace(ROUTES.HIRING_PROCESS)
            let rr = JSON.stringify(e);
            setAll(rr);
            console.log(e)
        })
        .then(res => accesToken(res.data?.access_token) )
    }
    const handleFailure = (error) => {
        setCode(''); setError(error.errorMessage,);
    }
    const accesToken = async(token) => {
        return await axios.get("https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            let data = res.data;
            let profilePicture = data.profilePicture.elements[0].identifiers[0].identifier;
            
            context.dispatchUserData({ type: 'fill-user-data', 
                                        payload: {
                                            token: token,
                                            first_name: data.firstName.localized.fr_FR,
                                            last_name: data.lastName.localized.fr_FR,
                                            picture: profilePicture.elements[0].identifiers[0].identifier
                                        }
                                    })
            window.localStorage.setItem("picture_link", profilePicture);
            window.localStorage.setItem("user", data.firstName.localized.fr_FR);
        })
    }

    return (
        <div title="Fonctionnalité non-disponible">
            <LinkedIn
            clientId="78kz2u5g2r36lt"
            onFailure={handleFailure}
            onSuccess={handleSuccess}
            redirectUri={`${main_url}/login/email`}
            scope="r_liteprofile r_emailaddress" //demande l'autorisation d'utiliser le nom et l'adresse email
            renderElement={({ onClick, disabled }) => <button onClick={onClick} disabled={disabled} className="linkbutton"><LinkedInIcon className="linkIcon" /> Continue with linkedin</button>}
            >
                
            </LinkedIn>
            {!linkedinCode && <div>No code</div>}
            {linkedinCode && <textarea style={{width: '100%'}} defaultValue={linkedinCode} />}
            {linkedinError && <div>{linkedinError}</div>}
        </div>
    )
}