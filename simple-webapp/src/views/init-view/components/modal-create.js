import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Form, Icon, Message,
} from 'semantic-ui-react';

class ModalCreate extends Component {
  static propTypes = {
    fileNameRef: PropTypes.object.isRequired,
    passwordRef: PropTypes.object.isRequired,
    modalCreate: PropTypes.bool.isRequired,
    handleClickCreate: PropTypes.func.isRequired,
    toggleModalCreate: PropTypes.func.isRequired,
    errorCreateWallet: PropTypes.string,
    isCreatingWallet: PropTypes.bool.isRequired,
    isLoadingWallet: PropTypes.bool.isRequired,
    nameWallet: PropTypes.string,
  }

  isLoading = () => {
    if (this.props.isCreatingWallet === true || this.props.isLoadingWallet === true) {
      return (
        <Message warning>
          <Icon name="circle notched" loading />
          Your wallet is being created and imported...
          This may take a few seconds!
        </Message>
      );
    } if (this.props.errorCreateWallet !== '') {
      return (
        <Message error>
          Error
        </Message>
      );
    }
  }

  render() {
    return (
      <Modal open={this.props.modalCreate}>
        <Modal.Header>Rollup Wallet</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label htmlFor="file-name">
                File Name
                <input type="text" ref={this.props.fileNameRef} id="file-name" defaultValue={this.props.nameWallet} />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">
                Password
                <input type="password" ref={this.props.passwordRef} id="password" />
              </label>
            </Form.Field>
          </Form>
          {this.isLoading()}
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={this.props.handleClickCreate}>
            <Icon name="check" />
            Create
          </Button>
          <Button color="grey" basic onClick={this.props.toggleModalCreate}>
            <Icon name="close" />
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalCreate;
