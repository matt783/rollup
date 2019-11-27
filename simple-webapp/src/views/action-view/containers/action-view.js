import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Container, Divider } from 'semantic-ui-react';

import { handleGetTokens, handleApprove } from '../../../state/tx/actions'
import { handleInfoAccount } from '../../../state/general/actions'
import MenuBack from '../components/menu';
import MenuActions from '../components/menu-actions';
import InfoWallet from '../components/info-wallet';
import ModalDeposit from '../components/modal-deposit';
import ModalWithdraw from '../components/modal-withdraw';
import ModalSend from '../components/modal-send';
import MessageTx from '../components/message-tx';

const tokensAddress = "0x7dFc5b5D172db3941f669770f9993b1df250B560";

class ActionView extends Component {
  
  constructor(props){
    super(props);
    this.state = { 
      activeItem: '',
      modalDeposit: false,
      modalWithdraw: false,
      modalSend: false
    };
  }

  componentDidMount = async () => {
    this.getInfoAccount();
  }

  
  getInfoAccount = () => {
    if(this.props.wallet !== ''){
      this.props.handleInfoAccount(this.props.config.nodeEth, this.props.walletFunder, tokensAddress, this.props.abiTokens, this.props.wallet, this.props.password, this.props.config.operator);
    }
  }

  handleItemClick = (e, { name }) => {
    e.preventDefault();
    this.setState({ activeItem: name });
    if(name === "deposit") {
      this.setState({modalDeposit: true});
    } else if(name === "withdraw") {
      this.setState({modalWithdraw: true});
    } else if(name === "send" || name === "send0") {
      this.setState({modalSend: true});
    }
  }

  toggleModalDeposit = () => {this.setState(prev => ({ modalDeposit: !prev.modalDeposit }))}
  toggleModalWithdraw = () => {this.setState(prev => ({ modalWithdraw: !prev.modalWithdraw }))}
  toggleModalSend = () => {this.setState(prev => ({ modalSend: !prev.modalSend }))}

  handleClickGetTokens = (amountTokens) => {
    this.props.handleGetTokens(this.props.config.nodeEth, this.props.walletFunder, tokensAddress, this.props.abiTokens, this.props.wallet, this.props.password, amountTokens);
    this.getInfoAccount();
  }

  handleClickApprove = async (addressTokens, amountToken) => {
    const res = await this.props.handleApprove(addressTokens, this.props.abiTokens, this.props.wallet,
      amountToken, this.props.config.address, this.props.password, this.props.config.nodeEth)
    console.log(res);
  }

  render() {
    return (
      <Container textAlign="center">
        <MenuBack />
        <MessageTx />
        <Header
        as='h1'
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '1em',
        }}>
          Rollup Network
        </Header>
        <Divider/>
        <MenuActions
          handleItemClick = {this.handleItemClick}
        />
        <InfoWallet
          wallet = {this.props.wallet}
          apiOperator = {this.props.apiOperator}
          handleClickApprove = {this.handleClickApprove}
          addressTokensRef = {this.addressTokensRef}
          amountTokensRef = {this.amountTokensRef}
          handleClickGetTokens = {this.handleClickGetTokens}
          balance = {this.props.balance}
          tokens = {this.props.tokens}
          tokensR = {this.props.tokensR}
          isLoadingInfoAccount = {this.props.isLoadingInfoAccount}
          getInfoAccount = {this.getInfoAccount}
          txs = {this.props.txs}
        />
        <ModalDeposit
          modalDeposit = {this.state.modalDeposit}
          toggleModalDeposit = {this.toggleModalDeposit}
          getInfoAccount = {this.getInfoAccount}
        />
        <ModalWithdraw
          modalWithdraw = {this.state.modalWithdraw}
          toggleModalWithdraw = {this.toggleModalWithdraw}
          getInfoAccount = {this.getInfoAccount}
        />
        <ModalSend
          modalSend = {this.state.modalSend}
          toggleModalSend = {this.toggleModalSend}
          activeItem = {this.state.activeItem}
          getInfoAccount = {this.getInfoAccount}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  wallet: state.general.wallet,
  apiOperator: state.general.apiOperator,
  abiTokens: state.general.abiTokens,
  walletFunder: state.general.walletFunder,
  config: state.general.config,
  password: state.general.password,
  balance: state.general.balance,
  tokens: state.general.tokens,
  tokensR: state.general.tokensR,
  txs: state.general.txs,
  isLoadingInfoAccount: state.general.isLoadingInfoAccount,
})

export default connect(mapStateToProps, { handleGetTokens, handleApprove, handleInfoAccount })(ActionView);