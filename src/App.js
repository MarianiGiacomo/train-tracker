import React, { Component } from 'react';
import "antd/dist/antd.css";
import WebsocketClient from './services/mqttWwebsocket';
import VehicleTrackerRest from './components/VehicleTrackerRest';

class App extends Component {
  state = {
    websocket: new WebsocketClient(),
  };
  
  initialize = async () => {
    // TODO: move out wss related implementation to it's own component
    const { websocket } = this.state;
    await websocket.connect();
    // await websocket.subscribe('#');
    // await websocket.message();
  }

  componentDidMount = async () =>{
    await this.initialize(); 
  }

  render = () => {
   
    return (
     <VehicleTrackerRest />
    );
  }
}

export default App;
