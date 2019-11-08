import React,{Component} from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ButtonGroupInit extends Component {

    render() {
        return (
            <Button.Group vertical>
            <Button.Group>
              <Link to={'/createWallet'}>
                <Button size='massive' color='blue'>Create Wallet</Button>
              </Link>
              <Link to={'/config'}>
                <Button size='massive' color='blue'>Create Config</Button>
              </Link>
            </Button.Group>
            <Divider/>
            <Button size='massive' color='violet' onClick={this.props.toggleModal}>Import ...</Button>
            </Button.Group>
          );
    }
}

export default ButtonGroupInit;