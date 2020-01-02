import React from 'react';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

import './style/App.css';

import { getAndStoreMqttClient } from './reducers/mqttClientReducer';
import { storeTrainLocation } from './reducers/trainLocationReducer';
import { getAndStoreActiveTrainsByDate } from './reducers/trainsListReducer';
import helperFunctions from './utils/helperFunctions';

const App = (props) => {
  props.getAndStoreActiveTrainsByDate(new Date());
  props.getAndStoreMqttClient((message) => saveCoordinates(message));

  const saveCoordinates = async (message) => {
    const coordinates = helperFunctions.extractTrainLocation(message);
    props.storeTrainLocation(coordinates);
  };

  return (
    <div className="content-wrapper">
      <div className="header-component">
        <AppHeader title="Train Tracker" />
      </div>
      <div className="content-component">
        <AppContent />
      </div>

    </div>
  );
};

const mapDispatchToProps = {
  getAndStoreActiveTrainsByDate,
  getAndStoreMqttClient,
  storeTrainLocation,
};

export default connect(null, mapDispatchToProps)(App);
