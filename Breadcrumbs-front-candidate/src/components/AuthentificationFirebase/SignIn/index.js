import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {withFirebase} from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { FlashyButton } from 'Navigation';

import LinkedInIcon from '@material-ui/icons/LinkedIn';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInLinkedin />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          autoComplete="username"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) =>
      // Create a user in your Firebase Realtime Database too
        this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        }))
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <FlashyButton type="submit">Sign In with Google</FlashyButton>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInLinkedinBase = () => {
  /* const [{ data, loading, error }, refetch] = useAxios({
    baseURL: "https://www.linkedin.com/oauth/v2/authorization",
    params: new URLSearchParams("response_type=code&state=76313eba022e338757284774d3464c2eb709326f4031dd7c727416c99b15bc11&redirect_uri=http://localhost:5000/hiring-process&scope=r_liteprofile&client_id=78xqyjqta1nc2n")
  });
 */
  /* if(error) return <strong>Error linke</strong>
  if(loading) return <loading>loading ...</loading> */
  const onSubmit = (event) => {

        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);


    event.preventDefault();
  };

    return (
      <>
      <form onSubmit={() => onSubmit}>
        <FlashyButton onClick={() => 
          window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=76313eba022e338d3464c2eb709326f4031dd7c727416c99b15bc11&redirect_uri=https://localhost:5000/hiring-process&scope=r_liteprofile&client_id=78xqyjqta1nc2n",
          'Authentifie toi avec Linkedin',
          'menubar=no,location=no,status=no, width=400, heigth=600',)
        } >Sign in with Linkedin   <LinkedInIcon /></FlashyButton>
      </form>
      </>
    )
  
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInLinkedin = compose(
  withRouter,
)(SignInLinkedinBase);

export default SignInPage;

export {
  SignInForm, SignInGoogle, SignInLinkedin
};
