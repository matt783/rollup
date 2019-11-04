import React,{Component} from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuOffchain extends Component {

    render() {
        return (
          <Container>
            <Link to={'/actions/send'}>
              <Button size='big'>Send</Button>
            </Link>
            <Link to={'/actions/send'}>
              <Button size='big'>Withdraw</Button>
            </Link>
          </Container>
        );
    }
}

export default MenuOffchain;