import React,{Component} from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ButtonToActionsView extends Component {

    render() {
        return (
          <Menu secondary>
            <Menu.Menu position='right'>
              <Link to={'/actions'}>
                <Menu.Item
                  name="actions"
                >
                  <Icon name="reply"/>Back
                </Menu.Item>
              </Link>
            </Menu.Menu>
          </Menu>
        );
    }
}
export default ButtonToActionsView;