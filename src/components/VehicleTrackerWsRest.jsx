import React, { Component } from 'react';
import VehicleSelector from './VehicleSelector';
import WebSocket from '../services/mqttWwebsocket';
import { getFormattedDate } from '../utils/helpers';

class VehicleTrackerWsRest extends Component {
  state = { 
    selectedTrain: null,
    latitudeWS: 60.18471605086973,
    longitudeWS: 24.825582504272464,
    latitudeREST: 60.18471605086973,
    longitudeREST: 24.825582504272464,
    websocket: new WebSocket(),
  }

  initialize = async () => {
      const date = getFormattedDate(new Date());
      const { websocket, selectedTrain } = this.state;
      const topic = `${date}/${selectedTrain}`;

      await websocket.connect();
      websocket.subscribe(topic)
  }

  trackTrain = (message) => {
    if (!message) return;

    const { location: { coordinates } } = message || undefined;

    if (coordinates && coordinates.length > 0) {
      this.setState({
        longitudeWS: coordinates[0],
        latitudeWS: coordinates[1],
      });
    }
  }

  componentDidMount = async () => {
      await this.initialize();
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { websocket, selectedTrain } = this.state;

    if (prevState.selectedTrain !== selectedTrain) {
      websocket.close();
      await this.initialize();
    }

    websocket.message((message) => this.trackTrain(message));
  }

  componentWillUnmount = async () => {
    const { websocket } = this.state;
    websocket.close();
  }

  handleTrainSelection = (currentSelectedTrain) => {
    this.setState({
      selectedTrain: currentSelectedTrain
    })
  }

  render = ()  => {
    const {
      latitude, longitude, selectedTrain
    } = this.state;

    const testData = {
      ws: [
        {
          key: 1,
          field: 'Some field 1',
          value: 'Field value 1'
        },
        {
          key: 2,
          field: 'Some field 2',
          value: 'Field value 2'
        }
      ],
      rest: [
        {
          key: 1,
          field: 'Some field 1',
          value: 'Field value 1'
        },
        {
          key: 2,
          field: 'Some field 2',
          value: 'Field value 2'
        }
      ]
    }

    const mapStyle = {
      height:500, 
      width: '50%', 
      display: 'inline', 
      float: 'left',
      padding: '10px'
    }

    const { latitudeWS, longitudeWS, latitudeREST, longitudeREST } = this.state;
    return (
      <div>
        <VehicleSelector
        coordinatesWs={{ lat: latitudeWS, lng: longitudeWS }}
        coordinatesRest={{ lat: latitudeREST, lng: longitudeREST }}
        latitude={latitude}
        longitude={longitude}
        selectedTrain={selectedTrain}
        onChange={this.handleTrainSelection}
        connectionType={'Rest'}
        style={mapStyle}
        statistics={testData}
      />
    </div>
    );
  }
}

export default VehicleTrackerWsRest;