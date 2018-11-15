import React, {Component} from 'react';
import { SocialIcon } from 'react-social-icons';
import {DEVICE_TYPE} from '../../../utils/consts';


class Footer extends Component {

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

        const style={
            height: (device === DEVICE_TYPE.TYPE_DESKTOP ? 65 : 50),
            width: (device === DEVICE_TYPE.TYPE_DESKTOP ? 65 : 50)
        };

        return (
            <div className={'social-network'}>
                <SocialIcon url="#" network="facebook" color="#fff" style={style}/>
                <SocialIcon url="#" network="twitter" color="#fff" style={style}/>
                <SocialIcon url="#" network="google" color="#fff" style={style}/>
                <SocialIcon url="#" network="linkedin" color="#fff" style={style}/>
                <SocialIcon url="#" network="instagram" color="#fff" style={style}/>
            </div>
        );
    }
}

export default Footer;
