import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Icon, Modal, Button,
} from 'semantic-ui-react';

const web3 = require('web3');

class ModalInfoIdExits extends Component {
  static propTypes = {
    txsExits: PropTypes.array,
  };

  static defaultProps = {
    txsExits: [{ idx: 0, batch: 0, amount: 0 }],
  };

  getIdTokens = () => {
    try {
      const { txsExits } = this.props;
      return txsExits.map((key, index) => {
        return (
          <Table.Row key={index}>
            <Table.Cell>{key.idx}</Table.Cell>
            <Table.Cell>{key.batch}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(key.amount, 'ether')}</Table.Cell>
          </Table.Row>
        );
      });
    } catch (err) {
      return (
        <Table.Row>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>0</Table.Cell>
        </Table.Row>
      );
    }
  }

  render() {
    return (
      <Modal trigger={<Button icon="info" circular size="mini" />} closeIcon>
        <Modal.Header><Icon name="info" /></Modal.Header>
        <Modal.Content>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>BATCH</Table.HeaderCell>
                <Table.HeaderCell>TOKENS</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.getIdTokens()}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalInfoIdExits;