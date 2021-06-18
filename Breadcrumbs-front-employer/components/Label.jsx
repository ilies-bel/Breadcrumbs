import React from 'react';
const style = {
    label: {
        margin: '20px',
        fontWeight: '300',
        fontSize: '16px',
        lineHeight: '20px',
        fontFamily: 'Roboto',
        display: 'inline',
    }
}

const Label = ({children}) => {
    let content = children;
    return (
        <label style={style.label}>
            {content}
        </label>
    )
};
export default Label;