import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderApp from "./components/headerApp";
import CreateWallet from "./components/createWallet";
import Deposit from "./components/deposit";
import Send from "./components/send";
import Withdraw from "./components/withdraw";
import Config from "./components/config";
import DepositOnTop from "./components/depositOnTop";
import ForceWithdraw from "./components/forcewithdraw";

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
