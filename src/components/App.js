import React, { Component } from 'react';
import '../assets/styles/main.scss';
import { Header } from '../components/Header.js';
import Content from '../components/Content.js';
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: "bottom center"
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Provider template={AlertTemplate} {...options}>
          <Content />
        </Provider>
      </div>
    );
  }
}
