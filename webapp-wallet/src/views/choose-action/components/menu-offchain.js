import React,{Component} from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuOffchain extends Component {

    render() {
        return (
          <Button.Group vertical>
            <Link to={'/send'}>
              <Button size='massive' color='blue'>Send</Button>
            </Link>
          </Button.Group>
        );
    }
}

export default MenuOffchain;