import React, { Component } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import { withdraw } from '../actions/withdraw-actions';

class Withdraw extends Component {
  
  constructor(props) {
    super(props);
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
  }

  handleClick = async () => {
    const { wallet, config, abiRollup } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const tokenId = parseInt(this.tokenIdRef.current.value);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const operator = config.operator;
    const res = await withdraw(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, operator);
    console.log(res);
  }

  render() {
    return(
      <Container>
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
            <label>Token ID</label>
            <input type="text" ref={this.tokenIdRef}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Withdraw</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default Withdraw;