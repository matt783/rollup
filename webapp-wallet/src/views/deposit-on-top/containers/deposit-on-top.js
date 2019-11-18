import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Container, Button, Message, Icon } from 'semantic-ui-react';
/* import * as rollup from '../../../utils/rollup-cli';
import { depositOnTop, approve } from '../../../actions/depositontop-metamask'; */
import { handleSendDepositOnTop, handleSendDepositOnTopMetamask } from '../../../state/deposit-on-top-tx/actions';
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
      const res = await this.props.handleSendDepositOnTop(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo);
      console.log(res);
    } catch(error){
      console.log(error.message);
    }
  }

  /* handleClick2 = async () => {
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
  } */
  
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
      const res = await this.props.handleSendDepositOnTopMetamask(nodeEth, addressSC, amount, tokenId, wallet, password, abiRollup, idTo, web3, account, addressTokens, abiTokens);
      console.log("RES: ", res);
    } catch(error){
      console.log(error.message);
    }
  }

  getMessage = () => {
    if (this.props.isLoadingDeposit === true) {
      return <Message icon color='orange'>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Waiting for the transaction...</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.errorDeposit !== '') {
      return <Message icon color='red'>
              <Icon name='exclamation' />
              <Message.Content>
                <Message.Header>Error! {this.errorDeposit}</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.successDeposit === true) {
      return <Message icon color='green'>
              <Icon name='check' />
              <Message.Content>
                <Message.Header>Transaction done!</Message.Header>
              </Message.Content>
            </Message>;
    } else {
      return '';
    }
  }

  render() {
    return(
      <Container>
        <ButtonToActionsView/>
        {this.getMessage()}
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
          {/*<Button type="submit" onClick={this.handleClick2}>Deposit With Metamask (No approve)</Button>*/}
          <Button type="submit" onClick={this.handleClick3}>Deposit With Metamask (+ Approve)</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingDeposit: state.depositOnTopTx.isLoadingDeposit,
  errorDeposit: state.depositOnTopTx.errorDeposit,
  successDeposit: state.depositOnTopTx.successDeposit,
})

export default connect(mapStateToProps, { handleSendDepositOnTop, handleSendDepositOnTopMetamask })(DepositOnTop);