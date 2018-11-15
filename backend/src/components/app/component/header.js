import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {DEVICE_TYPE} from '../../../utils/consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            device : window.innerWidth > 768 ? DEVICE_TYPE.TYPE_DESKTOP : DEVICE_TYPE.TYPE_PHONE
        };

        this._onWindowResize = this._onWindowResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this._onWindowResize);
    }

    componentWillUnMount() {
        window.removeEventListener('resize', this._onWindowResize);
    }

    _onWindowResize(e) {
        let device = e.target.innerWidth > 768 ? DEVICE_TYPE.TYPE_DESKTOP : DEVICE_TYPE.TYPE_PHONE;

        if(device !== this.state.device){
            this.setState({device: device});
        }
    }

    render() {
        const {device} = this.state;

        const styles = {
            bmCrossButton : {
                width  : '32px',
                height : '32px',
                top    : '15px',
                right  : '15px',
            }
        };

        return (
            <nav className="navbar col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                <NavLink to={'/'} className="navbar-brand">
                    <img src={'img/logo.png'} alt={'Logo'} />
                </NavLink>
                {
                    device === DEVICE_TYPE.TYPE_DESKTOP ?
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/Dashboard'} className="nav-link" activeClassName="active">
                                    {'Présentation'}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/newItem'} className="nav-link" activeClassName="active">
                                    {'Items'}
                                </NavLink>
                            </li>
                        </ul> :
                        ''
                }
            </nav>
        );
    }
}

export default Header;
