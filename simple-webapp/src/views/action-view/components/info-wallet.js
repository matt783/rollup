import React, { Component } from 'react';
import { Table, Button, Container, Icon, Popup, Grid } from 'semantic-ui-react';

// tokens address: "0x7dFc5b5D172db3941f669770f9993b1df250B560"

class InfoWallet extends Component {

  constructor(props){
    super(props);
    this.state = {
      address: '0x0000000000000000000000000000000000000000',
      loading: false,
      firstLoading: true,
      rollupTokens: 0,
    };
    this.addressTokensRef = React.createRef();
    this.amountTokensRef = React.createRef();
    this.getTokensRef = React.createRef();
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

  componentDidUpdate() {
    if(this.props.isLoadingInfoAccount === true && this.state.firstLoading === true && this.state.loading === false){
      this.setState({loading: true});
    } else if (this.props.isLoadingInfoAccount === false && this.state.firstLoading === true && this.state.loading === true){
      this.setState({firstLoading: false, loading: false});
    }
  }

  handleClick = () => {
    this.props.handleClickApprove(this.addressTokensRef.current.value, this.amountTokensRef.current.value);
  }

  handleClickTokens = () => {
    this.props.handleClickGetTokens(this.getTokensRef.current.value);
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

  reload = () => {
    this.setState({firstLoading: true});
    this.props.getInfoAccount();
  }

  isLoadingTokens = () => {
    if(this.state.loading === false) {
      return this.props.tokens;
    } else {
      return <Icon name='circle notched' loading />
    }
  }

  isLoadingTokensR = () => {
    if(this.state.loading === false) {
      return this.props.tokensR;
    } else {
      return <Icon name='circle notched' loading />
    }
  }

  isLoadingEthers = () => {
    if(this.state.loading === false) {
      return this.props.balance;
    } else {
      return <Icon name='circle notched' loading />
    }
  }

  getIdTokens = () => {
    if(this.props.txs.data !== undefined) {
      const txs = this.props.txs;
      let txsArray = [];
      const numTx = txs.data[txs.data.length-1].idx;
      for(let i=1; i <= numTx; i++){
        txsArray.push(txs.data.find(tx => tx.idx === i));
      }
      return txsArray.map((key, index) => {
        return <Table.Row key={index}>
                <Table.Cell colSpan='2'/>
                <Table.Cell colSpan='2'>ID: {key.idx} TOKENS: {key.amount}</Table.Cell>
               </Table.Row>
      })
    }
  }

  render() {
    return (     
        <Container>
          <Table padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>Rollup Wallet</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <Button onClick={this.reload}><Icon name="sync"/>Reload</Button>
                </Table.HeaderCell>
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
                TOKENS: 
              </Table.Cell>
              <Table.Cell>
                {this.isLoadingTokens()} 
              </Table.Cell>
              <Table.Cell>
                {this.isLoadingTokensR()}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <input type="text" ref={this.getTokensRef}/>
                <Button content="GET TOKENS" onClick={this.handleClickTokens}/>
              </Table.Cell>
            </Table.Row>
             {this.getIdTokens()}
            <Table.Row>
              <Table.Cell>
                ETH: 
              </Table.Cell>
              <Table.Cell colSpan='3'>
                {this.isLoadingEthers()}
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
