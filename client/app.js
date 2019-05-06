import React, {Component} from 'react';
import Routes from './Routes'
import NavBar from './components/NavBar'
import {Container} from 'semantic-ui-react'

export default class app extends Component {
  render() {



    return (
      <div>
        <NavBar />
        <Routes />
      </div>
    );
  }
}
