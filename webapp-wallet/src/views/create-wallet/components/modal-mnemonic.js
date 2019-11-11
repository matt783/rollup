import React,{Component} from 'react';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';

class ModalMnemonic extends Component {

    render() {
        return (
          <Modal open={this.props.open2}>
            <Modal.Header> Rollup Wallet</Modal.Header>
            <Modal.Content >
            <Form>
                <Form.Field>
                  <label>File Name</label>
                  <input type="text" ref={this.props.walletNameRef} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" ref={this.props.passwordRef} />
                </Form.Field>
                <Form.Field>
                  <label>Mnemonic</label>
                  <input type="text" ref={this.props.mnemonicRef} />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.props.handleClick2}>
                <Icon name="check"/>Create
              </Button>
              <Button color="red" onClick={this.props.toggleModal2}>
                <Icon name="close"/>Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}

export default ModalMnemonic;