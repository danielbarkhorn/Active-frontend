import React, { Component } from 'react';
import '../assets/styles/main.scss';
import { Header } from '../components/Header.js';
import Content from '../components/Content.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    );
  }
}
