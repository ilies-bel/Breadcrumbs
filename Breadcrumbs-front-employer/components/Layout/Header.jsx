import React from 'react';
import Brand from '../Brand';
import {SETTINGS, SETTINGS_LABEL} from "../../constants/routes";
import Link from "next/link";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
});

class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { classes } = this.props;
        return (
            <header>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Brand/>
                        <Typography variant="h6" noWrap>
                            {this.props.children}
                        </Typography>
                        <Link href={SETTINGS}>{SETTINGS_LABEL}</Link>
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
