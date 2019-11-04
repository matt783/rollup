import React, { Component } from 'react';
import { Form, Container, Button, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { forceWithdraw } from '../actions/forcewithdraw-actions';
import * as rollup from '../../../utils/bundle-cli';


class ForceWithdraw extends Component {
  
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

    const res = await rollup.onchain.forceWithdraw.forceWithdraw(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, operator);
    console.log(res);
  }

  render() {
    return(
      <Container>
        <Menu secondary>
          <Menu.Menu position='right'>
            <Link to={'/actions'}>
              <Menu.Item
                name="initView"
              >
                <Icon name="reply"/>Back
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
        <h1>Force Withdraw</h1>
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
          <Button type="submit" onClick={this.handleClick}>Force Withdraw</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

export default ForceWithdraw;