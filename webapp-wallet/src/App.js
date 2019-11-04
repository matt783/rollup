import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderApp from "./components/header-app";
import InitView from "./views/init-view";
import CreateWallet from "./views/create-wallet";
import Config from "./components/config";
import LoadFiles from "./components/load-files";
import Deposit from "./components/deposit";
import Send from "./components/send";
import Withdraw from "./components/withdraw";
import DepositOnTop from "./components/deposit-on-top";
import ForceWithdraw from "./components/force-withdraw";
import ChooseAction from "./views/choose-action/containers/choose-action";

class App extends Component {

  render(){
    return (
        <React.Fragment>
          <Route exact path="/" render={() => 
            <InitView />
          }
          />
          <Route exact path="/createWallet" render={() =>
            <CreateWallet />
          }/>
          <Route exact path="/config" render={() =>
            <Config />
          }/>
          <Route exact path="/loadfiles" render={() =>
            <LoadFiles />
          }/>
          <Route exact path="/actions" render={() =>
            <ChooseAction />
          }/>
          <Route exact path="/deposit" render={() =>
            <div>
              <HeaderApp />
              <Deposit 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
          <Route exact path="/depositontop" render={() =>
            <div>
              <HeaderApp />
              <DepositOnTop 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
          <Route exact path="/send" render={() =>
            <div>
              <HeaderApp />
              <Send 
                wallet = {this.props.wallet}
                config = {this.props.config}
              />
            </div>
          }/>
          <Route exact path="/forcewithdraw" render={() =>
            <div>
              <HeaderApp />
              <ForceWithdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
          <Route exact path="/withdraw" render={() =>
            <div>
              <HeaderApp />
              <Withdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.appReducer.wallet,
  config: state.appReducer.config,
  abiRollup: state.appReducer.abiRollup
})


export default connect(mapStateToProps, {})(App);