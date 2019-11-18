import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { deposit, approve } from '../../../actions/deposit-metamask';
// import * as rollup from '../../../utils/rollup-cli';
import { handleSendDeposit, handleSendDepositMetamask } from '../../../state/deposit-tx/actions';

import { Form, Container, Button, Message, Icon } from 'semantic-ui-react';
import ButtonToActionsView from '../../../base-ui/button-actions-view';

class Deposit extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.addressTokensRef = React.createRef();
  }

  handleClick = async () => {
    try {
      const { wallet, config, abiRollup } = this.props;
      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const res = await this.props.handleSendDeposit(nodeEth, addressSC, amount, tokenId, wallet, password, undefined, abiRollup);
      console.log(res);
    } catch(error){
      console.log(error.message);
    }
  }

  /*handleClick2 = async () => {
    try {
      const { wallet, config, abiRollup, web3 } = this.props;
      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const account = this.props.account;
      const res = await deposit(nodeEth, addressSC, amount, tokenId, wallet, password, undefined, abiRollup, web3, account);
      console.log("RES: ", res);
    } catch(error){
      console.log(error.message);
    }
  }*/

  handleClick3 = async () => {
    try {
      const { wallet, config, abiRollup, web3, abiTokens } = this.props;
      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const addressTokens = this.addressTokensRef.current.value;
      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const account = this.props.account;
      /*await approve(addressTokens, abiTokens, web3, addressSC, amount, account);
      const res = await deposit(nodeEth, addressSC, amount, tokenId, wallet, password, undefined, abiRollup, web3, account);*/
      const res = await this.props.handleSendDepositMetamask(nodeEth, addressSC, amount, tokenId, wallet, password, undefined, abiRollup, web3, account, addressTokens, abiTokens);
      console.log("RES: ", res);
    } catch(error){
      console.log(error.message);
    }
  }

  getMessage = () => {
    if (this.props.isLoadingDeposit === true) {
      return <Message icon color='orange'>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Waiting for the transaction...</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.errorDeposit !== '') {
      return <Message icon color='red'>
              <Icon name='exclamation' />
              <Message.Content>
                <Message.Header>Error! {this.errorDeposit}</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.successDeposit === true) {
      return <Message icon color='green'>
              <Icon name='check' />
              <Message.Content>
                <Message.Header>Transaction done!</Message.Header>
              </Message.Content>
            </Message>;
    } else {
      return '';
    }
  }

  render() {
    return(
      <Container>
        {this.getMessage()}
        <ButtonToActionsView />
        <h1>Deposit</h1>
        <Form>
          <Form.Field>
            <label>Amount</label>
            <input type="text" ref={this.amountRef}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" ref={this.passwordRef}/>
          </Form.Field>
          <Form.Field>
            <label>Token ID</label>
            <input type="text" ref={this.tokenIdRef}/>
          </Form.Field>
          <Form.Field>
            <label>Address Token SC</label>
            <input type="text" ref={this.addressTokensRef}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Deposit</Button>
          {/* <Button type="submit" onClick={this.handleClick2}>Deposit With Metamask (No approve)</Button>*/}
          <Button type="submit" onClick={this.handleClick3}>Deposit With Metamask (+ Approve)</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingDeposit: state.depositTx.isLoadingDeposit,
  errorDeposit: state.depositTx.errorDeposit,
  successDeposit: state.depositTx.successDeposit,
})

export default connect(mapStateToProps, { handleSendDeposit, handleSendDepositMetamask })(Deposit);