import Link from 'next/link';
import React from 'react';
import BottomLink from '../BottomLink';

import * as ROUTES from '../../constants/routes';

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


console.log(ROUTES.CANDIDATES_LABEL);


const DrawerLeft = () => {
    const classes = useStyles();

    return (
        <div>
            <CssBaseline/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>


                <List>
                    {[[ROUTES.CANDIDATES, ROUTES.CANDIDATES_LABEL],
                        [ROUTES.HIRING_PROCESS, ROUTES.HIRING_PROCESS_LABEL],
                        [ROUTES.TIPS, ROUTES.TIPS_LABEL],
                        [ROUTES.OFFICE, ROUTES.OFFICE_LABEL],
                        [ROUTES.AMBASSADORS, ROUTES.AMBASSADORS_LABEL],
                        [ROUTES.SOCIAL, ROUTES.SOCIAL_LABEL],
                        [ROUTES.INSIGHT, ROUTES.INSIGHT_LABEL]
                    ].map(([link, label], index) => (
                        <ListItem button key={index} component="a" href={link}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={label}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>

            </main>
        </div>
    );
}

export default DrawerLeft

/*
class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            setValue: () => {}
        }
        const handleChange = (event, newValue) => {
            //history.push(newValue);
            this.state.setValue(newValue);
        };
    }

    render () {
        return(
        <div>


            <BottomLink><Link href={CANDIDATES}>{CANDIDATES_LABEL}</Link> </BottomLink>
            <BottomLink><Link href={HIRING_PROCESS}>{HIRING_PROCESS_LABEL}</Link> </BottomLink>
            <BottomLink><Link href={TIPS}>{TIPS_LABEL}</Link> </BottomLink>
            <BottomLink><Link href={OFFICE}>{OFFICE_LABEL}</Link> </BottomLink>
            <BottomLink><Link href={AMBASSADORS}>{AMBASSADORS_LABEL}</Link> </BottomLink>
            <BottomLink><Link href={SOCIAL}>{SOCIAL_LABEL}</Link> </BottomLink>
            <BottomLink><Link href={INSIGHT}>{INSIGHT_LABEL}</Link> </BottomLink>



            <style jsx>{`
            position: fixed;
            display: inline-block;
            width: 100px;
            height: 100%;
            
            left: -0.15%;
            right: 92.31%;
            top: 11.33%;
            `}</style>
        </div>
        )
    };

}

export default BottomNav;
*/