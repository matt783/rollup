import React, { Component } from 'react';
import { Table, Icon, Modal } from 'semantic-ui-react';

class ModalInfoId extends Component {

  getIdTokens = () => {
    try {
      if(this.props.txs !== undefined) {
        const txs = this.props.txs;
        return txs.map((key, index) => {
          return <Table.Row key={index}>
                  <Table.Cell>{key.idx}</Table.Cell>
                  <Table.Cell>{key.amount}</Table.Cell>
                </Table.Row>
        })
      } else {
          return <Table.Row>
                  <Table.Cell>0</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                </Table.Row>
      }
    }catch(err){
      return <Table.Row>
                  <Table.Cell>0</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                </Table.Row>
    }
  }

  render() {
    return (
      <Modal trigger={<Icon name='info' circular/>} closeIcon>
        <Modal.Header><Icon name="info"/></Modal.Header>
        <Modal.Content>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
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

export default ModalInfoId;