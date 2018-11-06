import React from 'react';
import { Header } from './Header';

export class Root extends React.Component {
  render() {
    return (
        <div className="container col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="header-app">
                <Header/>
            </div>
            <div className="content col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                {this.props.children}
            </div>
        </div>
    );
  }
}
