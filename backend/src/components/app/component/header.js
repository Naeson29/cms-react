import React, {Component}  from 'react';
import {NavLink}           from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid      from '@fortawesome/free-solid-svg-icons';
import PropTypes           from 'prop-types';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {logout} = this.props;

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
                    <span onClick={() => logout()}>
                        <FontAwesomeIcon icon={IconSolid.faSignOutAlt} />
                    </span>
                </div>
            </nav>
        );
    }
}

export default Header;

Header.propTypes = {
    logout : PropTypes.func.isRequired,
};

