import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderApp from "./components/header-app";
import InitView from "./views/init-view";
import CreateWallet from "./views/create-wallet";
import Config from "./components/config";
import LoadFiles from "./components/load-files";
import Deposit from "./views/deposit";
import Send from "./views/send";
import Withdraw from "./views/withdraw";
import DepositOnTop from "./views/deposit-on-top";
import ForceWithdraw from "./views/force-withdraw";
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
          <Route exact path="/actions/deposit" render={() =>
            <div>
              <Deposit 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
          <Route exact path="/actions/depositontop" render={() =>
            <div>
              <DepositOnTop 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
          <Route exact path="/actions/send" render={() =>
            <div>
              <Send 
                wallet = {this.props.wallet}
                config = {this.props.config}
              />
            </div>
          }/>
          <Route exact path="/actions/forcewithdraw" render={() =>
            <div>
              <ForceWithdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
              />
            </div>
          }/>
          <Route exact path="/actions/withdraw" render={() =>
            <div>
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