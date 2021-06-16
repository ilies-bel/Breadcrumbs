import '../styles/globals.css'
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNavigation';
import DrawerLeft from "../components/Layout/DrawerLeft";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header/>
    <div className="container">
    <DrawerLeft/>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
    </>
  )
}

export default MyApp
