import React,{Component} from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MODE = {
  NORMAL = 
}

class MenuOnchain extends Component {

    state = {
      mode = "normal",
    }

    changeMode = () => {

    }

    render() {
        return (
          <Container>
            <Container textAlign="right">
              <Button.Group size='tiny'>
                <Button onClick>Normal Mode</Button>
                <Button.Or />
                <Button>Advance Mode</Button>
              </Button.Group>
            </Container>
            <Link to={'/deposit'}>
              <Button size='big'>Deposit</Button>
            </Link>
            <Link to={'/withdraw'}>
              <Button size='big'>Withdraw</Button>
            </Link>
          </Container>
        );
    }
}

export default MenuOnchain;