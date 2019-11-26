import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';
import { handleSendWithdraw, handleGetExitRoot } from '../../../state/tx/actions';

class ModalWithdraw extends Component {
    constructor(props) {
      super(props);
      this.state = {
        num: -1,
        idFrom: -1,
        initModal: true,
      }
      this.idFromRef = React.createRef();
      this.numExitRootRef = React.createRef();
    }

    handleClick = async () => {
      const { wallet, config, abiRollup, password } = this.props;

      const idFrom = parseInt(this.state.idFrom);
      const numExitRoot = parseInt(this.state.num);
      const nodeEth = config.nodeEth;
      const addressSC = config.address;
      const operator = config.operator;
      this.props.toggleModalWithdraw();
      const res = await this.props.handleSendWithdraw(nodeEth, addressSC, wallet, password, abiRollup, operator, idFrom, numExitRoot);
      this.props.getInfoAccount();
      console.log(res);
    }

    getExitRoot = async () => {
      const num = await this.props.handleGetExitRoot(this.props.config.operator, this.idFromRef.current.value);
      this.setState({num, idFrom: this.idFromRef.current.value}, () => {this.toggleModalChange()});
    }

    exitRoot = () => {
      console.log(this.state.num)
      if(this.state.num === -1) {
        return "No Num Exit Root";
      } else {
        return this.state.num;
      }
    }
    
    modal = () => {
      if(this.state.initModal === true) {
        return <Modal open={this.props.modalWithdraw}>
                <Modal.Header>Withdraw</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Field>
                      <label>ID From</label>
                      <input type="text" ref={this.idFromRef}/>
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="blue" onClick={this.getExitRoot}>
                    <Icon name="arrow right"/>Next
                  </Button>
                  <Button color="red" onClick={this.props.toggleModalWithdraw}>
                    <Icon name="close"/>Close
                  </Button>
                </Modal.Actions>
              </Modal>
        } else {
          return <Modal open={this.props.modalWithdraw}>
                   <Modal.Header>Withdraw</Modal.Header>
                  <Modal.Content>
                    <Form>
                      <Form.Field>
                        <label>ID From</label>
                        <label>{this.state.idFrom}</label>
                      </Form.Field>
                      <Form.Field>
                        <label>Num Exit Root</label>
                        <label>{this.exitRoot()}</label>
                      </Form.Field>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="blue" onClick={this.handleClick}>
                      <Icon name="sign-out"/>Withdraw
                    </Button>
                    <Button color="blue" onClick={this.toggleModalChange}>
                      <Icon name="arrow left"/>Previous
                    </Button>
                    <Button color="red" onClick={this.props.toggleModalWithdraw}>
                      <Icon name="close"/>Close
                    </Button>
                  </Modal.Actions>
                </Modal>
      }
    }

    toggleModalChange = () => {this.setState(prev => ({ initModal: !prev.initModal }))}

    render() {
        return (
          <div>
           {this.modal()}
          </div>
        );
    }
}

const mapStateToProps = state => ({
  wallet: state.general.wallet,
  config: state.general.config,
  abiRollup: state.general.abiRollup,
  password: state.general.password,
  exitRoot: state.general.exitRoot,
})

export default connect(mapStateToProps, { handleSendWithdraw, handleGetExitRoot })(ModalWithdraw);