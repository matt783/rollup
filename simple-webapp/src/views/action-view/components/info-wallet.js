import React, { Component } from 'react';
import { Table, Button, Input, Container, Icon } from 'semantic-ui-react';

class InfoWallet extends Component {

  constructor(props){
    super(props);
    this.state = {
      address: '0x0000000000000000000000000000000000000000',
      eth: 0,
      rollupTokens: 0,
    };
    this.addressTokensRef = React.createRef();
    this.amountTokensRef = React.createRef();
  }
  
  async componentDidMount() {
    try{
      if(this.props.wallet !== '' && this.state.address !== `0x${this.props.wallet.ethWallet.address}`){
        this.setState({address: `0x${this.props.wallet.ethWallet.address}`});
      }
    }catch(e){
        console.log(e);
    }
  }

  handleClick = () => {
    this.props.handleClickApprove(this.addressTokensRef.current.value, this.amountTokensRef.current.value);
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

  isLoadingTokens = () => {
    /*if(this.props.isLoadingInfoAccount === false) {
      return this.props.tokens;
    } else {
      return <Icon name='circle notched' loading />
    }*/
    return this.props.tokens;
  }

  isLoadingEthers = () => {
    /*if(this.props.isLoadingInfoAccount === false) {
      return this.props.balance;
    } else {
      return <Icon name='circle notched' loading />
    }*/
    return this.props.balance;
  }

  render() {
    return (     
        <Container>
          <Table padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='4'>Rollup Wallet</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan='1' width='3'>
                Address:
              </Table.Cell>
              <Table.Cell colSpan='3'>
                {this.importedWallet()}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Balance
              </Table.Cell>
              <Table.Cell>
                Account
              </Table.Cell>
              <Table.Cell>
                Rollup Network
              </Table.Cell>
              <Table.Cell>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                ETH: 
              </Table.Cell>
              <Table.Cell colSpan='3'>
                {this.isLoadingEthers()}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                TOKENS: 
              </Table.Cell>
              <Table.Cell>
                {this.isLoadingTokens()} 
              </Table.Cell>
              <Table.Cell>
                {this.state.rollupTokens} 
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button content="GET TOKENS" onClick={this.props.handleClickGetTokens}/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan='4'>
                Approve tokens
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Amount Tokens:
              </Table.Cell>
              <Table.Cell colSpan='3'>
                <input type="text" ref={this.amountTokensRef}/>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Address SC Tokens:
              </Table.Cell>
              <Table.Cell colSpan='3'>
                <input type='text' placeholder='0x0000000000000000000000000000000000000000' 
                 ref={this.addressTokensRef} size='40'/>
                  <Button content="APPROVE" onClick={this.handleClick}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </Container>
    );
  }
}

export default InfoWallet;
