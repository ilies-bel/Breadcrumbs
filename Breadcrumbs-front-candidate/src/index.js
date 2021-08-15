import React from 'react';
import ReactDOM from 'react-dom/index';

import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
//const ThemeProvider = React.lazy(() => import('@material-ui/core/styles').then((module) => module.MuiThemeProvider) )

import {red} from '@material-ui/core/colors';
import App from './components/App';
import {register} from './ServiceWorker';


// Building theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3572F1',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#EBEBEB',
      modal: '#E5E5E5'
    },
    border: "1px solid #F0F0F2",

  },
  element: {
    button: {
      little: {
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor: '#3572F1'
      },
      big: {
        display: 'block',
        padding: '20px',
        marginBottom: '10px',
        width: '100%',
      }
    },
    link: {
      primary: {
        color: 'white',
        textDecoration: 'none',
        width: '100%'
      },
      secondary: {
        color: 'royalblue',
        textDecoration: 'none',
        width: '100%'
      },
      cancel: {
        color: 'lightred',
        textDecoration: 'none',
        width: '100%'
      }
    },
    modal: {
      position: 'absolute',
        top: '20%',
        bottom: '20%',
        minWidth: '80%',
        maxHeight: '200px',
        backgroundColor: '#EBEBEB',
        border: "1px solid #F0F0F2",
        padding: "10%",
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        transition: 'all, ease-in, 0.2s'
    },
    label: {
      color: 'white',
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    label2: {
      color: 'darkblue',
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
  }
});

ReactDOM.render(
  <React.Suspense fallback={<div>Wait ...</div>} >
    <ThemeProvider>
      <App />
      </ThemeProvider>
    </React.Suspense>,
  document.getElementById('root'),
);

// Service registration
register();
