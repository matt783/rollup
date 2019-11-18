import React, { Component } from "react";
import { Container, Header, Divider, Message} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLoadFiles } from '../../../state/general/actions';

import ModalImport from '../components/modal-import';
import ButtonGroupInit from '../components/button-group-init';
import { FILE_STATE } from '../../../constants';

const { readFile } = require('../../../utils/wallet-utils');
const config = require('../../../test/config.json');
const abiRollup = require('../../../test/rollupabi.json');
const abiTokens = require('../../../test/tokensabi.json');

class InitView extends Component {

  state = {
    open: false,
    wallet: '',
    config: '',
    abi: '',
    abiTokens: '',
    ok: FILE_STATE.EMPTY,
  }

  async componentWillUnmount() {
    try {
      if(this.state.ok === FILE_STATE.UPLOADED){
        const walletJson =  await readFile(this.state.wallet);
        await this.props.handleLoadFiles(walletJson, config, abiRollup, abiTokens);
      }
    } catch(err) {
      console.log(err);
    }

  }

  handleClick = async () => {
    if (this.state.wallet === '' || config === undefined || abiRollup === undefined || abiTokens === undefined) {
      console.log("Incorrect File");
      this.setState({ok: FILE_STATE.ERROR});
    } else {
      this.setState({ok: FILE_STATE.UPLOADED});
    }
    this.setState({ open: false });
  }

  handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    this.setState({wallet: files[0]});
  }

  renderRedirect = () => {
    if(this.state.ok === FILE_STATE.UPLOADED) {
      return <Redirect to='/actions' />
    }
  }
  
  toggleModal = () => {this.setState(prev => ({ open: !prev.open }))}
  
  render(){
    let messages;
    if(this.state.ok === FILE_STATE.ERROR || this.props.errorFiles !== '') {
      messages = 
      <Container>
        <Message negative> Error </Message>
      </Container>
    } else if(this.state.ok === FILE_STATE.EMPTY){
      messages = "";
    }
    return (
      <Container textAlign='center'>
        {messages}
        <Header
          as='h1'
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        >Rollup</Header>
        <Divider/>
        <ButtonGroupInit
          toggleModal = {this.toggleModal}
        />
        <ModalImport
          open = {this.state.open}
          toggleModal = {this.toggleModal}
          handleChange = {this.handleChange}
          handleClick = {this.handleClick}
          renderRedirect = {this.renderRedirect}
        />
        {this.renderRedirect()}
      </Container>
    );
  }
}

export default connect(null, { handleLoadFiles })(InitView);