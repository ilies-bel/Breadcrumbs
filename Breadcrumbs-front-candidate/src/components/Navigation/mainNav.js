import React from 'react';
import './navigation.scss'

class MainNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
            <main className="main" >
                {this.props.children}
            </main>
            </>
        )
    }
}

export default MainNav;