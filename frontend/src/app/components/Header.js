import React from 'react';
import {Link} from 'react-router';
import { slide as Menu } from 'react-burger-menu';

export class Header extends React.Component {
  render() {

    return (
        <nav className="navbar navbar-dark bg-inverse">
            <Link to={'/home'} className="navbar-brand">
                <img src={'img/logo.png'} alt={'Logo'} />
            </Link>
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <Link to={'/home'} className="nav-link" activeClassName="active">
                        {'Accueil'}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/newItem'} className="nav-link" activeClassName="active">
                        {'Items'}
                    </Link>
                </li>
            </ul>
            <div className={'burger-menu'}>
                <Menu right>
                    <Link to={'/home'} className="nav-link" activeClassName="active">
                        {'Accueil'}
                    </Link>
                    <Link to={'/newItem'} className="nav-link" activeClassName="active">
                        {'Items'}
                    </Link>
                </Menu>
            </div>

        </nav>
    );
  }
}
