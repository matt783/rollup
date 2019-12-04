import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Modal, Form, Icon,
} from 'semantic-ui-react';
import { handleSendSend } from '../../../state/tx/actions';

class ModalSend extends Component {
    static propTypes = {
      activeItem: PropTypes.string.isRequired,
      wallet: PropTypes.object.isRequired,
      config: PropTypes.object.isRequired,
      password: PropTypes.string.isRequired,
      modalSend: PropTypes.bool.isRequired,
      toggleModalSend: PropTypes.func.isRequired,
      handleSendSend: PropTypes.func.isRequired,
      getInfoAccount: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props);
      this.idToRef = React.createRef();
      this.amountRef = React.createRef();
      this.tokenIdRef = React.createRef();
      this.feeRef = React.createRef();
      this.idFromRef = React.createRef();
    }

    chooseSend = () => {
      if (this.props.activeItem === 'send0') {
        return (
          <Form.Field>
            <label htmlFor="id-to">
              ID Receiver
              <input type="text" disabled ref={this.idToRef} defaultValue="0" id="id-to" />
            </label>
          </Form.Field>
        );
      }
      return (
        <Form.Field>
          <label htmlFor="id-to">
            ID Receiver
            <input type="text" ref={this.idToRef} id="id-to" />
          </label>
        </Form.Field>
      );
    }

    handleClick = async () => {
      const { wallet, config, password } = this.props;

      const idTo = parseInt(this.idToRef.current.value, 10);
      const amount = parseInt(this.amountRef.current.value, 10);
      const tokenId = parseInt(this.tokenIdRef.current.value, 10);
      const fee = parseInt(this.feeRef.current.value, 10);
      const { operator } = config;
      const idFrom = parseInt(this.idFromRef.current.value, 10);
      this.props.toggleModalSend();
      const res = await this.props.handleSendSend(operator, idTo, amount, wallet, password, tokenId, fee, idFrom);
      this.props.getInfoAccount();
      // eslint-disable-next-line no-console
      console.log(res);
    }

    render() {
      return (
        <Modal open={this.props.modalSend}>
          <Modal.Header>Send</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label htmlFor="id-from">
                  ID Sender
                  <input type="text" ref={this.idFromRef} id="id-from" />
                </label>
              </Form.Field>
              {this.chooseSend()}
              <Form.Field>
                <label htmlFor="amount">
                  Amount
                  <input type="text" ref={this.amountRef} id="amount" />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="token-id">
                  Token ID
                  <input type="text" disabled ref={this.tokenIdRef} id="token-id" defaultValue="0" />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="fee">
                  Fee
                  <input type="text" ref={this.feeRef} id="fee" />
                </label>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.handleClick}>
              <Icon name="share" />
              Send
            </Button>
            <Button color="red" onClick={this.props.toggleModalSend}>
              <Icon name="close" />
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
}

const mapStateToProps = (state) => ({
  wallet: state.general.wallet,
  config: state.general.config,
  password: state.general.password,
});

export default connect(mapStateToProps, { handleSendSend })(ModalSend);
