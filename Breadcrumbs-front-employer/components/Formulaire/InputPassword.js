import React, { useState} from 'react';

import InputText from './InputText';

export default function InputPassword(props) {

    const [ passValue, setPass ] = useState();
  
    function handleChange(event) {
        setPass(event.target.value);
    }
    return (
        <InputText type='password' placeholder="password" ariaLabel='password' onChange={ props?.onChange } />
    )
}