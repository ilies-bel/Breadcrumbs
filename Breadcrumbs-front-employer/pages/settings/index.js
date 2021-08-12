import React, {useState, useCallback} from 'react';
import dynamic from 'next/dynamic';

import SettingsNavigation from 'components/Layout/SettingsNavigation';

import Head from 'next/head';
import {SETTINGS} from "constants/title"

import AppEditor from "./editor/appEditor";
import {useThemeEvent} from "utils/eventSource";


function Settings() {
    const theme = useThemeEvent();
    const memo = useCallback

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

            { memo( <AppEditor theme={theme} />, [])}

        </>

    );
}

export default Settings;