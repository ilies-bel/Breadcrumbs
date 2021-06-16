import React from 'react';
import Messages from "../Messages";
import {TitleSource} from "../Navigation/titleContext";
import {AMBASSADORS_TITLE} from "../../constants/routes";
import {AMBASSADORS_DESCRIPTION} from "../../constants/description";
import { PageDescription } from '../Navigation';


const AmbassadorQuestion = () => {

    return (
        <>
            <TitleSource>{AMBASSADORS_TITLE}</TitleSource>
            <div>

                <h3>Ask a question</h3>
            </div>
        </>

    );
}

export default AmbassadorQuestion;
