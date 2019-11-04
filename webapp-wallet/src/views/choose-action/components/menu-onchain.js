import React,{Component} from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MODE = {
  NORMAL: "normal",
  ADVANCE: "adv",
}

class MenuOnchain extends Component {

    state = {
      mode: MODE.NORMAL,
    }

    changeMode = (e, { name }) => {
      e.preventDefault();
      this.setState({mode: name});
    }

    render() {
        let menu;
        if(this.state.mode === MODE.NORMAL) {
          menu = <Container>
                  <Link to={'/actions/deposit'}>
                    <Button size='big'>Deposit</Button>
                  </Link>
                  <Link to={'/actions/withdraw'}>
                    <Button size='big'>Withdraw</Button>
                  </Link>
                </Container>
        } else if (this.state.mode === MODE.ADVANCE) {
          menu = <Container>
                    <Link to={'/actions/deposit'}>
                      <Button size='big'>Deposit</Button>
                    </Link>
                    <Link to={'/actions/depositontop'}>
                      <Button size='big'>Deposit On Top</Button>
                    </Link>
                    <Link to={'/actions/forcewithdraw'}>
                      <Button size='big'>Force Withdraw</Button>
                    </Link>
                    <Link to={'/actions/withdraw'}>
                      <Button size='big'>Withdraw</Button>
                    </Link>
                  </Container>
        } else {
          menu = "";
        }
        return (
          <Container>
            <Container textAlign="right">
              <Button.Group size='tiny'>
                <Button name={MODE.NORMAL} onClick={this.changeMode}>Normal Mode</Button>
                <Button.Or />
                <Button name={MODE.ADVANCE} onClick={this.changeMode}>Advance Mode</Button>
              </Button.Group>
            </Container>
            {menu}
          </Container>
        );
    }
}

export default MenuOnchain;