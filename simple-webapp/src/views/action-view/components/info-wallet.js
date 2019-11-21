import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, Container, Icon } from 'semantic-ui-react';
// import { getBalance } from '../../../state/general/actions';

class InfoWallet extends Component {

  state = {
    address: '0x0000000000000000000000000000000000000000',
    eth: 0,
    rollupTokens: 0,
  }

  componentDidMount() {
    try{
      if(this.props.wallet !== '' && this.state.address !== `0x${this.props.wallet.ethWallet.address}`){
        this.setState({address: `0x${this.props.wallet.ethWallet.address}`});
        // this.props.getBalance(this.props.wallet);
      }
    }catch(e){
        console.log(e);
    }
  }

  importedWallet = () => {
    if(this.state.address === '0x0000000000000000000000000000000000000000'){
      return <div>
              <Icon name="close" color="red"/>
              You must import a wallet!
            </div>
    } else {
      return this.state.address;
    }
  }
  render() {
    return (
      <Container>
          <Table padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>Rollup Wallet</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan='1' width='3'>
                Address:
              </Table.Cell>
              <Table.Cell colSpan='2'>
                {this.importedWallet()}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan='3'>
                Balance
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                ETH: 
              </Table.Cell>
              <Table.Cell>
                {this.state.eth} 
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button content="GET ETHER"/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                TOKENS: 
              </Table.Cell>
              <Table.Cell>
                {this.state.rollupTokens} 
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button content="GET TOKENS"/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan='3'>
                Approve tokens
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Address SC Tokens:
              </Table.Cell>
              <Table.Cell colSpan='2'>
                <Input type='text' placeholder='0x0000000000000000000000000000000000000000' fluid>
                  <input />
                  <Button content="APPROVE"/>
                </Input>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </Container>
    );
  }
}

export default /*connect(null, { getBalance })*/(InfoWallet);
