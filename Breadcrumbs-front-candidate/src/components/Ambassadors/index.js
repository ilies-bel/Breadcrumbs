import React from 'react';

import {TitleSource} from "../Navigation/titleContext";
import {AMBASSADORS_TITLE} from "../../constants/routes";
import {AMBASSADORS_DESCRIPTION} from "../../constants/description";
import { PageDescription } from '../Navigation';
import {BrowserRouter as Router, Link, Route, useRouteMatch, Redirect} from 'react-router-dom';
import AmbassadorQuestion from './AmbassadorQuestion';
import AmbassadorList from './AmbassadorList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TextField} from "@material-ui/core";


const style = {
    tab: {
        borderBottomStyle: 'solid',
        borderBottomWidth: '4px',
        borderBottomColor: 'royalblue',
        transition: 'all, ease-in, 0.4s'
    },
    link: {
        textDecoration: 'none',
        color: 'royalblue',
        width:'100%',
        height: '100%'
    }
}

const AmbassadorsPage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {path, url} = useRouteMatch();

    return (
        <Router>
            <Redirect to={`${url}/ambassadors`}/>
            <TitleSource>{AMBASSADORS_TITLE}</TitleSource>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
                >

                <Tab style={ value===0 ? style.tab : {}} label={<Link style={ style.link} to={`${url}/ambassadors`}>Ambassadors</Link>} />
                <Tab style={ value===1 ? style.tab : {}} label={<Link style={ style.link} to={`${url}/questions`}>Questions</Link>} />
            </Tabs>
                <PageDescription>{AMBASSADORS_DESCRIPTION}</PageDescription>

            <div>
                <Route path={`${url}/ambassadors`} component={AmbassadorList} />
                <Route path={`${url}/questions`} component={AmbassadorQuestion} />
            </div>
        
        </Router>
    )
}

export default AmbassadorsPage;
