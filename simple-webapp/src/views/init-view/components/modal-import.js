import React,{Component} from 'react';
import { Button, Modal, Form, Icon, Message} from 'semantic-ui-react';

class ModalImport extends Component {

    isLoading = () => {
      if(this.props.isLoadingWallet === true) {
        return <Message warning><Icon name='circle notched' loading />We are checking your wallet...</Message>
      } else if (this.props.errorWallet !== '') {
        return <Message error><Icon name='close'/>Invalid Wallet or Password</Message>
      }
    }

    render() {
        return (
          <Modal open={this.props.modalImport}>
            <Modal.Header>Import Wallet</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Wallet</label>
                  <input type="file" onChange={(e) => this.props.handleChangeWallet(e)}/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" ref={this.props.passwordRef}/>
                </Form.Field>
              </Form>
              {this.isLoading()}
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.props.handleClickImport}>
                <Icon name="check"/>Import
              </Button>
              <Button color="red" onClick={this.props.toggleModalImport}>
                <Icon name="close"/>Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}

export default ModalImport;