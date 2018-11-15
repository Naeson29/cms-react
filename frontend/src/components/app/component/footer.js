import React, {Component} from 'react';
import { SocialIcon } from 'react-social-icons';


class Footer extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const style={
            height: 60,
            width: 60
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
