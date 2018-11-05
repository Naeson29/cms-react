import React from 'react';
import { Header } from './Header';

export class Root extends React.Component {
  render() {
    return (
        <div className="container">
            <div className="header-app">
                <Header/>
            </div>
            <div className="content">
                {this.props.children}
            </div>
        </div>
    );
  }
}
