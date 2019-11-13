import React, { Component } from "react";
import {createRandomWallet, createWalletfromMnemonic, createWalletfromJson} from "../actions/create-actions";
import { Button, Container, Menu, Header, Divider, Modal, Form, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
            content='Create Wallet'
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
          <Button color='violet' onClick={() => this.setState({open1: true})}>Random</Button>
          <Button color='violet' onClick={() => this.setState({open2: true})}>From Mnemonic</Button>
          <Button color='violet' onClick={() => this.setState({open3: true})}>Import</Button>
        </Button.Group>
        <Modal open={this.state.open1}>
          <Modal.Header>Wallet</Modal.Header>
          <Modal.Content >
          <Form>
              <Form.Field>
                <label>File Name</label>
                <input type="text" ref={this.walletNameRef} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" ref={this.passwordRef} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.handleClick1}>
              <Icon name="check"/>Create
            </Button>
            <Button color="red" onClick={() => this.setState({open1: false})}>
              <Icon name="close"/>Close
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal open={this.state.open2}>
          <Modal.Header>Wallet</Modal.Header>
          <Modal.Content >
          <Form>
              <Form.Field>
                <label>File Name</label>
                <input type="text" ref={this.walletNameRef} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" ref={this.passwordRef} />
              </Form.Field>
              <Form.Field>
                <label>Mnemonic</label>
                <input type="text" ref={this.mnemonicRef} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.handleClick2}>
              <Icon name="check"/>Create
            </Button>
            <Button color="red" onClick={() => this.setState({open2: false})}>
              <Icon name="close"/>Close
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal open={this.state.open3}>
          <Modal.Header>Wallet</Modal.Header>
          <Modal.Content >
          <Form>
              <Form.Field>
                <label>File Name</label>
                <input type="text" ref={this.walletNameRef} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" ref={this.passwordRef} />
              </Form.Field>
              <Form.Field>
              <label>Wallet</label>
              <input type="file" ref={this.walletFile}/>
              <label>Password Import Wallet</label>
              <input type="password" ref={this.passwordImportRef}/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.handleClick3}>
              <Icon name="check"/>Create
            </Button>
            <Button color="red" onClick={() => this.setState({open3: false})}>
              <Icon name="close"/>Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default CreateWallet;
