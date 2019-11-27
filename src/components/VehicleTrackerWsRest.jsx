import React, { Component } from 'react';
import VehicleSelector from './VehicleSelector';

class VehicleTrackerWsRest extends Component {
  state = { 
    selectedTrain: null,
    latitude: 60.18471605086973,
    longitude: 24.825582504272464,
  }

  handleTrainSelection = (currentSelectedTrain) => {
    this.setState({
      selectedTrain: currentSelectedTrain
    })
    console.log('selected train', currentSelectedTrain);
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

    return (
      <div>
        <VehicleSelector
        coordinatesWs={{ lat: latitude, lng: longitude }}
        coordinatesRest={{ lat: latitude, lng: longitude }}
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