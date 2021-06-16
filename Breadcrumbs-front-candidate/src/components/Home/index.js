import React from 'react';
import {compose} from 'recompose';

import {withAuthorization, withEmailVerification} from '../AuthentificationFirebase/Session';
import Messages from '../Messages';
import {useAuthContext} from "components/AuthentificationJwt/context";
import NotFound from "components/NotFound";
import {PageDescription} from "littleComponents";


const HomePage = () => {
    const context = useAuthContext();

    if(!context.token) { return <NotFound /> }
    if(context.token) {
        return (
            <div>
                <PageDescription>The Home Page is accessible by every signed in user.</PageDescription>
            </div>
        );
    }
}

const condition = (authUser) => !!authUser;

/*export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(HomePage);*/
export default HomePage;
