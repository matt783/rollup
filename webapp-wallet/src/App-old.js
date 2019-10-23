import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderApp from "./components-old/headerApp";
import CreateWallet from "./components-old/createWallet";
import Deposit from "./components-old/deposit";
import Send from "./components-old/send";
import Withdraw from "./components-old/withdraw";
import Config from "./components-old/config";
import DepositOnTop from "./components-old/depositOnTop";
import ForceWithdraw from "./components-old/forcewithdraw";

class App extends Component {

  render(){
    return (
      <div>
        <React.Fragment>
          <HeaderApp />
          <Route exact path="/"/>
          <Route exact path="/createWallet" render={() =>
            <CreateWallet />
          }/>
          <Route exact path="/config" render={() =>
            <Config />
          }/>
          <Route exact path="/deposit" render={() =>
            <Deposit />
          }/>
          <Route exact path="/depositontop" render={() =>
            <DepositOnTop />
          }/>
          <Route exact path="/send" render={() =>
            <Send />
          }/>
          <Route exact path="/forcewithdraw" render={() =>
            <ForceWithdraw />
          }/>
          <Route exact path="/withdraw" render={() =>
            <Withdraw />
          }/>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
