import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import InitView from "./views/init-view";
import CreateWallet from "./views/create-wallet";
import Config from "./views/create-config";
import Deposit from "./views/deposit";
import Send from "./views/send";
import Withdraw from "./views/withdraw";
import DepositOnTop from "./views/deposit-on-top";
import ForceWithdraw from "./views/force-withdraw";
import ChooseAction from "./views/choose-action/containers/choose-action";

import { handleWeb3Load } from "./state/general/actions";

class App extends Component {
  // componentDidCatch
  state = {
    account: '',
  }

  componentDidMount = async () => {
    try {
      await this.props.handleWeb3Load();
      window.ethereum.on('accountsChanged', (accounts) => {
          this.setState({account: accounts[0]}, () => console.log(this.state.account));
      })
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    return (
        <React.Fragment>
          <Route exact path="/" render={() => 
            <InitView
              errorFiles = {this.props.errorFiles}
            />
          }
          />
          <Route exact path="/createWallet" render={() =>
            <CreateWallet />
          }/>
          <Route exact path="/config" render={() =>
            <Config />
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
                abiTokens = {this.props.abiTokens}
                web3 = {this.props.web3}
                account = {this.state.account}
              />
            </div>
          }/>
          <Route exact path="/actions/depositontop" render={() =>
            <div>
              <DepositOnTop 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
                abiTokens = {this.props.abiTokens}
                web3 = {this.props.web3}
                account = {this.state.account}
              />
            </div>
          }/>
          <Route exact path="/actions/send" render={() =>
            <div>
              <Send 
                wallet = {this.props.wallet}
                config = {this.props.config}
                account = {this.state.account}
              />
            </div>
          }/>
          <Route exact path="/actions/forcewithdraw" render={() =>
            <div>
              <ForceWithdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
                account = {this.state.account}
              />
            </div>
          }/>
          <Route exact path="/actions/withdraw" render={() =>
            <div>
              <Withdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
                account = {this.state.account}
              />
            </div>
          }/>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.general.wallet,
  config: state.general.config,
  abiRollup: state.general.abiRollup,
  abiTokens: state.general.abiTokens,
  web3: state.general.web3,
  errorFiles: state.general.errorFiles,
})


export default connect(mapStateToProps, { handleWeb3Load })(App);