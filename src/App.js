import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import WebsocketClient from './services/mqttWwebsocket';
import VehicleTrackerRest from './components/VehicleTrackerRest';

import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    websocket: new WebsocketClient(),
    selectedMenu: 'rest',
  };
  
  initialize = async () => {
    // TODO: move out wss related implementation to it's own component
    const { websocket } = this.state;
    await websocket.connect();
    // await websocket.subscribe('#');
    // await websocket.message();
  }

  componentDidMount = async () => {
    await this.initialize(); 
  }

  onMenuItemClick = (e) => {
    this.setState({
      selectedMenu: e.key,
    });
  }

  renderContent = () => {
    const { selectedMenu } = this.state;

    switch (selectedMenu) {
      case 'rest':
        return <VehicleTrackerRest />
      case 'wss': 
        // TODO: call wss vehicle tracker component here 
        // when it's implemented
        return ('WSS vehicle tracker')
      default: 
        return <VehicleTrackerRest />
    }
  }

  render = () => {
   
    return ( 
     <Layout>
      <Header className="vehicle-tracker-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['rest']}
          className="vehicle-tracker-menu"
          onClick={this.onMenuItemClick}
        >
          <Menu.Item key="rest">REST</Menu.Item>
          <Menu.Item key="wss">WebSocket</Menu.Item>
        </Menu>
      </Header>
      <Content className="vehicle-tracker-content-wrapper">
        <div className="vehicle-tracker-content">
          {this.renderContent()}
        </div>
      </Content>
      <Footer className="vehicle-tracker-footer">
        Vehicle tracker ©2019
      </Footer>
    </Layout>
    );
  }
}

export default App;