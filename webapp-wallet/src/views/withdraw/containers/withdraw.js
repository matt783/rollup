import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Container, Button, Message, Icon } from 'semantic-ui-react';
/* import * as rollup from '../../../utils/rollup-cli';
import { withdraw } from '../../../actions/withdraw-metamask';*/
import { handleSendWithdraw, handleSendWithdrawMetamask } from '../../../state/withdraw-tx/actions';

import ButtonToActionsView from '../../../base-ui/button-actions-view';

class Withdraw extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      res: '',
    }
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
    const res = await this.props.handleSendWithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot);
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
    const res = await this.props.handleSendWithdrawMetamask(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot, web3, account);
    this.setState({res});
    console.log(res);
  }

  getMessage = () => {
    if (this.props.isLoadingWithdraw === true) {
      return <Message icon color='orange'>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Waiting for the transaction...</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.errorWithdraw !== '') {
      return <Message icon color='red'>
              <Icon name='exclamation' />
              <Message.Content>
                <Message.Header>Error! {this.errorWithdraw}</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.successWithdraw === true) {
      return <Message icon color='green'>
              <Icon name='check' />
              <Message.Content>
                <Message.Header>Transaction done!</Message.Header>
                View on <a href={`https://etherscan.io/tx/${this.state.res.transactionHash}`}> Etherscan </a>
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


const mapStateToProps = state => ({
  isLoadingWithdraw: state.withdrawTx.isLoadingWithdraw,
  errorWithdraw: state.withdrawTx.errorWithdraw,
  successWithdraw: state.withdrawTx.successWithdraw,
})

export default connect(mapStateToProps, { handleSendWithdraw, handleSendWithdrawMetamask })(Withdraw);