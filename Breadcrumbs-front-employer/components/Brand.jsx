import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Button from '@material-ui/core/Button';

class Brand extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Link href='/'>
                <img src='/icon-512x512.png' alt='logo' width="50px" height="50px"/>
            </Link>
            
        )
    }
}

export default Brand;