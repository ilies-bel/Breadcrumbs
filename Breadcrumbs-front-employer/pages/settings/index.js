import React from 'react';
import SettingsNavigation from '../../components/Layout/SettingsNavigation';
import BottomNav from '../../components/Layout/SettingsNavigation'
import Header from '../../components/Layout/Header'
import Head from 'next/head';
import { SETTINGS_LABEL } from "../../constants/routes"

function Settings() {

    return (
        <>
        <Head>
            <title>{SETTINGS_LABEL}</title>
        </Head>
        <SettingsNavigation/>
        <ul>

        </ul>
        </>

    );
}

export default Settings;