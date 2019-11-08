import React, { Component } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import ButtonToActionsView from '../../../base-ui/button-actions-view';
import { deposit, approve } from '../../../actions/deposit-metamask';
import * as rollup from '../../../utils/bundle-cli';

class Deposit extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.addressTokensRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config, abiRollup } = this.props;
    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const res = await rollup.onchain.deposit.deposit(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup);
    console.log(res);
  }

  handleClick2 = async () => {
    const { wallet, config, abiRollup, web3 } = this.props;
    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const account = this.props.account;
    const res = await deposit(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, web3, account);
    console.log("RES: ", res);
  }

  handleClick3 = async () => {
    const { wallet, config, abiRollup, web3, abiTokens } = this.props;
    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const addressTokens = this.addressTokensRef.current.value;
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const account = this.props.account;
    await approve(addressTokens, abiTokens, web3, addressSC, amount, account);
    const res = await deposit(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, web3, account);
    console.log("RES: ", res);
  }

  render() {
    return(
      <Container>
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
          <Button type="submit" onClick={this.handleClick2}>Deposit With Metamask (No approve)</Button>
          <Button type="submit" onClick={this.handleClick3}>Deposit With Metamask (+ Approve)</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default Deposit;