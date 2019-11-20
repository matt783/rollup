import React,{Component} from 'react';
import { Table, Button } from 'semantic-ui-react';

class MenuActions extends Component {

    render() {
        return (
            <Table padded textAlign='center' celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    ONCHAIN
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    OFFCHAIN
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Button.Group widths='2'>
                      <Button content="Deposit" name="deposit" onClick={this.props.handleItemClick}/>
                      <Button content="Withdraw" name="withdraw" onClick={this.props.handleItemClick}/>
                    </Button.Group>
                  </Table.Cell>
                  <Table.Cell>
                    <Button.Group widths='2'>
                      <Button content="Send" name="send" onClick={this.props.handleItemClick}/>
                      <Button content="Send 0" name="send0" onClick={this.props.handleItemClick}/>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
        );
    }
}
export default MenuActions;