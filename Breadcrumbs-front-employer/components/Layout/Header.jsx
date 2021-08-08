import React from 'react';
import Brand from '../Brand';
import {SETTINGS, SETTINGS_LABEL} from "../../constants/routes";
import Link from "next/link";
import { useRouter } from 'next/router'
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, Avatar, Button, IconButton, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';

import axios from 'axios'
import Label from '../Label';
import {Settings, Search, Bell } from 'tabler-icons-react'

import '@/styles/navigation.module.css';
import {AuthContext, useAuthContext} from "../../utils/context";

const drawerWidth = 240;
/*
const useStyles = makeStyles((theme) => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
}));
*/
const styles = theme => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    profile: {
        display: 'flex'
        //alignItems: 'center'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
}
const ForwardItem = React.forwardRef((props, ref) => {return (<a ref={ref} href={props.href}> {props.children} </a>)})
const ProfileItem = (props, ref) => {
    const data = props.data ?? null;
    const context = useAuthContext();
    const router = useRouter();
    return (
        <div className="profile">
            <Label>{data && data.name?.[0]}</Label>

            <IconButton title="Fonctionnalité non-disponible"> <Search color="royalblue" /></IconButton>
            <IconButton onClick={() => router.push(SETTINGS)}> <Settings color="royalblue" /></IconButton>
            <IconButton title="Fonctionnalité non-disponible"><Bell color="royalblue" /></IconButton>
            
            {context.token ?
                <Button onClick={() => logOut()} title="Sign out" ><Avatar /></Button> :
                <Button onClick={()=>{}} title="Sign in"> <Avatar/> </Button>
            }

        </div>
    )
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        
        //let rec = getSession()
        this.state = {
            data: null
        }
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;
        const dataUser = data?.user;

        return (
            <header>
                <AppBar position="fixed" color="inherit" >
                    <Toolbar>
                        <Brand/>
                        <Typography variant="h6" noWrap>
                            {this.props.children}
                        </Typography>                        
                        <ProfileItem data={dataUser}/>
                    </Toolbar>
                </AppBar>
            </header>
        )

    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
