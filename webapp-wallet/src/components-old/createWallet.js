import React, { Component } from "react";
import {createRandomWallet, createWalletfromMnemonic, createWalletfromJson} from "../actions/create-actions";
import { Button, Divider, Container, Form, Header } from 'semantic-ui-react';

class CreateWallet extends Component {

  constructor(props) {
    super(props);
    this.walletFile = React.createRef();
    this.mnemonicRef = React.createRef();
    this.walletNameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.passwordImportRef = React.createRef();
  }

  handleClick = async () => {
    const walletName = this.walletNameRef.current.value;
    const password = this.passwordRef.current.value;
    await createRandomWallet(password, walletName);
  }

  handleClick2 = async () => {
    // "royal other radio someone leave bitter quantum access again raw wealth glide"
    const mnemonic = this.mnemonicRef.current.value;
    const walletName = this.walletNameRef.current.value;
    const password = this.passwordRef.current.value;
    if(mnemonic.split(" ").length !== 12) {
      console.log("Invalid mnemonic");
    } else {
      console.log(mnemonic)
      await createWalletfromMnemonic(password, walletName, mnemonic);
    }
  }
  handleClick3 = async () => {
    const walletName = this.walletNameRef.current.value;
    const password = this.passwordRef.current.value;
    const passwordImport = this.passwordImportRef.current.value;
    await createWalletfromJson(password, walletName, passwordImport, this.walletFile.current.files[0]);
  }
  

  render(){
    return (
      <Container>
          <h1>Create Wallet</h1>
            <br/>
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
            <br/>
            <Header as='h3' block>Create Random Wallet</Header>
            <Button onClick = {this.handleClick}>Random</Button>
            <Divider hidden />
            <Header as='h3' block>Import Wallet from mnemonic</Header>
            <Form>
              <input type="text" ref={this.mnemonicRef} />
              <Button onClick = {this.handleClick2}>From Mnemonic</Button>
            </Form>
            <Divider hidden />
            <Header as='h3' block>Import Wallet from encrypt json</Header>
            <Form>
              <input type="file" ref={this.walletFile}/>
              <label>Password Import Wallet</label>
              <input type="password" ref={this.passwordImportRef}/>
              <Button onClick = {this.handleClick3}>Import Wallet</Button>
            </Form>
            <br/>
      </Container>
    );
  }
}

export default CreateWallet;
