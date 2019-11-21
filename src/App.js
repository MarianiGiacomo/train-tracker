import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import VehicleTrackerRest from './components/VehicleTrackerRest';
import VehicleTrackerWss from './components/VehicleTrackerWss';

import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    selectedMenu: 'rest',
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
          <Menu.Item key="wss">WebSocket</Menu.Item>
          <Menu.Item key="rest">REST</Menu.Item>
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