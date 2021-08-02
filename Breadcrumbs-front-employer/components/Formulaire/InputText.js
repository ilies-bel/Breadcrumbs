import React, { useState} from 'react';


export default function InputText(props) {

    function isValidetype(type) {
        if( (type===null) || (type==='text')|| (type==='email') || (type==='password') || (type==='file')  ) {
            return true
        }
        else {
            console.error("Invalid props 'type' provided in InputText component.")
            return false
        }
    }
    return (
        <input type={ props?.type &&  ( isValidetype(props?.type) ? props.type : 'text') }
                placeholder={ props?.placeholder ? props?.placeholder : 'type your text'}
                aria-label={props?.ariaLabel ? props.ariaLabel : 'text'}
                onChange={ props?.onChange }
                required={ props.required }
                className="focus:ring-royalblue focus:border-royalblue block w-1/2 h-12 p-4 mt-4 sm:text-sm border-2 border-gray-300 rounded-md font-roboto" />
    )
}