import React from 'react';
import {Link} from 'react-router';
import { slide as Menu } from 'react-burger-menu';
import {DEVICE_TYPE} from '../../utils/consts';
import ReactSVG from 'react-svg'

export class Header extends React.Component {

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

        return (
            <nav className="navbar col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                <Link to={'/home'} className="navbar-brand">
                    <img src={'img/logo.png'} alt={'Logo'} />
                </Link>
                {
                    device === DEVICE_TYPE.TYPE_DESKTOP ?
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
                        </ul> :
                        <div className={'burger-menu'}>
                            <Menu
                                right
                                width={'100%'}
                                customBurgerIcon={<ReactSVG src="img/burger.svg" svgClassName={'burger-svg'}/>}
                            >
                                <Link to={'/home'} className="nav-link" activeClassName="active">
                                    {'Accueil'}
                                </Link>
                                <Link to={'/newItem'} className="nav-link" activeClassName="active">
                                    {'Items'}
                                </Link>
                            </Menu>
                        </div>
                }
            </nav>
        );
    }
}
