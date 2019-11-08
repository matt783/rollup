import React,{Component} from 'react';
import { Menu} from 'semantic-ui-react';

class MenuActions extends Component {

    render() {
        return (
            <Menu widths={2} color="violet">
                <Menu.Item
                    name='onchain'
                    active={this.props.activeItem === 'onchain'}
                    onClick={this.props.handleItemClick}
                />
                <Menu.Item
                    name='offchain'
                    active={this.props.activeItem === 'offchain'}
                    onClick={this.props.handleItemClick}
                />
            </Menu>
        );
    }
}
export default MenuActions;