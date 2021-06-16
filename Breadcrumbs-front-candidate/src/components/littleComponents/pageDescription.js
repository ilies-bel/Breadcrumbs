import React from 'react';
import {TitleDescriptionTarget} from "Navigation/descriptionContext";

const style = {
    article: {
        margin: '10px',
        fontWeight: '300',
        fontSize: '16px',
        textAlign: 'center',
        lineHeight: '140%',
        fontFamily: 'Roboto'

    }
}

const PageDescription = ({children}) => {
    let content;
    typeof(children) === 'undefined' ? content = <TitleDescriptionTarget /> : content = children;
    return (
        <article style={style.article}>
            {content}
        </article>
    )
};
export default PageDescription;