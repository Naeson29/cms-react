import React from 'react';
import {browserHistory} from 'react-router';


export class NewItem extends React.Component {
  onNavigateHome() {
    browserHistory.push('/home');
  }

  render() {
    return (
        <div className="content col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
            <h3>Dodaj przedmiot</h3>
            <button onClick={this.onNavigateHome} className="btn btn-primary">Stan magazynu</button>
        </div>
    );
  }
}
