import React, { Component } from 'react';
import VehicleSelector from './VehicleSelector';

import WebSocket from '../services/mqttWwebsocket';
import { getFormattedDate } from '../utils/helpers';

class VehicleTrackerWss extends Component {
  state = {
    selectedTrain: 28,
    latitude: 60.18471605086973,
    longitude: 24.825582504272464,
    websocket: new WebSocket(),
  };

  initialize = async () => {
    const date = getFormattedDate(new Date()); 
    const { websocket, selectedTrain } = this.state;
    const topic = `${date}/${selectedTrain}`;

    await websocket.connect();
    websocket.subscribe(topic)
  }

  componentDidMount = async () => {
    await this.initialize();
  }

  componentWillUnmount = async () => {
    const { websocket } = this.state;
    websocket.close();
  }

  trackTrain = (message) => {
    if (!message) return;
    
    const { location: { coordinates } } = message || undefined;
    
    if (coordinates && coordinates.length > 0) {
      this.setState({
        longitude: coordinates[0],
        latitude: coordinates[1],
      });
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { websocket, selectedTrain } = this.state;

    if (prevState.selectedTrain !== selectedTrain) {
        websocket.close();
        await this.initialize();
    }

    websocket.message((message) => this.trackTrain(message));
  }

  handleTrainSelection = (currentSelectedTrain) => {
    this.setState({
      selectedTrain: currentSelectedTrain,
    });
  }

  render = () => {
    const { 
      latitude, longitude, selectedTrain 
    } = this.state;
    
    return (
      <VehicleSelector 
        coordinatesWs={{ lat: latitude, lng: longitude }}
        selectedTrain={selectedTrain}
        onChange={this.handleTrainSelection}
        style={{height:500, width: '100%'}}
      />
    );
  }
}

export default VehicleTrackerWss;
