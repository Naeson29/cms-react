import React, { Component } from 'react';
import { NavLink }          from 'react-router-dom';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import * as IconSolid       from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
    render() {
        return (
            <div className={'sidebar'}>
                <div className={'sidebar-nav'}>
                    <nav className="navbar">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/dashboard'} className="nav-link" activeClassName="active" replace>
                                    <FontAwesomeIcon icon={IconSolid.faHome} />
                                    <span>{'Dashboard'}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/user'} className="nav-link" activeClassName="active" replace>
                                    <FontAwesomeIcon icon={IconSolid.faUser} />
                                    <span>{'Utilisateurs'}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/slider'} className="nav-link" activeClassName="active" replace>
                                    <FontAwesomeIcon icon={IconSolid.faImages} />
                                    <span>{'Slider'}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;