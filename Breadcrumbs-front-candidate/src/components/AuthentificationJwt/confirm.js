import React from "react";
import { PageDescription } from "littleComponents";
import {useAuthContext} from "components/AuthentificationJwt/context";

const ConfirmLoginPage = () => {
    const authContext = useAuthContext();
    return (
        <div>
            <PageDescription>Successfully connected as <strong>{authContext.userName}</strong> . You can now start a Hiring Process.</PageDescription>
        </div>
    )
}
export default ConfirmLoginPage;