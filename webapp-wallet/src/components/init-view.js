import React, { Component } from "react";
import { Button, Container, Header, Divider, Modal, Form, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class InitView extends Component {

  state = {
    open: false,
    wallet: '',
  }

  handleClick = () => {
    this.setState({open: false})
  }
  handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    this.setState({wallet: files[0]});
  }
  render(){
    return (
      <Container textAlign='center'>
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
          <Link to={'/createWallet'}>
            <Button size='massive' color='blue'>Create Wallet</Button>
          </Link>
          <Divider/>
          <Button size='massive' color='violet' onClick={() => this.setState({open: true})}>Import ...</Button>
        </Button.Group>
        <Modal open={this.state.open}>
          <Modal.Header>Import Wallet</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Wallet</label>
                <input type="file" onChange={(e) => this.handleChange(e)}/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
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

export default InitView;
