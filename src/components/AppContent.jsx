import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import TrainsComponent from './TrainsComponent';

import trainIcon from '../utils/icons';

import { storeSelectedTrain } from '../reducers/selectedTrainReducer';
import { storeTrainLocation } from '../reducers/trainLocationReducer';
import { storeMqttClient } from '../reducers/mqttClientReducer';
import mqttService from '../services/mqttWwebsocket';
import helperFunctions from '../utils/helperFunctions';

const AppContent = (props) => {
  const {
    trainLocation,
    selectedTrains,
    mqttClient,
    storeMqttClient,
    storeSelectedTrain,
    storeTrainLocation,
  } = props;
  let mapStyle = { height: 500, margin: '1% 20%' };
  const date = helperFunctions.getFormattedDate(new Date());

  useEffect(() => {
    const callBack = (message) => {
      storeTrainLocation(
        helperFunctions.extractTrainLocationWS(message),
      );
    };

    const  cleanup = () => {
      mqttService.closeConnection(client);
    };

    let client = mqttService.getClient();

    storeMqttClient(client);
    mqttService.onMessage(client, callBack);
    return cleanup;
  }, [
    storeMqttClient,
    storeTrainLocation,
  ]);


  function rowSelectionHandler(selectedRowNumber, selectedRows) {
    const oldTrain = selectedTrains[selectedTrains.length - 1] || 0;
    const newTrain = selectedRows[0].trainNumber;
    if (oldTrain) {
      mqttService.unsubscribe(mqttClient, `${date}/${oldTrain}`);
    }
    mqttService.subscribe(mqttClient, `${date}/${newTrain}`);
    storeSelectedTrain(newTrain);
  }

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
  selectedTrains: state.selectedTrains,
  trainLocation: state.trainLocation,
  mqttClient: state.mqttClient,
});

const mapDispatchToProps = {
  storeMqttClient,
  storeSelectedTrain,
  storeTrainLocation,
};

AppContent.propTypes = {
  trainLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  selectedTrains: PropTypes.arrayOf(PropTypes.number).isRequired,
  storeMqttClient: PropTypes.func.isRequired,
  storeSelectedTrain: PropTypes.func.isRequired,
  storeTrainLocation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
