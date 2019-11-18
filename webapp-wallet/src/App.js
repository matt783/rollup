import React, { Component } from "react";
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import InfoWallet from "./base-ui/info-wallet";
import InitView from "./views/init-view";
import CreateWallet from "./views/create-wallet";
import Config from "./views/create-config";
import Deposit from "./views/deposit";
import Transfer from "./views/transfer";
import DepositAndTransfer from "./views/deposit-and-transfer";
import Send from "./views/send";
import Withdraw from "./views/withdraw";
import DepositOnTop from "./views/deposit-on-top";
import ForceWithdraw from "./views/force-withdraw";
import ChooseAction from "./views/choose-action/containers/choose-action";

import { handleWeb3Load, handleLoadFiles } from "./state/general/actions";

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
      if(localStorage.getItem('wallet') !== null){
        const wallet = localStorage.getItem('wallet');
        const config = localStorage.getItem('config');
        const abiRollup = localStorage.getItem('abiRollup');
        const abiTokens = localStorage.getItem('abiTokens');
        await this.props.handleLoadFiles(JSON.parse(wallet), JSON.parse(config), JSON.parse(abiRollup), JSON.parse(abiTokens));
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  componen

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
            <div>
              <ChooseAction 
                wallet = {this.props.wallet}
                account = {this.state.account} 
              />
            </div>
          }/>
          <Route exact path="/actions/deposit" render={() =>
            <div>
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
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
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
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
          <Route exact path="/actions/transfer" render={() =>
            <div>
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
              <Transfer 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
                abiTokens = {this.props.abiTokens}
                web3 = {this.props.web3}
                account = {this.state.account}
              />
            </div>
          }/>
          <Route exact path="/actions/depositandtransfer" render={() =>
            <div>
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
              <DepositAndTransfer 
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
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
              <Send 
                wallet = {this.props.wallet}
                config = {this.props.config}
                account = {this.state.account}
              />
            </div>
          }/>
          <Route exact path="/actions/forcewithdraw" render={() =>
            <div>
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
              <ForceWithdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
                account = {this.state.account}
                web3 = {this.props.web3}
              />
            </div>
          }/>
          <Route exact path="/actions/withdraw" render={() =>
            <div>
              <InfoWallet 
                wallet = {this.props.wallet} 
                account = {this.state.account}
              />
              <Withdraw 
                wallet = {this.props.wallet}
                config = {this.props.config}
                abiRollup = {this.props.abiRollup}
                account = {this.state.account}
                web3 = {this.props.web3}
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


export default connect(mapStateToProps, { handleWeb3Load, handleLoadFiles })(App);