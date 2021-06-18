import React from 'react';
import SettingsNavigation from '../../components/Layout/SettingsNavigation';
import BottomNav from '../../components/Layout/SettingsNavigation'
import Header from '../../components/Layout/Header'
import Head from 'next/head';
import { SETTINGS } from "../../constants/title"

function Settings() {

    return (
        <>
        <Head>
            <title>{SETTINGS}</title>
        </Head>
        <SettingsNavigation/>
        <ul>

        </ul>
        </>

    );
}

export default Settings;