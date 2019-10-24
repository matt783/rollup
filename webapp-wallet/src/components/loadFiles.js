import React, { Component } from 'react';
import { Form, Container, Button, Message } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { loadFiles } from '../actions/actions';

const FILE_STATE = {
  EMPTY: "1",
  UPLOADED: "2",
  ERROR: "3",
}

const FILES = {
  WALLET: "wallet",
  CONFIG: "config",
  ABI: "abiRollup",
}

class LoadFiles extends Component {
  state = {
    wallet: '',
    config: '',
    abiRollup: '',
    ok: FILE_STATE.EMPTY,
  }

  handleChange = (e, id) => {
    e.preventDefault();
    const files = e.target.files;
    if(id === FILES.WALLET) {
      this.setState({wallet: files[0]});
    } else if (id === FILES.CONFIG) {
      this.setState({config: files[0]});
    } else if (id === FILES.ABI) {
      this.setState({abiRollup: files[0]});
    }
  }

  handleClick = async () => {
    console.log(this.state)
    if (this.state.wallet === '' || this.state.config === '' || this.state.abiRollup === '') {
      console.log("Incorrect File");
      this.setState({ok: FILE_STATE.ERROR})
    } else {
      await this.props.loadFiles(this.state.wallet, this.state.config, this.state.abiRollup);
      this.setState({ok: FILE_STATE.UPLOADED})
    }
  }

  render() {
    let messages;
    if(this.state.ok === FILE_STATE.UPLOADED){
      messages = 
      <Container>
        <Message positive> Uploaded Files </Message>
      </Container>
    } else if(this.state.ok === FILE_STATE.ERROR) {
      messages = 
      <Container>
        <Message negative> Error </Message>
      </Container>
    } else if(this.state.ok === FILE_STATE.EMPTY){
      messages = "";
    }
    
    return(
      <Container>
        <h1>Load Files</h1>
        {messages}
        <Form>
          <Form.Field>
            <label>Wallet</label>
            <input type="file" onChange={(e) => this.handleChange(e, FILES.WALLET)}/>
          </Form.Field>
          <Form.Field>
            <label>Config</label>
            <input type="file" onChange={(e) => this.handleChange(e, FILES.CONFIG)}/>
          </Form.Field>
          <Form.Field>
            <label>ABI Rollup</label>
            <input type="file" onChange={(e) => this.handleChange(e, FILES.ABI)}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleClick}>Deposit</Button>
        </Form>
      </Container>
    );
  }
}

export default connect(null, { loadFiles })(LoadFiles);