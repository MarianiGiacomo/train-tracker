import React, { Component } from 'react';
import VehicleSelector from './VehicleSelector';
import { getFormattedDate } from '../utils/helpers';
import WebSocket from '../services/mqttWwebsocket';

class VehicleTrackerWss extends Component {
  constructor(props){
    super(props);
    const webSocket = new WebSocket();
    webSocket.connect();
    this.state = {
      selectedTrain: null,
      latitude: 60.18471605086973,
      longitude: 24.825582504272464,
      webSocket: webSocket
    }
  }

  initialize = async () => {
    const date = getFormattedDate(new Date()); 
    const { webSocket, selectedTrain } = this.state;
    const topic = `${date}/${selectedTrain}`;
    webSocket.subscribe(topic, (message, size) => this.trackTrain(message, size));
  }

  componentWillUnmount = async () => {
    const { webSocket, selectedTrain } = this.state;
    if(selectedTrain) {
      const date = getFormattedDate(new Date()); 
      const topic = `${date}/${selectedTrain}`;
      webSocket.unsubscribe(topic);
    }
    webSocket.close();
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

  componentDidMount = async () => {
    const { webSocket } = this.state
    webSocket.message((message) => this.trackTrain(message));
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { webSocket, selectedTrain } = this.state;
    if (prevState.selectedTrain !== selectedTrain) {
      if(prevState.selectedTrain) {
        const date = getFormattedDate(new Date()); 
        const topic = `${date}/${prevState.selectedTrain}`;
        webSocket.unsubscribe(topic);
      }
      this.initialize();
    }
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
