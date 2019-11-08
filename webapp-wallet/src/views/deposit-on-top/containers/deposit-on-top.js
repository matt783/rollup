import React, { Component } from 'react';
// import { depositOnTop } from '../actions/depositontop-actions';
import { Form, Container, Button } from 'semantic-ui-react';
import * as rollup from '../../../utils/bundle-cli';
import ButtonToActionsView from '../../../base-ui/button-actions-view';

class DepositOnTop extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.idToRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config, abiRollup } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const idTo = parseInt(this.idToRef.current.value);

    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const res = await rollup.onchain.depositOnTop.depositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo);
    console.log(res);
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
          <Button type="submit" onClick={this.handleClick}>Deposit</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default DepositOnTop;