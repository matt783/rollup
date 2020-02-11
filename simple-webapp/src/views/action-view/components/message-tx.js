import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import { handleCloseMessage } from '../../../state/tx/actions';

class MessageTx extends Component {
  static propTypes = {
    isLoadingDeposit: PropTypes.bool.isRequired,
    isLoadingWithdraw: PropTypes.bool.isRequired,
    isLoadingSend: PropTypes.bool.isRequired,
    isLoadingApprove: PropTypes.bool.isRequired,
    isLoadingGetTokens: PropTypes.bool.isRequired,
    successSend: PropTypes.bool.isRequired,
    successTx: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    tx: PropTypes.object.isRequired,
    chainId: PropTypes.number.isRequired,
    messageOpen: PropTypes.bool.isRequired,
    handleCloseMessage: PropTypes.func.isRequired,
  }

  getUrl = () => {
    let net;
    if (this.props.chainId === 5) {
      net = 'goerli.';
    } else if (this.props.chainId === 3) {
      net = 'ropsten.';
    } else if (this.props.chainId === 4) {
      net = 'rinkeby.';
    } else {
      net = '';
    }
    return (
      <a
        href={`https://${net}etherscan.io/tx/${this.props.tx.hash}`}
        target="_blank"
        rel="noopener noreferrer">
          View on Etherscan
      </a>
    );
  }

  getMessage = () => {
    if (this.props.isLoadingDeposit === true || this.props.isLoadingWithdraw === true
      || this.props.isLoadingSend === true || this.props.isLoadingApprove === true
      || this.props.isLoadingGetTokens === true) {
      return (
        <Message icon color="orange">
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Waiting for the transaction...</Message.Header>
          </Message.Content>
        </Message>
      );
    } if (this.props.error !== '' && this.props.messageOpen) {
      return (
        <Message icon color="red" onDismiss={this.props.handleCloseMessage}>
          <Icon name="exclamation" />
          <Message.Content>
            <Message.Header>Error!</Message.Header>
            <p>{this.props.error}</p>
          </Message.Content>
        </Message>
      );
    } if (this.props.successTx === true && this.props.messageOpen) {
      return (
        <Message icon color="green" onDismiss={this.props.handleCloseMessage}>
          <Icon name="check" />
          <Message.Content>
            <Message.Header>Transaction sent!</Message.Header>
            <p>Transaction is being forged... Please click Reload in few seconds!</p>
            {this.getUrl()}
          </Message.Content>
        </Message>
      );
    } if (this.props.successSend === true && this.props.messageOpen) {
      return (
        <Message icon color="green" onDismiss={this.props.handleCloseMessage}>
          <Icon name="check" />
          <Message.Content>
            <Message.Header>Transaction sent!</Message.Header>
            <p>Transaction is being forged... Please click Reload in few seconds!</p>
          </Message.Content>
        </Message>
      );
    }
    return '';
  }

  render() {
    return (
      <div>
        {this.getMessage()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoadingDeposit: state.transactions.isLoadingDeposit,
  isLoadingWithdraw: state.transactions.isLoadingWithdraw,
  isLoadingSend: state.transactions.isLoadingSend,
  isLoadingApprove: state.transactions.isLoadingApprove,
  isLoadingGetTokens: state.transactions.isLoadingGetTokens,
  successSend: state.transactions.successSend,
  successTx: state.transactions.successTx,
  error: state.transactions.error,
  tx: state.transactions.tx,
  messageOpen: state.transactions.messageOpen,
  chainId: state.general.chainId,
});

export default connect(mapStateToProps, { handleCloseMessage })(MessageTx);
