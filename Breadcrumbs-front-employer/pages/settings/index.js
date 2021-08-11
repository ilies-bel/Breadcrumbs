import React, {useState} from 'react';
import dynamic from 'next/dynamic';

import SettingsNavigation from 'components/Layout/SettingsNavigation';

import Head from 'next/head';
import {SETTINGS} from "constants/title"
import {fetchCalendarData} from "utils/axios";
import AppEditor from "./appEditor";



function Settings() {
    const theme = "useThemeEvent();"

    return (
        <>
            <Head>
                <title>{SETTINGS}</title>
            </Head>
            <div>
                <SettingsNavigation/>
                {
                    theme.data &&
                    <ul>
                        <li>
                            {theme?.data?.fontSize}
                        </li>
                        <li>
                            {theme?.data?.bgColor}
                        </li>

                    </ul>}
            </div>

            <br/>
            <hr className="border-2 border-royalblue" />
            <br/>

            <AppEditor theme={theme} />

        </>

    );
}

export default Settings;