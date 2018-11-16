import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

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
                                <NavLink to={'/sliders'} className="nav-link" activeClassName="active" replace>
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