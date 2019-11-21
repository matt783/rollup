import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';
import { handleSendWithdraw } from '../../../state/tx/actions';

class ModalWithdraw extends Component {
    constructor(props) {
      super(props);
      this.amountRef = React.createRef();
      this.idFromRef = React.createRef();
      this.numExitRootRef = React.createRef();
    }

    handleClick = async () => {
      const { wallet, config, abiRollup, password } = this.props;
  
      const amount = parseInt(this.amountRef.current.value);
      const idFrom = parseInt(this.idFromRef.current.value);
      const numExitRoot = parseInt(this.numExitRootRef.current.value);
      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const operator = config.operator;
      this.props.toggleModalWithdraw();
      const res = await this.props.handleSendWithdraw(nodeEth, addressSC, amount, wallet, password, abiRollup, operator, idFrom, numExitRoot);
      console.log(res);
    }

    render() {
        return (
          <Modal open={this.props.modalWithdraw}>
            <Modal.Header>Withdraw</Modal.Header>
            <Modal.Content >
              <Form>
                <Form.Field>
                  <label>Amount</label>
                  <input type="text" ref={this.amountRef}/>
                </Form.Field>
                <Form.Field>
                  <label>ID From</label>
                  <input type="text" ref={this.idFromRef}/>
                </Form.Field>
                <Form.Field>
                  <label>Num Exit Root</label>
                  <input type="text" ref={this.numExitRootRef}/>
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.handleClick}>
                <Icon name="download"/>Withdraw
              </Button>
              <Button color="red" onClick={this.props.toggleModalWithdraw}>
                <Icon name="close"/>Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}

const mapStateToProps = state => ({
  wallet: state.general.wallet,
  config: state.general.config,
  abiRollup: state.general.abiRollup,
  password: state.general.password,
})

export default connect(mapStateToProps, { handleSendWithdraw })(ModalWithdraw);