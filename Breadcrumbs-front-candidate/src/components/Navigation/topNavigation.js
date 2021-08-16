import React, { lazy } from 'react';
import {withAuthorization, withEmailVerification} from '../AuthentificationFirebase/Session';

import {compose} from "recompose";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
const AccountCircle = React.lazy(() => import( "@material-ui/icons/AccountCircle"));
import {TitleTarget} from "./titleContext";
import { AuthContext } from "utils/context";
import { useAuthContext } from "utils/context";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        top: 0,
        bottom: 'auto',
        position: 'fixed',
        textAlign: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));



const TopNav = () => {
    const classes = useStyles();
    const context = useAuthContext();
    const history = useHistory();

    const location = history.location.pathname;
    // On considère la page ROUTES.HIRING_PROCESS comme étant la page d'accuil
    const onHomePage = location.search(/hiring/) > 0;

    const handleChange = (event) => {
        onHomePage ? history.push("/user/account") : history.replace("/user/account");
    };

    return (
        <React.Suspense fallback={<header>Wait ...</header>}>
                <AppBar className={classes.appBar}>
                    <Toolbar>

                        <Typography className={classes.title}>
                            <TitleTarget />
                        </Typography>

                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                title={ !context.token ? "Sign in" : `signed in as ${context.userFirstName} ${context.userLastName}` }
                                onClick={() => handleChange()}
                            >
                                { !context.profilePicture ? <AccountCircle/> : <Avatar alt="Photo de profil" src={ context.profilePicture } /> }
                            </IconButton>

                        </div>

                    </Toolbar>
                </AppBar>
        </React.Suspense>

    )
}
/*
                <ul>
                <li>
                <Link to={ROUTES.ACCOUNT}>Hello {authUser.userFirstName}</Link>
                </li>
                <li>
                <SignOutButton/>
                </li>
                </ul>
*/
const condition = (authUser) => !!authUser;

/*export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(TopNav);*/
export default TopNav