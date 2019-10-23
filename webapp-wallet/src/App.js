import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderApp from "./components/headerApp";
import CreateWallet from "./components/createWallet";
import Config from "./components/config";
import LoadFiles from "./components/loadFiles";
import Deposit from "./components/deposit";
import Send from "./components/send";
import Withdraw from "./components/withdraw";
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
          <Route exact path="/loadfiles" render={() =>
            <LoadFiles />
          }/>
          <Route exact path="/deposit" render={() =>
            <Deposit 
              wallet = {this.props.wallet}
              config = {this.props.config}
              rollupabi = {this.props.rollupabi}
            />
          }/>
          <Route exact path="/depositontop" render={() =>
            <DepositOnTop 
              wallet = {this.props.wallet}
              config = {this.props.config}
              rollupabi = {this.props.rollupabi}
            />
          }/>
          <Route exact path="/send" render={() =>
            <Send 
              wallet = {this.props.wallet}
              config = {this.props.config}
            />
          }/>
          <Route exact path="/forcewithdraw" render={() =>
            <ForceWithdraw 
              wallet = {this.props.wallet}
              config = {this.props.config}
              rollupabi = {this.props.rollupabi}
            />
          }/>
          <Route exact path="/withdraw" render={() =>
            <Withdraw 
              wallet = {this.props.wallet}
              config = {this.props.config}
              rollupabi = {this.props.rollupabi}
            />
          }/>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.appReducer.wallet,
  config: state.appReducer.config,
  rollupabi: state.appReducer.rollupabi
})


export default connect(mapStateToProps, {})(App);