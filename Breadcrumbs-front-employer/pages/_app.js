import '../styles/globals.css'
import Header from '../components/Layout/Header';

import BottomNav from '../components/Layout/BottomNavigation';

import { Provider, getSession } from 'next-auth/client';
import RestrictedPages from "./pagesAuthentified";

import 'tailwindcss/tailwind.css'
import {AuthProvider, useAuthContext} from "utils/context";
import LoginPage from "./Authentification/login";

function MyApp({ Component, pageProps }) {
    const context = useAuthContext()
    if(process.browser) {
        context.setToken(window.localStorage.getItem("token"));
    }

  return (
    <>
    
    <div className="container">
    <BottomNav/>
        <Header/>
        <main>
            <AuthProvider>
                <RestrictedPages children={<Component {...pageProps} />} />
            </AuthProvider>
      </main>
    </div>
    </>
  )
}

export default MyApp
