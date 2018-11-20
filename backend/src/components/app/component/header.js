import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav className="navbar">
                <NavLink to={'/'} className="navbar-brand">
                    <img src={'img/logo.png'} alt={'Logo'} />
                    <span>{'Backoffice'}</span>
                </NavLink>
                <div className={'navbar-nav-right'}>
                    <NavLink to={'/'}>
                        <FontAwesomeIcon icon={IconSolid.faUser} />
                    </NavLink>
                </div>
            </nav>
        );
    }
}

export default Header;
