import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import WebsocketClient from './mqttWwebsocket';

class App extends Component {
  state = {
    websocket: new WebsocketClient(),
  };
  
  initialize = async () => {
    const { websocket } = this.state;
    await websocket.connect();
    await websocket.subscribe();
    await websocket.message();
  }

  componentDidMount = () =>{
    this.initialize();
  }

  render = () => {
    const center = {
      lat: 60.18471605086973,
      lng: 24.825582504272464,
    };
    const zoom = 13;
    // const url = 'https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png';
    return (
      <Map
        center={ center }
        zoom={ zoom }
        style={{height:500, width: '100%'}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker
          key="key"
          position={center}
        />
      </Map>
    );
  }
}

export default App;
