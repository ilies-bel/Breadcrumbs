import React from 'react';
import Label from '../../components/Label';
import BottomNav from '../../components/Layout/DrawerLeft';
import Header from '../../components/Layout/Header';
import {AMBASSADORS_DESCRIPTION} from "../../constants/description"



export default function Ambassadors() {

    return (
        <>
        <Header></Header>

        <BottomNav/>

        <main>
            <h2>Insight</h2>
            <Label>est</Label>
            <h3>Hiring process</h3>

        </main>

        </>
    );
}