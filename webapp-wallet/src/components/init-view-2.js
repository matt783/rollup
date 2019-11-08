import React, { Component } from "react";
import { Button, Container, Header, Divider, Modal, Form, Icon, Message} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadFiles } from '../actions/actions';

const FILES = {
  WALLET: "wallet",
  CONFIG: "config",
  ABI: "abiRollup",
}

const FILE_STATE = {
  EMPTY: "1",
  UPLOADED: "2",
  ERROR: "3",
}

class InitView extends Component {

  state = {
    open: false,
    wallet: '',
    config: '',
    abi: '',
    ok: FILE_STATE.EMPTY,
  }

  handleClick = async () => {
    if (this.state.wallet === '' || this.state.config === '' || this.state.abiRollup === '') {
      console.log("Incorrect File");
      this.setState({ok: FILE_STATE.ERROR})
    } else {
      await this.props.loadFiles(this.state.wallet, this.state.config, this.state.abiRollup);
      this.setState({ok: FILE_STATE.UPLOADED})
    }
    this.setState({ open: false })
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

  renderRedirect = () => {
    if(this.state.ok === FILE_STATE.UPLOADED) {
      return <Redirect to='/deposit' />
    }
  } 
  
  render(){
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
    return (
      <Container textAlign='center'>
        {messages}
        <Header
          as='h1'
          content='Rollup'
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        <Divider/>
        <Button.Group vertical>
          <Button.Group>
            <Link to={'/createWallet'}>
              <Button size='massive' color='blue'>Create Wallet</Button>
            </Link>
            <Link to={'/config'}>
              <Button size='massive' color='blue'>Create Config</Button>
            </Link>
          </Button.Group>
          <Divider/>
          <Button size='massive' color='violet' onClick={() => this.setState({open: true})}>Import ...</Button>
        </Button.Group>
        <Modal open={this.state.open}>
          <Modal.Header>Import Wallet</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Wallet</label>
                <input type="file" onChange={(e) => this.handleChange(e, FILES.WALLET)}/>
              </Form.Field>
              <Form.Field>
                <label>Rollup ABI</label>
                <input type="file" onChange={(e) => this.handleChange(e, FILES.ABI)}/>
              </Form.Field>
              <Form.Field>
                <label>Config File</label>
                <input type="file" onChange={(e) => this.handleChange(e, FILES.CONFIG)}/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {this.renderRedirect()}
            <Button color="blue" onClick={this.handleClick}>
              <Icon name="check"/>Import
            </Button>
            <Button color="red" onClick={() => this.setState({open: false})}>
              <Icon name="close"/>Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default connect(null, { loadFiles })(InitView);
