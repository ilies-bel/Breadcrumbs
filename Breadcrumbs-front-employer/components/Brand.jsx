import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

class Brand extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Link href='/'>
                <span><Image src='/icon-512x512.png' alt='logo' width="50px" height="50px"/></span>
            </Link>
            
        )
    }
}

export default Brand;