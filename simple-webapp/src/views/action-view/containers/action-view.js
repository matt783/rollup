import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Container, Divider } from 'semantic-ui-react';

import { handleGetTokens, handleApprove } from '../../../state/tx/actions';
import { handleInfoAccount } from '../../../state/general/actions';
import MenuBack from '../components/menu';
import MenuActions from '../components/menu-actions';
import InfoWallet from '../components/info-wallet';
import ModalDeposit from '../components/modal-deposit';
import ModalWithdraw from '../components/modal-withdraw';
import ModalSend from '../components/modal-send';
import MessageTx from '../components/message-tx';
import ModalError from '../components/modal-error';

class ActionView extends Component {
  static propTypes = {
    desWallet: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    abiTokens: PropTypes.array.isRequired,
    tokens: PropTypes.string,
    tokensR: PropTypes.string,
    tokensA: PropTypes.string,
    tokensE: PropTypes.string,
    balance: PropTypes.string,
    txs: PropTypes.array,
    txsExits: PropTypes.array,
    apiOperator: PropTypes.object.isRequired,
    isLoadingInfoAccount: PropTypes.bool.isRequired,
    handleInfoAccount: PropTypes.func.isRequired,
    handleGetTokens: PropTypes.func.isRequired,
    handleApprove: PropTypes.func.isRequired,
    gasMultiplier: PropTypes.number.isRequired,
  }

  static defaultProps = {
    tokens: '0',
    tokensR: '0',
    tokensE: '0',
    balance: '0',
    txs: [],
    txsExits: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      modalDeposit: false,
      modalWithdraw: false,
      modalSend: false,
      modalError: false,
      error: '',
      noImported: false,
    };
  }

  componentDidMount = async () => {
    this.getInfoAccount();
    if (Object.keys(this.props.desWallet).length === 0) {
      this.setState({ noImported: true });
    }
  }


  getInfoAccount = () => {
    if (Object.keys(this.props.desWallet).length !== 0) {
      this.props.handleInfoAccount(this.props.config.nodeEth, this.props.config.tokensAddress, this.props.abiTokens,
        this.props.desWallet, this.props.config.operator, this.props.config.address);
    }
  }

  handleItemClick = (e, { name }) => {
    e.preventDefault();
    this.setState({ activeItem: name });
    if (name === 'deposit') {
      this.setState({ modalDeposit: true });
    } else if (name === 'withdraw') {
      this.setState({ modalWithdraw: true });
    } else if (name === 'send' || name === 'send0') {
      this.setState({ modalSend: true });
    }
  }

  toggleModalDeposit = () => { this.setState((prev) => ({ modalDeposit: !prev.modalDeposit })); }

  toggleModalWithdraw = () => { this.setState((prev) => ({ modalWithdraw: !prev.modalWithdraw })); }

  toggleModalSend = () => { this.setState((prev) => ({ modalSend: !prev.modalSend })); }

  toggleModalError = () => { this.setState((prev) => ({ modalError: !prev.modalError })); }

  handleClickGetTokens = () => {
    this.props.handleGetTokens(this.props.config.nodeEth, this.props.config.tokensAddress,
      this.props.desWallet);
    this.getInfoAccount();
  }

  handleClickApprove = async (addressTokens, amountToken) => {
    const res = await this.props.handleApprove(addressTokens, this.props.abiTokens, this.props.desWallet,
      amountToken, this.props.config.address, this.props.config.nodeEth, this.props.gasMultiplier);
    if (res.message !== undefined) {
      if (res.message.includes('insufficient funds')) {
        this.setState({ error: '1' });
        this.toggleModalError();
      }
    }
  }

  render() {
    return (
      <Container textAlign="center">
        <MenuBack />
        <Header
          as="h1"
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '1em',
          }}>
          Rollup Network
        </Header>
        <Divider />
        <MenuActions
          handleItemClick={this.handleItemClick}
          noImported={this.state.noImported} />
        <MessageTx />
        <InfoWallet
          desWallet={this.props.desWallet}
          handleClickApprove={this.handleClickApprove}
          addressTokensRef={this.addressTokensRef}
          amountTokensRef={this.amountTokensRef}
          handleClickGetTokens={this.handleClickGetTokens}
          balance={this.props.balance}
          tokens={this.props.tokens}
          tokensR={this.props.tokensR}
          tokensE={this.props.tokensE}
          tokensA={this.props.tokensA}
          isLoadingInfoAccount={this.props.isLoadingInfoAccount}
          getInfoAccount={this.getInfoAccount}
          txs={this.props.txs}
          txsExits={this.props.txsExits}
          tokensAddress={this.props.config.tokensAddress}
          noImported={this.state.noImported} />
        <ModalDeposit
          balance={this.props.balance}
          tokensA={this.props.tokensA}
          modalDeposit={this.state.modalDeposit}
          toggleModalDeposit={this.toggleModalDeposit}
          gasMultiplier={this.props.gasMultiplier} />
        <ModalWithdraw
          modalWithdraw={this.state.modalWithdraw}
          toggleModalWithdraw={this.toggleModalWithdraw}
          gasMultiplier={this.props.gasMultiplier} />
        <ModalSend
          apiOperator={this.props.apiOperator}
          modalSend={this.state.modalSend}
          toggleModalSend={this.toggleModalSend}
          activeItem={this.state.activeItem} />
        <ModalError
          error={this.state.error}
          modalError={this.state.modalError}
          toggleModalError={this.toggleModalError} />
        <Divider horizontal>ROLLUP</Divider>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.general.wallet,
  desWallet: state.general.desWallet,
  apiOperator: state.general.apiOperator,
  abiTokens: state.general.abiTokens,
  config: state.general.config,
  password: state.general.password,
  balance: state.general.balance,
  tokens: state.general.tokens,
  tokensR: state.general.tokensR,
  tokensA: state.general.tokensA,
  tokensE: state.general.tokensE,
  txs: state.general.txs,
  txsExits: state.general.txsExits,
  isLoadingInfoAccount: state.general.isLoadingInfoAccount,
  gasMultiplier: state.general.gasMultiplier,
});

export default connect(mapStateToProps, { handleGetTokens, handleApprove, handleInfoAccount })(ActionView);
