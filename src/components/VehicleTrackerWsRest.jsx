import React, { Component } from 'react';
import VehicleSelector from './VehicleSelector';
import WebSocket from '../services/mqttWwebsocket';
import { getFormattedDate } from '../utils/helpers';
import {getTrainLocation} from '../services/rest';

class VehicleTrackerWsRest extends Component {
  state = { 
    selectedTrain: null,
    latitudeWS: 60.18471605086973,
    longitudeWS: 24.825582504272464,
    latitudeREST: 60.18471605086973,
    longitudeREST: 24.825582504272464,
    packetSizeREST: null,
    packetSizeWS: null,
    responseTimeREST: null,
    responseTimeWS: null,
    sendDateWS: null,
    websocket: new WebSocket(),
    updateIntervalId: null,
  }

  initialize = async () => {
      const date = getFormattedDate(new Date());
      const { websocket, selectedTrain } = this.state;
      const topic = `${date}/${selectedTrain}`;

      var sendDateWS = (new Date()).getTime();
      await websocket.connect();
      websocket.subscribe(topic)
      this.setState({
        sendDateWS: sendDateWS
      });
  }

  trackTrainWS = (message, size) => {
    if (!message) return;
    const { sendDateWS } = this.state;
    const { location: { coordinates } } = message || undefined;

    if (coordinates && coordinates.length > 0) {
      var receiveDateWS = (new Date()).getTime();
      var responseTimeMs = receiveDateWS - sendDateWS;
      this.setState({
        longitudeWS: coordinates[0],
        latitudeWS: coordinates[1],
        responseTimeWS: responseTimeMs,
        packetSizeWS: size,
        sendDateWS: (new Date()).getTime()
      });
    }
  }

  trackTrainREST = async (selectedTrain) => {
    await this.updateMap(selectedTrain);
    const updateIntervalId = setInterval( async () => {
      this.updateMap(selectedTrain)}, 15000);
    this.setState({ updateIntervalId: updateIntervalId });
  }

  updateMap = async (selectedTrain) => {
    var sizeof = require('object-sizeof')
    var sendDateREST = (new Date()).getTime();
    const trainLocation = await getTrainLocation(selectedTrain)
    if (trainLocation.data[0] !== undefined){
      var receiveDateREST = (new Date()).getTime();
      var responseTimeMs = receiveDateREST - sendDateREST;
      const coordinates = trainLocation.data[0].location.coordinates
      this.setState({
          latitudeREST: coordinates[1],
          longitudeREST: coordinates[0],
          responseTimeREST: responseTimeMs,
          packetSizeREST: sizeof(trainLocation)
        }
      )}
  }
  componentDidMount = async () => {
      await this.initialize();
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { websocket, selectedTrain, updateIntervalId } = this.state;

    if (prevState.selectedTrain !== selectedTrain) {
      clearInterval(updateIntervalId);
      this.trackTrainREST(selectedTrain);
      websocket.close();
      await this.initialize();
      websocket.message((message, size) => this.trackTrainWS(message, size));
    }
  }

  componentWillUnmount = async () => {
    const { websocket } = this.state;
    websocket.close();

    clearInterval(this.state.updateIntervalId);
  }

  handleTrainSelection = (currentSelectedTrain) => {
    this.setState({
      selectedTrain: currentSelectedTrain
    })
  }

  render = ()  => {
    const {
      latitude, longitude, selectedTrain, responseTimeREST, responseTimeWS, packetSizeWS, packetSizeREST
    } = this.state;

    const testData = {
      ws: [
        {
          key: 1,
          field: 'Response time',
          value: (responseTimeWS ? responseTimeWS + ' ms' : '')
        },
        {
          key: 2,
          field: 'Packet size',
          value: packetSizeWS ? packetSizeWS + ' bytes' : ''
        }
      ],
      rest: [
        {
          key: 1,
          field: 'Response time',
          value: responseTimeREST ? responseTimeREST + ' ms' : ''
        },
        {
          key: 2,
          field: 'Packet size',
          value: packetSizeREST ? packetSizeREST + ' bytes' : ''
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