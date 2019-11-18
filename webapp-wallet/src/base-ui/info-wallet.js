import React,{Component} from 'react';
import { Label, Container } from 'semantic-ui-react';

class InfoWallet extends Component {

    state = {
      address: '',
    }

    componentDidMount() {
      try{
        if(this.props.wallet !== ''){
          this.changeAddress(this.props.wallet.ethWallet.address);
        }
      }catch(e){
          console.log(e);
      }
    }

    componentDidUpdate() {
      if(this.props.wallet !== ''){
        try{
          if(this.props.wallet.ethWallet.address !== this.state.address){
              this.changeAddress(this.props.wallet.ethWallet.address);
          }
        }catch(e){
          console.log(e);
        }
      }
    }

    changeAddress = (address) => {
      this.setState({address});
    }

    checkAccounts = () => {
      if(this.props.account !== '0x'+this.state.address) {
        return (
          <Label basic color='red' pointing='left'>
            It is different than Metamask!
          </Label>);
      }
    }

    render() {
        return (
          <Container textAlign='left'>
            <Label>
              Rollup Wallet:
              <Label.Detail>0x{this.state.address}</Label.Detail>
            </Label>
            {this.checkAccounts()}
          </Container>
        );
    }
}
export default InfoWallet;