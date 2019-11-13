import React, { Component } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import * as rollup from '../../../utils/bundle-cli';
import { withdraw } from '../../../actions/withdraw-metamask';
import ButtonToActionsView from '../../../base-ui/button-actions-view';

class Withdraw extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.idFromRef = React.createRef();
    this.numExitRootRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config, abiRollup } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const idFrom = parseInt(this.idFromRef.current.value);
    const numExitRoot = parseInt(this.numExitRootRef);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const operator = config.operator;
    const res = await rollup.onchain.withdraw.withdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot);
    console.log(res);
  }

  handleClick2 = async () => {
    const { wallet, config, abiRollup, web3, account } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const idFrom = parseInt(this.idFromRef.current.value);
    const numExitRoot = parseInt(this.numExitRootRef.current.value);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const operator = config.operator;
    const res = await withdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot, web3, account);
    console.log(res);
  }

  render() {
    return(
      <Container>
        <ButtonToActionsView/>
        <h1>Withdraw</h1>
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
            <label>ID From</label>
            <input type="text" ref={this.idFromRef}/>
          </Form.Field>
          <Form.Field>
            <label>Num Exit Root</label>
            <input type="text" ref={this.numExitRootRef}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Withdraw</Button>
          <Button onClick={this.handleClick2}>Withdraw Metamask</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default Withdraw;