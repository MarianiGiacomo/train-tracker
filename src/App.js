import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import VehicleTrackerRest from './components/VehicleTrackerRest';
import VehicleTrackerWss from './components/VehicleTrackerWss';
import VehicleTrackerWsRest from './components/VehicleTrackerWsRest';

import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    selectedMenu: 'wss',
  };

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
        return <VehicleTrackerWss />
      case 'wss-rest':
        return <VehicleTrackerWsRest />
      default: 
        return <VehicleTrackerWss />
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
          defaultSelectedKeys={['wss']}
          className="vehicle-tracker-menu"
          onClick={this.onMenuItemClick}
        >
          <Menu.Item key="wss">WebSocket</Menu.Item>
          <Menu.Item key="rest">REST</Menu.Item>
          <Menu.Item key="wss-rest">WS & REST</Menu.Item>
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