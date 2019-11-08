import React, { Component } from 'react';
import { Button, Container, Form, Menu, Icon} from 'semantic-ui-react';
import { checkconfig, createConfig } from '../../../actions/config-actions';
import { Link } from 'react-router-dom';

class Config extends Component {
  constructor(props) {
    super(props);
    this.configFileRef = React.createRef();
    this.configNameRef = React.createRef();
    // this.walletFile = React.createRef();
    this.operatorUrl = React.createRef();
    this.addressSC = React.createRef();
    this.nodeEth = React.createRef();
    // this.abi = React.createRef();
  }

  handleClick = () => {
    checkconfig(this.configFileRef.current.files[0]);
  }
  handleClick2 = () => {
    const nameFile = this.configNameRef.current.value;
    const operator = this.operatorUrl.current.value;
    const address = this.addressSC.current.value;
    const nodeEth = this.nodeEth.current.value;
    createConfig(nameFile, operator, address, nodeEth);
  }

  render() {
    return(
      <Container>
        <Menu secondary>
          <Menu.Menu position='right'>
            <Link to={'/'}>
              <Menu.Item
                name="initView"
              >
                <Icon name="reply"/>Back
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
        <h1>Config</h1>
        <h3>Check Config</h3>
        <Button onClick={this.handleClick}>Check</Button>
        <input type="file" ref={this.configFileRef}/>
        <h3>Create</h3>
        <Form>
          <Form.Field>
            <label>File Name</label>
            <input type="text" ref={this.configNameRef}/>
          </Form.Field>
          <Form.Field>
            <label>Operator URL</label>
            <input type="text" ref={this.operatorUrl} />
          </Form.Field>
          <Form.Field>
            <label>Address Rollup SC</label>
            <input type="text" ref={this.addressSC} />
          </Form.Field>
          <Form.Field>
            <label>Node Ethereum URL</label>
            <input type="text" ref={this.nodeEth} />
          </Form.Field>
          <Button type="submit" onClick={this.handleClick2}>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default Config;