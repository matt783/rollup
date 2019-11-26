import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';

import { handleSendDeposit } from '../../../state/tx/actions';

class ModalDeposit extends Component {

    constructor(props) {
      super(props);
      this.amountRef = React.createRef();
      this.tokenIdRef = React.createRef();
    }

    handeClick = async () => {
      try {
        const { wallet, config, abiRollup, password } = this.props;
        const amount = parseInt(this.amountRef.current.value);
        const tokenId = parseInt(this.tokenIdRef.current.value);
        const nodeEth = config.nodeEth;
        const addressSC = config.address;
        this.props.toggleModalDeposit();
        const res = await this.props.handleSendDeposit(nodeEth, addressSC, amount, tokenId, wallet, password, undefined, abiRollup);
        this.props.getInfoAccount();
        console.log(res);
      } catch(error){
        console.log(error.message);
      }
    }

    render() {
        return (
          <Modal open={this.props.modalDeposit}>
            <Modal.Header>Deposit</Modal.Header>
            <Modal.Content >
              <Form>
                <Form.Field>
                  <label>Amount</label>
                  <input type="text" ref={this.amountRef}/>
                </Form.Field>
                <Form.Field>
                  <label>Token ID</label>
                  <input type="text" ref={this.tokenIdRef}/>
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.handeClick}>
                <Icon name="sign-in"/>Deposit
              </Button>
              <Button color="red" onClick={this.props.toggleModalDeposit}>
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
  password: state.general.password
})

export default connect(mapStateToProps, { handleSendDeposit })(ModalDeposit);