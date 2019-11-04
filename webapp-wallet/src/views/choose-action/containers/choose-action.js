import React,{Component} from 'react';
import { Header, Container } from 'semantic-ui-react';
import MenuActions from '../components/menu-actions';
import MenuOnchain from '../components/menu-onchain';
import MenuOffchain from '../components/menu-offchain';

class ChooseAction extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    e.preventDefault();
    this.setState({ activeItem: name })
  }

  render() {
    let menu;
    if(this.state.activeItem === "onchain") {
      menu = <MenuOnchain />
    } else if (this.state.activeItem === "offchain") {
      menu = <MenuOffchain />
    } else {
      menu = "";
    }
    return (
      <Container textAlign="center">
        <Header
        as='h1'
        content='Choose Action'
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '1em',
        }}>
          Choose Action
        </Header>
        <MenuActions 
          handleItemClick = {this.handleItemClick}
          activeItem = {this.state.activeItem}
        />
        {menu}
      </Container>
    )
  }
}
export default ChooseAction;