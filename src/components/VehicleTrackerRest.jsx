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
    console.log('updateIntervalId', updateIntervalId)
    this.setState({ updateIntervalId: updateIntervalId });
  }

  updateMap = async (selectedTrain) => {
    const trainLocation = await getTrainLocation(selectedTrain)
    console.log('selectedTrain', selectedTrain)
    console.log('location', trainLocation[0])
    if (trainLocation[0] !== undefined){
      const coordinates = trainLocation[0].location.coordinates
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
        latitude={latitude}
        longitude={longitude}
        selectedTrain={selectedTrain}
        onChange={this.handleTrainSelection}
        connectionType={'Rest'}
      />
    );
  }
}

export default VehicleTrackerRest;
