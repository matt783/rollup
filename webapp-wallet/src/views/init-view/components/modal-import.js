import React,{Component} from 'react';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';

class ModalImport extends Component {

    render() {
        return (
          <Modal open={this.props.open}>
            <Modal.Header>Import Wallet</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Wallet</label>
                  <input type="file" onChange={(e) => this.props.handleChange(e)}/>
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.props.handleClick}>
                <Icon name="check"/>Import
              </Button>
              <Button color="red" onClick={this.props.toggleModal}>
                <Icon name="close"/>Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}

export default ModalImport;