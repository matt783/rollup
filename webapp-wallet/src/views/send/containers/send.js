import React, { Component } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import * as rollup from '../../../utils/bundle-cli';
import ButtonToActionsView from '../../../base-ui/button-actions-view';

class Send extends Component {

  constructor(props) {
    super(props);
    this.idToRef = React.createRef();
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.feeRef = React.createRef();
    this.idFromRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config } = this.props;

    const idTo = parseInt(this.idToRef.current.value);
    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const fee = parseInt(this.feeRef.current.value);
    const operator = config.operator;
    const idFrom = parseInt(this.idFromRef.current.value);

    const res = await rollup.offchain.send.send(operator, idTo, amount, wallet, password, tokenId, fee, idFrom);
    console.log("SEND: " + res);
  }

  render() {
    return(
      <Container>
        <ButtonToActionsView/>
        <h1>Send</h1>
        <Form>
          <Form.Field>
            <label>ID To</label>
            <input type="text" ref={this.idToRef}/>
          </Form.Field>
          <Form.Field>
            <label>ID From</label>
            <input type="text" ref={this.idFromRef}/>
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
          <Form.Field>
            <label>Fee</label>
            <input type="text" ref={this.feeRef}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Send</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default Send;