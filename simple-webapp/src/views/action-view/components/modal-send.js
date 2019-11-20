import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Icon} from 'semantic-ui-react';
import { handleSendSend } from '../../../state/tx/actions';

class ModalSend extends Component {

    chooseSend = () => {
      if(this.props.activeItem === "send0") {
        return <Form.Field>
                <label>ID To</label>
                <input type="text" disabled ref={this.idToRef} value="0"/>
              </Form.Field>
      }else{
        return <Form.Field>
                <label>ID To</label>
                <input type="text" ref={this.idToRef}/>
              </Form.Field>
      }
    }

    constructor(props) {
      super(props);
      this.idToRef = React.createRef();
      this.amountRef = React.createRef();
      this.passwordRef = React.createRef();
      this.tokenIdRef = React.createRef();
      this.feeRef = React.createRef();
      this.idFromRef = React.createRef();
    }
  
    handleClick = async () => {
      const { wallet, config } = this.props;
  
      const idTo = parseInt(this.idToRef.current.value);
      const amount = parseInt(this.amountRef.current.value);
      const password = this.passwordRef.current.value;
      const tokenId = parseInt(this.tokenIdRef.current.value);
      const fee = parseInt(this.feeRef.current.value);
      const operator = config.operator;
      const idFrom = parseInt(this.idFromRef.current.value);
      console.log(idTo);
      const res = await this.props.handleSendSend(operator, idTo, amount, wallet, password, tokenId, fee, idFrom);
      console.log(res);
    }

    render() {
        return (
          <Modal open={this.props.modalSend}>
            <Modal.Header>Send</Modal.Header>
            <Modal.Content >
              <Form>
                {this.chooseSend()}
                <Form.Field>
                  <label>ID From</label>
                  <input type="text" ref={this.idFromRef}/>
                </Form.Field>
                <Form.Field>
                  <label>Amount</label>
                  <input type="text" ref={this.amountRef}/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" ref={this.passwordRef}/>
                </Form.Field>
                <Form.Field>
                  <label>Token ID</label>
                  <input type="text" ref={this.tokenIdRef}/>
                </Form.Field>
                <Form.Field>
                  <label>Fee</label>
                  <input type="text" ref={this.feeRef}/>
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="blue" onClick={this.handleClick}>
                <Icon name="arrow right"/>Send
              </Button>
              <Button color="red" onClick={this.props.toggleModalSend}>
                <Icon name="close"/>Close
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}

const mapStateToProps = state => ({
  wallet: state.general.wallet,
  config: state.general.config
})

export default connect(mapStateToProps, { handleSendSend })(ModalSend);