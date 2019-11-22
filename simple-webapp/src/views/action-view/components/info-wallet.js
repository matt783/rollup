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
        /*const filters = {
          ethAddr: `0x${this.props.wallet.ethWallet.address}`
        }
        const infoAccount = await this.props.apiOperator.getAccounts(filters);
        let amount = 0;
        let ids = [];
        for (let id in infoAccount.data) {
          ids.push(infoAccount.data[id].idx)
          amount = amount + parseInt(infoAccount.data[id].amount);
        }
        this.setState({rollupTokens: amount})*/
      }
    }catch(e){
        console.log(e);
    }
  }

  async componentDidUpdate() {
    try {
      if(this.props.wallet !== '') {
        const filters = {
          ethAddr: `0x${this.props.wallet.ethWallet.address}`
        }
        const infoAccount = await this.props.apiOperator.getAccounts(filters);
        let amount = 0;
        for (let id in infoAccount.data) {
          amount = amount + parseInt(infoAccount.data[id].amount);
        }
        this.setState({rollupTokens: amount});
      }
    }catch (err) {
        console.log(err);
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
          </Table.Body>
        </Table>
    </Container>
    );
  }
}

export default InfoWallet;
