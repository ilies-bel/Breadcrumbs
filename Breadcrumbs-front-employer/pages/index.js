import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import BottomNav from '@/components/Layout/DrawerLeft'
import Header from '../components/Layout/Header'
import { providers, signIn, signOut, useSession, Provider } from 'next-auth/client';
import {useContext} from "react";

export default function Home() {
    const [ session, loading ] = useSession();
  return (
    <>
      <Head>
        <title>Breadcumbs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        Home
        {!session ?
        <button onClick={() => signIn()}>Sign in</button> :
        <div>
          <button onClick={() => signOut()}>Sign out</button>
          <p>Signed as {typeof(session?.user?.name) === 'string' ? session?.user?.name : ( session?.user?.name?.[0] ?? "No one")}</p>
        </div>
        }

    </>
  )
}
