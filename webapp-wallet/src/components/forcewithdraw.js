import React, { Component } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import { beforeForceWithdraw, forceWithdraw } from '../actions/forcewithdraw-actions';

class ForceWithdraw extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.walletRef = React.createRef();
    this.configRef = React.createRef();
    this.abiRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
  }

  handleClick = async () => {
    const amount = parseInt(this.amountRef.current.value);
    const wallet = this.walletRef.current.files[0];
    const config = this.configRef.current.files[0];
    const abi = this.abiRef.current.files[0];
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);

    const files = await beforeForceWithdraw(config, wallet, abi);
    const nodeEth = files.config.nodeEth;
    const addressSC = files.config.address;
    const operator = files.config.operator;
    const res = await forceWithdraw(nodeEth, addressSC, amount, tokenId, files.wallet, password, files.abi, operator);
    console.log(res);
  }

  render() {
    return(
      <Container>
        <h1>Force Withdraw</h1>
        <Form>
          <Form.Field>
            <label>Wallet</label>
            <input type="file" ref={this.walletRef}/>
          </Form.Field>
          <Form.Field>
            <label>Config</label>
            <input type="file" ref={this.configRef}/>
          </Form.Field>
          <Form.Field>
            <label>ABI Rollup</label>
            <input type="file" ref={this.abiRef}/>
          </Form.Field>
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
          <Button type="submit" onClick={this.handleClick}>Force Withdraw</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default ForceWithdraw;