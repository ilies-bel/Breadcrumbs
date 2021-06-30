import React from 'react';
import {BrowserRouter as Router, Link, Route, useRouteMatch, Redirect} from 'react-router-dom';
import {TitleSource} from "../Navigation/titleContext";
import {SOCIAL_TITLE} from "../../constants/routes";
import { Timeline, Tweet } from 'react-twitter-widgets';
import TweetFeed from './tweets/index'
import LinkedFeed from './linked/index'
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paper from '@material-ui/core/Paper';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {useAuthContext} from "components/AuthentificationJwt/context";
import NotFound from "components/NotFound";

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  
const SocialPage = () => {
    const [value, setValue] = React.useState(0);
    const authContext = useAuthContext();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {path, url} = useRouteMatch();
    return (
        <Router>
            <Redirect to='/hiring'/>
            <TitleSource>{SOCIAL_TITLE}</TitleSource>

            <Paper >
                
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                
                <Tab style={ value===0 ? style.tab : {}} label={<Link style={ style.link} to={`${url}/feed/tweets`} replace ><TwitterIcon /></Link>} />
                <Tab style={ value===1 ? style.tab : {}} label={<Link style={ style.link} to={`${url}/feed/linked`} replace ><LinkedInIcon /></Link>} />
            </Tabs>
            
            </Paper>
            
            <div>
                <h1>Social</h1>
                <Route path={`${url}/feed/tweets`} component={TweetFeed} />
                <Route path={`${url}/feed/linked`} component={LinkedFeed} />
            </div>
            
            </Router>
    );
}

export default SocialPage;

