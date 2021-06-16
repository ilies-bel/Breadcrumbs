import React, {Component, useState} from "react";
import {FlashyButton, PageDescription, SignInGoogleBase, SignInLinkedinBase} from 'littleComponents';
import {BrowserRouter as Router, Link, Route, Switch, useParams} from 'react-router-dom'
import emailSignInPage from "components/AuthentificationJwt/signIn/emailSignIn";


class OnBoardingPage extends Component {

    constructor(props) {
        super(props);

        const params = new URLSearchParams(this.props.location.search);

        if (params.get('token')) {
            localStorage.setItem("invite_token", params.get('token'));
        }
        console.log( window.localStorage.getItem("invite_token") )

    }


    render() {
        return (
                <>
                    <h1>Create your account</h1>
                    <PageDescription>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit
                        nisi, pretium ut lacinia in, elementum id enim.</PageDescription>

                    <Link to={{
                        pathname: '/auth/signup/email',
                    }}>
                        <FlashyButton> Create account with email</FlashyButton>
                    </Link>

                    <br/> <br/>

                    <SignInLinkedinBase/><br/>
                    <SignInGoogleBase/><br/>


                </>
            )

    };


}

export default OnBoardingPage;