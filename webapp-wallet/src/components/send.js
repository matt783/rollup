import React, { Component } from 'react';
import { send } from '../actions/send-actions';
import { Form, Container, Button } from 'semantic-ui-react';

class Send extends Component {

  constructor(props) {
    super(props);
    this.idToRef = React.createRef();
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.feeRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config } = this.props;

    const idTo = parseInt(this.idToRef.current.value);
    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const fee = parseInt(this.feeRef.current.value);
    const operator = config.operator;

    const res = await send(operator, idTo, amount, wallet, password, tokenId, fee);
    console.log("SEND: " + res);
  }

  render() {
    return(
      <Container>
        <h1>Send</h1>
        <Form>
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