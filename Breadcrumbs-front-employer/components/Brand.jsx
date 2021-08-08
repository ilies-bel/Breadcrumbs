import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import {CANDIDATES} from 'constants/routes'

class Brand extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Link href={CANDIDATES}>
                <a><img src='/LogoHeader.png' alt='logo'/></a>
            </Link>
            
        )
    }
}

export default Brand;