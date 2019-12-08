import React, { Component } from 'react';
import VehicleSelector from './VehicleSelector';
import WebSocket from '../services/mqttWwebsocket';
import { getFormattedDate } from '../utils/helpers';
import {getTrainLocation} from '../services/rest';

const sizeOf = require('object-sizeof');

class VehicleTrackerWsRest extends Component {
  constructor(props){
    super(props)
    this.state = { 
      selectedTrain: null,
      latitudeWS: 60.18471605086973,
      longitudeWS: 24.825582504272464,
      latitudeREST: 60.18471605086973,
      longitudeREST: 24.825582504272464,
      websocket: new WebSocket(),
      subscribeTime: null,
      updateIntervalId: null,
      statData: { ws: [], rest: [] }
    }
  }

  initializeWs = async () => {
    const { websocket, selectedTrain } = this.state;
    if (selectedTrain) {
      const date = getFormattedDate(new Date());
      const topic = `${date}/${selectedTrain}`;
      const subscribeTime = websocket.subscribe(topic, (message, size) => this.trackTrainWS(message, size));
      this.setState({
        subscribeTime: subscribeTime
      });
    }
  }

  trackTrainWS = (message, size) => {
    const { subscribeTime } = this.state;
    const responseTimeMs = (new Date()).getTime() - subscribeTime;
    if (!message) return;
    const { location: { coordinates } } = message || undefined;
    if (coordinates && coordinates.length > 0) {
      const statData = this.updateStatDataWs(responseTimeMs, size)
      this.setState({
        longitudeWS: coordinates[0],
        latitudeWS: coordinates[1],
        statData: statData
      });
    }
  }

  updateStatDataWs = (responseTimeMs, size) => {
    const { statData } = this.state;
    if (!statData.ws.length) {
      statData.ws.push({
        key: 1,
        field: 'Response time',
        value: responseTimeMs + ' ms'
      })      
      statData.ws.push({
        key: 2,
        field: 'Packet size',
        value: size + ' bytes'
      })
    } else {
      statData.ws.push({
        key: statData.ws.length + 1,
        field: 'Packet size',
        value: size + ' bytes'
      })
    }
    return statData;   
  }

  trackTrainREST = async (selectedTrain) => {
    await this.updateRest(selectedTrain);
    const updateIntervalId = setInterval( async () => {
      this.updateRest(selectedTrain)
    }, 15000);
    this.setState({ updateIntervalId: updateIntervalId });
  }

  updateRest = async (selectedTrain) => {
    const sendTimeREST = (new Date()).getTime();
    const trainLocation = await getTrainLocation(selectedTrain)
    if (trainLocation.data[0] !== undefined){
      const coordinates = trainLocation.data[0].location.coordinates;
      const statData = this.updateStatDataRest(sendTimeREST, trainLocation)
      this.setState({
          latitudeREST: coordinates[1],
          longitudeREST: coordinates[0],
          statData: statData
        }
      )}
  }

  updateStatDataRest = (sendTimeREST, trainLocation) => {
    const { statData } = this.state;
    const receiveTimeREST = (new Date()).getTime();
    const responseTimeMs = receiveTimeREST - sendTimeREST;
    const key = statData.rest.length + 1
    statData.rest.push({
      key: key,
      field: 'Response time',
      value: responseTimeMs + ' ms'
    })      
    statData.rest.push({
      key: key + 1,
      field: 'Packet size',
      value: sizeOf(trainLocation) + ' bytes'
    })
    return statData;
  }

  componentDidMount = async () => {
    const { websocket } = this.state;
    await websocket.connect();
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { websocket, selectedTrain, updateIntervalId } = this.state;
    if (prevState.selectedTrain !== selectedTrain) {
      clearInterval(updateIntervalId);
      this.setState({ statData: { ws: [], rest: [] } });
      this.trackTrainREST(selectedTrain);
      websocket.close();
      await websocket.connect();
      this.initializeWs();
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
      latitude, 
      longitude, 
      selectedTrain, 
      statData
    } = this.state;

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
        style={{height:500, width: '100%'}}
        statistics={statData}
      />
    </div>
    );
  }
}

export default VehicleTrackerWsRest;