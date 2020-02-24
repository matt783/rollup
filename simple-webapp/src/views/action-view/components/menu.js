/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import {
  Menu, Icon, Modal, Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHelp: false,
    };
  }

  toggleModalHelp = () => { this.setState((prev) => ({ modalHelp: !prev.modalHelp })); }

  render() {
    return (
      <Menu secondary size="large">
        <Menu.Menu position="right">
          <Menu.Item
            name="help"
            onClick={this.toggleModalHelp}>
            <Icon name="help" />
            Help
          </Menu.Item>
          <Link to="/">
            <Menu.Item
              name="initView">
              <Icon name="reply" />
              Back
            </Menu.Item>
          </Link>
        </Menu.Menu>
        <Modal open={this.state.modalHelp}>
          <Modal.Header>
            <Icon name="help circle" />
            Help
          </Modal.Header>
          <Modal.Content>
            <p>Transactions:</p>
            <p>
              <dd>
                -
                <b> Ethereum</b>
                : we need ether to be able to do them
              </dd>
            </p>
            <p><dd>  - Deposit: put tokens within the rollup network</dd></p>
            <p><dd>  - Exit: take tokens from the rollup network, but you must make a withdraw before</dd></p>
            <p>
              <dd>
                -
                <b> Rollup</b>
                : we need to have made a deposit and have tokens in the rollup network
              </dd>
            </p>
            <p><dd>  - Send: send tokens from one id to another</dd></p>
            <p><dd>  - Withdraw: prepare the tokens to be able to make an exit transaction</dd></p>
            <p>Tokens:</p>
            <p>
              <dd>- What are tokens for? They are the "coins" that you can use to interact with the rollup.</dd>
            </p>
            <p>
              <dd>
                - How can I get them? Sending a transaction with the "GET TOKENS" button.
                To send it, you need to have ETHER.
              </dd>
            </p>
            <p>
              <dd>
                - How can I get ether? By clicking the "GET ETHER" button and putting
                its ethereum address in the faucet.
              </dd>
            </p>
            <p>Approve:</p>
            <p>
              <dd>
                - What is the purpose of approving tokens? When you approve the tokens, you are giving permission
                to the ROLLUP contract to take the tokens indicated in the transaction when making a DEPOSIT.
              </dd>
            </p>
            <p>
              <dd>
                - How do I approve? Indicating the number of tokens you want to approve and clicking the "APPROVE" button.
                You will need ether, since you are sending a transaction.
              </dd>
            </p>
            <p>ID's:</p>
            <p>
              <dd>
                - What are the IDs? It is the identifier of each leaf in the rollup.
                Each time you make a deposit, a new ID will appear.
              </dd>
            </p>
            <p>
              <dd>
                - How should I use the ID? When you want to make a transfer
                you must choose the ID of the leaf from which you want to make the transfer.
                You must also indicate the ID of the receiving leaf.
              </dd>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.toggleModalHelp}>
              OK
            </Button>
          </Modal.Actions>
        </Modal>
      </Menu>
    );
  }
}

export default MenuBack;
