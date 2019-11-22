import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Header, Container, Divider } from 'semantic-ui-react';

import { handleGetTokens, handleApprove } from '../../../state/tx/actions'
import MenuBack from '../components/menu';
import MenuActions from '../components/menu-actions';
import InfoWallet from '../components/info-wallet';
import ModalDeposit from '../components/modal-deposit';
import ModalWithdraw from '../components/modal-withdraw';
import ModalSend from '../components/modal-send';
import MessageTx from '../components/message-tx';

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

  toggleModalDeposit =() => {this.setState(prev => ({ modalDeposit: !prev.modalDeposit }))}
  toggleModalWithdraw =() => {this.setState(prev => ({ modalWithdraw: !prev.modalWithdraw }))}
  toggleModalSend =() => {this.setState(prev => ({ modalSend: !prev.modalSend }))}

  handleClickGetTokens = () => {
    this.props.handleGetTokens(this.props.config.nodeEth, this.props.walletFunder, "0x7dFc5b5D172db3941f669770f9993b1df250B560",this.props.abiTokens, this.props.wallet, this.props.password);
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
        />
        <ModalDeposit
          modalDeposit = {this.state.modalDeposit}
          toggleModalDeposit = {this.toggleModalDeposit}
        />
        <ModalWithdraw
          modalWithdraw = {this.state.modalWithdraw}
          toggleModalWithdraw = {this.toggleModalWithdraw}
        />
        <ModalSend
          modalSend = {this.state.modalSend}
          toggleModalSend = {this.toggleModalSend}
          activeItem = {this.state.activeItem}
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
})

export default connect(mapStateToProps, { handleGetTokens, handleApprove })(ActionView);