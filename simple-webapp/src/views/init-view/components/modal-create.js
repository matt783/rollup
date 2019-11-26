import React,{Component} from 'react';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';

class ModalCreate extends Component {

    render() {
        return (
          <Modal open={this.props.modalCreate}>
            <Modal.Header>Rollup Wallet</Modal.Header>
            <Modal.Content >
            <Form>
                <Form.Field>
                  <label>File Name</label>
                  <input type="text" ref={this.props.fileNameRef} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" ref={this.props.passwordRef} />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.props.handleClickCreate} >
                <Icon name="check"/>Create
              </Button>
              <Button color="red" onClick={this.props.toggleModalCreate}>
                <Icon name="close"/>Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}

export default ModalCreate;