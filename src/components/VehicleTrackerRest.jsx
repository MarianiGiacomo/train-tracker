import React, { Component } from 'react';
import {getTrainLocation} from '../services/rest';
import VehicleSelector from './VehicleSelector';

class VehicleTrackerRest extends Component {
  state = {
    selectedTrain: 28,
    latitude: 60.18471605086973,
    longitude: 24.825582504272464,
  };

  trackTrain = async () => {
    const { selectedTrain } = this.state;
    
    getTrainLocation(selectedTrain).then(response => {
        if (response[0] !== undefined){
            this.setState({
                latitude: response[0].location.coordinates[1],
                longitude: response[0].location.coordinates[0],
            })
        }
    });
  }

  handleTrainSelection = (currentSelectedTrain) => {
    this.setState({
      selectedTrain: currentSelectedTrain,
    });
  }
  
  componentDidUpdate = async () =>{
    setInterval(await this.trackTrain(), 7000);
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
      />
    );
  }
}

export default VehicleTrackerRest;
