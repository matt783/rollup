import React, { Component } from 'react';
// import { depositOnTop } from '../actions/depositontop-actions';
import { Form, Container, Button } from 'semantic-ui-react';
import * as rollup from '../../../utils/rollup-cli';
import { depositOnTop, approve } from '../../../actions/depositontop-metamask';
import ButtonToActionsView from '../../../base-ui/button-actions-view';

class DepositOnTop extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.idToRef = React.createRef();
    this.addressTokensRef = React.createRef();
  }

  handleClick = async () => {
    try {
      const { wallet, config, abiRollup } = this.props;

      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const idTo = parseInt(this.idToRef.current.value);

      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const res = await rollup.onchain.depositOnTop.depositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo);
      console.log(res);
    } catch(error){
      console.log(error.message);
    }
  }

  handleClick2 = async () => {
    try {
      const { wallet, config, abiRollup, web3 } = this.props;

      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const idTo = parseInt(this.idToRef.current.value);

      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const account = this.props.account;
      const res = await depositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo, web3, account);
      console.log("RES: ", res);
    } catch(error){
      console.log(error.message);
    }
  }

  handleClick3 = async () => {
    try {
      const { wallet, config, abiRollup, web3, abiTokens } = this.props;
      
      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const idTo = parseInt(this.idToRef.current.value);
      const addressTokens = this.addressTokensRef.current.value;

      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const account = this.props.account;
      await approve(addressTokens, abiTokens, web3, addressSC, amount, account);
      const res = await depositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo, web3, account);
      console.log("RES: ", res);
    } catch(error){
      console.log(error.message);
    }
  }

  render() {
    return(
      <Container>
        <ButtonToActionsView/>
        <h1>Deposit On Top</h1>
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
            <label>ID to</label>
            <input type="text" ref={this.idToRef}/>
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

export default DepositOnTop;