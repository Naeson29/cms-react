import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className="navbar">
                <NavLink to={'/'} className="navbar-brand">
                    <img src={'img/logo.png'} alt={'Logo'} />
                </NavLink>
            </nav>
        );
    }
}

export default Header;
