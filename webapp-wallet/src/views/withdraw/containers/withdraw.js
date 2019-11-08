import React, { Component } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import * as rollup from '../../../utils/bundle-cli';
// import { withdraw } from '../actions/withdraw-actions';
import ButtonToActionsView from '../../../base-ui/button-actions-view';

class Withdraw extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.idToRef = React.createRef();
    this.numExitRootRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config, abiRollup } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const idTo = parseInt(this.idToRef.current.value);
    const numExitRoot = parseInt(this.numExitRootRef);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const operator = config.operator;
    const res = await rollup.onchain.withdraw.withdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idTo, numExitRoot);
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
            <label>ID To</label>
            <input type="text" ref={this.idToRef}/>
          </Form.Field>
          <Form.Field>
            <label>Num Exit Root</label>
            <input type="text" ref={this.numExitRootRef}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Withdraw</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default Withdraw;