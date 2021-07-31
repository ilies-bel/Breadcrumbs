import Head from 'next/head'
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useAuthContext} from "utils/context";

export default function TdRow(props) {
    return (
        <td className={props.className + " px-6 py-4 whitespace-nowrap"}>
            {props.children}
        </td>
    )

}