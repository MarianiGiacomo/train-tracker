import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import TrainsComponent from './TrainsComponent';

import trainIcon from '../utils/icons';

import { storeSelectedTrain } from '../reducers/selectedTrainReducer';
import { storeTrainLocation } from '../reducers/trainLocationReducer';
import mqttService from '../services/mqttWwebsocket';
import restService from '../services/rest';
import helperFunctions from '../utils/helperFunctions';

const AppContent = (props) => {
  const { trainLocation, selectedTrainNumber, mqttClient } = props;

  const mapStyle = { height: 500, margin: '1% 20%' };

  const rowSelectionHandler = async (selectedRowKeys, selectedRows) => {
    const oldTrain = selectedTrainNumber;
    const newTrain = selectedRows[0].trainNumber;
    await mqttService.changeSubscription(mqttClient, oldTrain, newTrain);
    await props.storeSelectedTrain(newTrain);
    updateTrainLocationOnce();
  };

  const updateTrainLocationOnce = async () => {
    const newTrainLocation = await restService.getTrainLocation(selectedTrainNumber);
    props.storeTrainLocation(helperFunctions.extractTrainLocation(newTrainLocation));
  };

  return (
    <div>
      <div className="map-component">
        <MapComponent
          mapCenter={trainLocation}
          zoom={15}
          style={mapStyle}
          icon={trainIcon}
        />
      </div>
      <div className="search-component">
        <SearchComponent />
      </div>
      <div className="trains-component">
        <TrainsComponent rowSelectionHandler={rowSelectionHandler} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedTrainNumber: state.selectedTrainNumber,
  trainLocation: state.trainLocation,
  mqttClient: state.mqttClient,
});

const mapDispatchToProps = {
  storeSelectedTrain,
  storeTrainLocation,
};

// AppContent.propTypes = {

// };

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
