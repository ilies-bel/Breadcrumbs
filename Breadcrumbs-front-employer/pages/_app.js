import '../styles/globals.css'
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNavigation';

import { Provider, getSession } from 'next-auth/client';
import RestrictedPages from "./pagesAuthentified";

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
    
    <div className="container">
    <BottomNav/>
        <Header />
        <main>
        <Provider >
            <RestrictedPages children={ <Component {...pageProps} /> } />
        </Provider>
      </main>
    </div>
    </>
  )
}

export default MyApp
