import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { setSelectedTrain } from '../reducers/selectedTrainReducer'
import { setTrainLocation } from '../reducers/trainLocationReducer'
import webSocketService from '../services/mqttWwebsocket';
import restService from '../services/rest'

import { Table } from 'antd';

const tableHeaders = [
  {
    title: 'Train Numner',
    dataIndex: 'trainNumber',
    key: 'trainNumber',
  },
  {
    title: 'Departure Station',
    dataIndex: 'departureStation',
    key: 'departureStation'
  },
  {
    title: 'Departure Time',
    dataIndex: 'departureTime',
    key: 'departureTime'
  },
  {
    title: 'Arrival Station',
    dataIndex: 'arrivalStation',
    key: 'arrivalStation'
  },
  {
    title: 'Arrival Time',
    dataIndex: 'arrivalTime',
    key: 'arrivalTime'
  }
];

const TrainsComponent = props => {
  const { 
    trains, 
    selectedTrainNumber, 
    setSelectedTrain,
    setTrainLocation,
    webSocket } = props

  const rowSelectionHandler = async (selectedRowKeys, selectedRows) => {
    if (selectedRows[0] !== undefined && selectedRows[0].trainNumber !== selectedTrainNumber) {
      webSocket.mqttUnsubscribe(selectedTrainNumber)
      const newTrainNumber = selectedRows[0].trainNumber
      const trainLocation = await restService.getTrainLocation(newTrainNumber)
      const coordinates = trainLocation.data[0].location.coordinates
      setTrainLocation({ lat: coordinates[1], lng: coordinates[0] })
      setSelectedTrain(newTrainNumber);
      webSocket.mqttSubscribe(newTrainNumber)
    }
  };
  const rowSelection = {
    onChange: rowSelectionHandler,
    type: 'radio'
  };
  
  return (
    <div>
      <Table 
        dataSource={trains} 
        columns={tableHeaders}
        rowSelection={rowSelection}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trains: state.trains,
    selectedTrainNumber: state.selectedTrainNumber,
    webSocket: state.webSocket
  }
}

const mapDispatchToProps = {
  setSelectedTrain,
  setTrainLocation
}

TrainsComponent.propTypes = {
  trains: PropTypes.array,
  selectedTrainNumber: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainsComponent);