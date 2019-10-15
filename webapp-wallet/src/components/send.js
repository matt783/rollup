import React, { Component } from 'react';
import { send, beforeSend } from '../actions/send-actions';
import { Form, Container, Button } from 'semantic-ui-react';

class Send extends Component {

  constructor(props) {
    super(props);
    this.idToRef = React.createRef();
    this.amountRef = React.createRef();
    this.walletRef = React.createRef();
    this.configRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.feeRef = React.createRef();
  }

  handleClick = async () => {
    const idTo = parseInt(this.idToRef.current.value);
    const amount = parseInt(this.amountRef.current.value);
    const wallet = this.walletRef.current.files[0];
    const config = this.configRef.current.files[0];
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const fee = parseInt(this.feeRef.current.value);

    const files = await beforeSend(config, wallet);
    const operator = files.config.operator;

    const res = await send(operator, idTo, amount, files.wallet, password, tokenId, fee);
    console.log("SEND: " + res);
  }

  render() {
    return(
      <Container>
        <h1>Send</h1>
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
            <label>ID To</label>
            <input type="text" ref={this.idToRef}/>
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