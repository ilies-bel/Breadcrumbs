import React from 'react';
import SettingsNavigation from 'components/Layout/SettingsNavigation';

import Head from 'next/head';
import { SETTINGS } from "../../constants/title"
import { useThemeEvent } from 'utils/eventSource';

const url_source = process.env.NEXT_PUBLIC_THEME_SOURCE

function Settings() {
    const theme = useThemeEvent();

    return (
        <>
        <Head>
            <title>{SETTINGS}</title>
        </Head>
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
        </>

    );
}

export default Settings;