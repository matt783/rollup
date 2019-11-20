import React,{Component} from 'react';
import { Header, Container, Divider } from 'semantic-ui-react';
import MenuBack from '../components/menu';
import MenuActions from '../components/menu-actions';
import InfoWallet from '../components/info-wallet';
import ModalDeposit from '../components/modal-deposit';
import ModalWithdraw from '../components/modal-withdraw';
import ModalSend from '../components/modal-send';

class ActionView extends Component {

  state = { 
    activeItem: '',
    modalDeposit: false,
    modalWithdraw: false,
    modalSend: false
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

  render() {
    return (
      <Container textAlign="center">
        <MenuBack />
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
        <InfoWallet />
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


export default ActionView;