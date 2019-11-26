import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';

class MessageTx extends Component {
  getMessage = () => {
    if (this.props.isLoadingDeposit === true || this.props.isLoadingWithdraw === true || this.props.isLoadingSend === true || this.props.isLoadingApprove === true || this.props.isLoadingGetTokens === true) {
      return <Message icon color='orange'>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Waiting for the transaction...</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.errorDeposit !== '' || this.props.errorWithdraw !== '' || this.props.errorSend !== '' || this.props.errorApprove !== '' || this.props.errorGetTokens !== '') {
      return <Message icon color='red'>
              <Icon name='exclamation' />
              <Message.Content>
                <Message.Header>Error!</Message.Header>
              </Message.Content>
            </Message>;
    } else if (this.props.successDeposit === true || this.props.successWithdraw === true || this.props.successApprove=== true || this.props.successGetTokens === true) {
      return <Message icon color='green'>
              <Icon name='check' />
              <Message.Content>
                <Message.Header>Transaction done!</Message.Header>
                <a href={`https://etherscan.io/tx/${this.props.tx.hash}`} target="_blank" rel="noopener noreferrer">View on Etherscan</a>
              </Message.Content>
            </Message>;
    } else if(this.props.successSend === true) {
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
    return (
      <div>
        {this.getMessage()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoadingDeposit: state.transactions.isLoadingDeposit,
  successDeposit: state.transactions.successDeposit,
  errorDeposit: state.transactions.errorDeposit,
  isLoadingWithdraw: state.transactions.isLoadingWithdraw,
  successWithdraw: state.transactions.successWithdraw,
  errorWithdraw: state.transactions.errorWithdraw,
  isLoadingSend: state.transactions.isLoadingSend,
  successSend: state.transactions.successSend,
  errorSend: state.transactions.errorSend,
  isLoadingApprove: state.transactions.isLoadingApprove,
  successApprove: state.transactions.successApprove,
  errorApprove: state.transactions.errorApprove,
  isLoadingGetTokens: state.transactions.isLoadingGetTokens,
  successGetTokens: state.transactions.successGetTokens,
  errorGetTokens: state.transactions.errorGetTokens,
  tx: state.transactions.tx,
})

export default connect(mapStateToProps, { })(MessageTx);