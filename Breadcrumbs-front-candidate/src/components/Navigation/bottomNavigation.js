import React from 'react';
import {useHistory} from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const BottomNavigation = React.lazy(() => import("@material-ui/core/BottomNavigation") );
const BottomNavigationAction = React.lazy(() => import("@material-ui/core/BottomNavigationAction"));
import {makeStyles} from "@material-ui/core/styles";

import {useAuthContext} from "components/AuthentificationJwt/context";
import {Building, ClipboardList, InfoCircle, Social, School} from 'tabler-icons-react';

const useStyles = makeStyles((theme) => ({
    BottomNavigation: {
        '& .Mui-selected': {
            borderTopColor: '#3572F1',
            borderStyle: 'solid',
        }
    },
    BottomNavigationAction: {
        minWidth: "20%",
        borderTopWidth: '4px',
        '& .Mui-selected': {
            border: 'none',
        },
    },
}));


const BottomNav = () => {
    const classes =  useStyles();
    const context = useAuthContext();
    const [value, setValue] = React.useState(0);

    const history = useHistory();

    const handleChange = (event, newValue) => {
        history.replace(newValue);
        setValue(newValue);
    };

    if(!context.token && !context.linkedinCode) return ( <p>No access</p>)
    if(context.token || context.linkedinCode) return (
        <React.Suspense fallback={<span className={classes.BottomNavigation} >Wait ...</span> } >
            <BottomNavigation
                className={classes.BottomNavigation}
                value={value}
                onChange={handleChange}
                showLabels
            >
                <BottomNavigationAction className={classes.BottomNavigationAction} value={ROUTES.HIRING_PROCESS} label={ROUTES.HIRING_LABEL}
                                        icon={<ClipboardList
                                                    size={30}
                                                    strokeWidth={1}
                                                    color={'royalblue'}
                                                />}/>
                <BottomNavigationAction className={classes.BottomNavigationAction} value={ROUTES.TIPS} label={ROUTES.TIPS_LABEL}
                                        icon={<InfoCircle
                                                    size={30}
                                                    strokeWidth={1}
                                                    color={'royalblue'}
                                                />}/>
                <BottomNavigationAction className={classes.BottomNavigationAction} value={ROUTES.OFFICE} label={ROUTES.OFFICE_LABEL}
                                        icon={<Building
                                                    size={30}
                                                    strokeWidth={1}
                                                    color={'royalblue'}
                                                />}/>
                <BottomNavigationAction className={classes.BottomNavigationAction} value={ROUTES.AMBASSADORS} label={ROUTES.AMBASSADORS_LABEL}
                                        icon={<School
                                                    size={30}
                                                    strokeWidth={1}
                                                    color={'royalblue'}
                                                />}/>
                <BottomNavigationAction className={classes.BottomNavigationAction} value={ROUTES.SOCIAL} label={ROUTES.SOCIAL_LABEL}
                                        icon={<Social
                                                    size={30}
                                                    strokeWidth={1}
                                                    color={'royalblue'}
                                                />}/>

            </BottomNavigation>
            </React.Suspense>

    );

}

const condition = (authUser) => !!authUser;

export default BottomNav
