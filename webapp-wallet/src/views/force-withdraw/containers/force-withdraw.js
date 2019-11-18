import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Container, Button, Message, Icon } from 'semantic-ui-react';
/* import { forceWithdraw } from '../../../actions/forcewithdraw-metamask';
import * as rollup from '../../../utils/rollup-cli';*/
import { handleSendForcewithdraw, handleSendForcewithdrawMetamask } from '../../../state/forcewithdraw-tx/actions';

import ButtonToActionsView from '../../../base-ui/button-actions-view';

class ForceWithdraw extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      res: '',
    }
    this.amountRef = React.createRef();
    this.passwordRef = React.createRef();
    this.tokenIdRef = React.createRef();
    this.idFromRef = React.createRef();
  }

  handleClick = async () => {

    const { wallet, config, abiRollup } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const idFrom = parseInt(this.idFromRef.current.value);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const res = await this.props.handleSendForcewithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, idFrom);
    console.log(res);
  }

  handleClick2 = async () => {

    const { wallet, config, abiRollup, web3 } = this.props;

    const amount = parseInt(this.amountRef.current.value);
    const password = this.passwordRef.current.value;
    const idFrom = parseInt(this.idFromRef.current.value);
    const nodeEth = config.nodeEth;
    const addressSC = config.address;
    const account = this.props.account;

    const res = await this.props.handleSendForcewithdrawMetamask(nodeEth, addressSC, amount, wallet, password, abiRollup, idFrom, web3, account);
    this.setState({res});
    console.log(res);
  }

  getMessage = () => {
    if (this.props.isLoadingForcewithdraw === true) {
      return <Message icon color='orange'>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Waiting for the transaction...</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.errorForcewithdraw !== '') {
      return <Message icon color='red'>
              <Icon name='exclamation' />
              <Message.Content>
                <Message.Header>Error! {this.errorForcewithdraw}</Message.Header>
                View on <a href={`https://etherscan.io/tx/${this.state.res.transactionHash}`}> Etherscan </a>
              </Message.Content>
            </Message>;
    } else if (this.props.successForcewithdraw === true) {
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
            <label>ID From</label>
            <input type="text" ref={this.idFromRef}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Force Withdraw</Button>
          <Button type="submit" onClick={this.handleClick2}>Force Withdraw Metamask</Button>
        </Form>
        <br/>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isLoadingForcewithdraw: state.forcewithdrawTx.isLoadingForcewithdraw,
  errorForcewithdraw: state.forcewithdrawTx.errorForcewithdraw,
  successForcewithdraw: state.forcewithdrawTx.successForcewithdraw,
})

export default connect(mapStateToProps, { handleSendForcewithdraw, handleSendForcewithdrawMetamask })(ForceWithdraw);