import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Modal, Form, Icon, Dropdown,
} from 'semantic-ui-react';
import ModalError from './modal-error';
import { handleSendWithdraw, handleGetExitRoot } from '../../../state/tx/actions';

class ModalWithdraw extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    abiRollup: PropTypes.array.isRequired,
    modalWithdraw: PropTypes.bool.isRequired,
    toggleModalWithdraw: PropTypes.func.isRequired,
    handleSendWithdraw: PropTypes.func.isRequired,
    handleGetExitRoot: PropTypes.func.isRequired,
    gasMultiplier: PropTypes.number.isRequired,
    desWallet: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      exitRoots: [],
      numExitRoot: -1,
      idFrom: -1,
      initModal: true,
      modalError: false,
      error: '',
    };
    this.idFromRef = React.createRef();
  }

  toggleModalError = () => { this.setState((prev) => ({ modalError: !prev.modalError })); }

    handleClick = async () => {
      const {
        config, abiRollup, desWallet,
      } = this.props;

      const idFrom = Number(this.state.idFrom);
      const numExitRoot = Number(this.state.numExitRoot);
      const { nodeEth } = config;
      const addressSC = config.address;
      const { operator } = config;
      this.toggleModalChange();
      this.props.toggleModalWithdraw();
      const res = await this.props.handleSendWithdraw(nodeEth, addressSC, desWallet,
        abiRollup, operator, idFrom, numExitRoot, this.props.gasMultiplier);
      if (res !== undefined) {
        if (res.message !== undefined) {
          if (res.message.includes('insufficient funds')) {
            this.setState({ error: '1' });
            this.toggleModalError();
          }
        }
      }
    }

    getExitRoot = async () => {
      const exitRoots = await this.props.handleGetExitRoot(this.props.config.operator, this.idFromRef.current.value);
      this.setState({ exitRoots, idFrom: this.idFromRef.current.value }, () => { this.toggleModalChange(); });
    }

    exitRoot = () => {
      let dropdown;
      if (this.state.exitRoots === []) {
        dropdown = (<Dropdown placeholder="Num Exit Root" />);
      } else {
        dropdown = (
          <Dropdown
            placeholder="Num Exit Root"
            options={this.state.exitRoots}
            onChange={this.handleChange} />
        );
      }
      return dropdown;
    }

    handleChange = (e, { value }) => this.setState({ numExitRoot: value })

    modal = () => {
      if (this.state.initModal === true) {
        return (
          <Modal open={this.props.modalWithdraw}>
            <Modal.Header>Withdraw</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label htmlFor="form-withdraw">
                    ID From
                    <input type="text" ref={this.idFromRef} id="form-withdraw" />
                  </label>
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.getExitRoot}>
                <Icon name="arrow right" />
                Next
              </Button>
              <Button color="grey" basic onClick={this.props.toggleModalWithdraw}>
                <Icon name="close" />
                Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }
      return (
        <Modal open={this.props.modalWithdraw}>
          <Modal.Header>Withdraw</Modal.Header>
          <Modal.Content>
            <p><b>ID From</b></p>
            <p>{this.state.idFrom}</p>
            <p><b>Num Exit Root</b></p>
            {this.exitRoot()}
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.toggleModalChange}>
              <Icon name="arrow left" />
              Previous
            </Button>
            <Button color="blue" onClick={this.handleClick}>
              <Icon name="sign-out" />
              Withdraw
            </Button>
            <Button color="grey" basic onClick={this.toogleCloseModal}>
              <Icon name="close" />
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    toggleModalChange = () => { this.setState((prev) => ({ initModal: !prev.initModal })); }

    toogleCloseModal = () => { this.toggleModalChange(); this.props.toggleModalWithdraw(); }

    render() {
      return (
        <div>
          <ModalError
            error={this.state.error}
            modalError={this.state.modalError}
            toggleModalError={this.toggleModalError} />
          {this.modal()}
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  config: state.general.config,
  abiRollup: state.general.abiRollup,
  desWallet: state.general.desWallet,
});

export default connect(mapStateToProps, { handleSendWithdraw, handleGetExitRoot })(ModalWithdraw);
