import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';

class HeaderApp extends Component {
  render() {
    return (
      <Header>
        <Menu>
          <Link to={'/loadfiles'}>
            <Menu.Item
              name="loadfiles"
            >
              Load Files
            </Menu.Item>
          </Link>
          <Link to={'/deposit'}>
            <Menu.Item
              name="deposit"
            >
              Deposit
            </Menu.Item>
          </Link>
          <Link to={'/depositontop'}>
            <Menu.Item
              name="depositontop"
            >
              DepositOnTop
            </Menu.Item>
          </Link>
          <Link to={'/send'}>
            <Menu.Item
              name="send"
            >
              Send
            </Menu.Item>
          </Link>
          <Link to={'/forcewithdraw'}>
            <Menu.Item
              name="forcewithdraw"
            >
              Force Withdraw
            </Menu.Item>
          </Link>
          <Link to={'/withdraw'}>
            <Menu.Item
              name="withdraw"
            >
              Withdraw
            </Menu.Item>
          </Link>
          <Menu.Menu position='right'>
            <Link to={'/createWallet'}>
              <Menu.Item
                name="createWallet"
              >
                Create Wallet
              </Menu.Item>
            </Link>
            <Link to={'/config'}>
              <Menu.Item
                name="config"
              >
                Create Config
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
      </Header>
    );
  }  
}

export default HeaderApp;