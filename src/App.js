import React, { Component } from 'react';
import { Layout, Menu} from 'antd';
import sizeMe from 'react-sizeme';

import VehicleTrackerRest from './components/VehicleTrackerRest';
import VehicleTrackerWss from './components/VehicleTrackerWss';
import VehicleTrackerWsRest from './components/VehicleTrackerWsRest';

import './App.css';

const { Header, Content, Footer } = Layout;
const menuStyle = {
  height: 'auto',
  position: 'inherit'
}

const layoutStyle = {
  display: 'contents'
}

const contentStyle = {
  padding: 10
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMenu: 'wss',
      size: this.props.size
    };
  }

  menuMode = (size) => {
    if(size.width < 400) {
      return 'inline'
    } 
    return 'horizontal';
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
        return <VehicleTrackerWss />
      case 'wss-rest':
        return <VehicleTrackerWsRest />
      default: 
        return <VehicleTrackerWss />
    }
  }

  render = () => {
    const mode = this.menuMode(this.state.size)
    return ( 
     <Layout style={layoutStyle}>
      <Header className="vehicle-tracker-header" style={menuStyle} >
        <Menu
          theme="dark"
          mode={mode}
          defaultSelectedKeys={['wss']}
          className="vehicle-tracker-menu"
          onClick={this.onMenuItemClick}
        >
          <Menu.Item key="wss">WebSocket</Menu.Item>
          <Menu.Item key="rest">REST</Menu.Item>
          <Menu.Item key="wss-rest">WS & REST</Menu.Item>
        </Menu>
      </Header>
      <Content className="vehicle-tracker-content-wrapper" style={contentStyle}>
        <div className="vehicle-tracker-content" style={contentStyle}>
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

export default sizeMe()(App);