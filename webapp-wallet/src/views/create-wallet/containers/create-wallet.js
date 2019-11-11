import React, { Component } from "react";
import { Link } from 'react-router-dom';

import {createRandomWallet, createWalletfromMnemonic, createWalletfromJson} from "../create-actions";

import { Button, Container, Menu, Header, Divider, Icon} from 'semantic-ui-react';
import ModalRandom from '../components/modal-random';
import ModalMnemonic from "../components/modal-mnemonic";
import ModalImport from "../components/modal-import";

class CreateWallet extends Component {
 
  constructor(props) {
    super(props);
    this.walletFile = React.createRef();
    this.mnemonicRef = React.createRef();
    this.walletNameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.passwordImportRef = React.createRef();

    this.state = {
      open1: false,
      open2: false,
      open3: false,
    }
  }

  handleClick1 = async () => {
    const walletName = this.walletNameRef.current.value;
    const password = this.passwordRef.current.value;
    await createRandomWallet(password, walletName);
    this.setState({open1: false})
  }

  handleClick2 = async () => {
    const mnemonic = this.mnemonicRef.current.value;
    const walletName = this.walletNameRef.current.value;
    const password = this.passwordRef.current.value;
    if(mnemonic.split(" ").length !== 12) {
      console.log("Invalid mnemonic");
    } else {
      console.log(mnemonic)
      await createWalletfromMnemonic(password, walletName, mnemonic);
      this.setState({open2: false})
    }
  }

  handleClick3 = async () => {
    const walletName = this.walletNameRef.current.value;
    const password = this.passwordRef.current.value;
    const passwordImport = this.passwordImportRef.current.value;
    await createWalletfromJson(password, walletName, passwordImport, this.walletFile.current.files[0]);
    this.setState({open3: false})
  }

  toggleModal1 = () => {this.setState(prev => ({ open1: !prev.open1 }))}
  toggleModal2 = () => {this.setState(prev => ({ open2: !prev.open2 }))}
  toggleModal3 = () => {this.setState(prev => ({ open3: !prev.open3 }))}
  
  render(){
    return (
      <Container>
        <Menu secondary>
          <Menu.Menu position='right'>
            <Link to={'/'}>
              <Menu.Item
                name="initView"
              >
                <Icon name="reply"/>Back
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
        <Container textAlign='center'>
          <Header
            as='h1'
            content='Create Rollup Wallet'
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '3em',
            }}
          />
        </Container>
        <Divider/>
        <Button.Group widths='3' size='massive'>
          <Button color='violet' onClick={() => this.setState({open1: true})}>Create New Rollup Wallet</Button>
          <Button color='violet' onClick={() => this.setState({open2: true})}>Create from Mnemonic</Button>
          <Button color='violet' onClick={() => this.setState({open3: true})}>Import Wallet</Button>
        </Button.Group>
        <ModalRandom
          open1 = {this.state.open1}
          toggleModal1 = {this.toggleModal1}
          walletNameRef = {this.walletNameRef}
          passwordRef = {this.passwordRef}
          handleClick1 = {this.handleClick1}
        />
        <ModalMnemonic
          open2 = {this.state.open2}
          toggleModal2 = {this.toggleModal2}
          walletNameRef = {this.walletNameRef}
          passwordRef = {this.passwordRef}
          mnemonicRef = {this.mnemonicRef}
          handleClick2 = {this.handleClick2}
        />
        <ModalImport
          open3 = {this.state.open3}
          toggleModal3 = {this.toggleModal3}
          walletNameRef = {this.walletNameRef}
          passwordRef = {this.passwordRef}
          walletFile = {this.walletFile}
          passwordImportRef = {this.passwordImportRef}
          handleClick3 = {this.handleClick3}
        />
      </Container>
    );
  }
}

export default CreateWallet;
