import React, { Component } from 'react';
import {getTrainLocation} from '../services/rest';
import VehicleSelector from './VehicleSelector';

class VehicleTrackerRest extends Component {
  state = {
    trainChanged: false,
    selectedTrain: null,
    updateIntervalId: null,
    latitude: 60.18471605086973,
    longitude: 24.825582504272464,
  };

  trackTrain = async (selectedTrain) => {
    await this.updateMap(selectedTrain);
    const updateIntervalId = setInterval( async () => {
      this.updateMap(selectedTrain)}, 15000);
    this.setState({ updateIntervalId: updateIntervalId });
  }

  updateMap = async (selectedTrain) => {
    const trainLocation = await getTrainLocation(selectedTrain)
    if (trainLocation.data[0] !== undefined){
      const coordinates = trainLocation.data[0].location.coordinates
      this.setState({
          latitude: coordinates[1],
          longitude: coordinates[0],
      }
    )}
  }

  handleTrainSelection = (currentSelectedTrain) => {
    this.setState({
      trainChanged: true,
      selectedTrain: currentSelectedTrain,
    });
  }

  componentDidUpdate = () => {
    const { trainChanged, selectedTrain, updateIntervalId } = this.state;
    if (trainChanged) {
      clearInterval(updateIntervalId);
      this.setState({ trainChanged: false })
      this.trackTrain(selectedTrain);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.updateIntervalId);
  }


  render = () => {
    const {
      latitude, longitude, selectedTrain
    } = this.state;

    return (
      <VehicleSelector
        coordinatesRest={{ lat: latitude, lng: longitude }}
        selectedTrain={selectedTrain}
        onChange={this.handleTrainSelection}
        style={{height:500, width: '100%'}}
      />
    );
  }
}

export default VehicleTrackerRest;
