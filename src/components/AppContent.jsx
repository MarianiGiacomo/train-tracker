import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import TrainsComponent from './TrainsComponent';

import trainIcon from '../utils/icons';

import { storeSelectedTrainAction } from '../reducers/selectedTrainReducer';
import { storeTrainLocationAction } from '../reducers/trainLocationReducer';
import { storeMqttClientAction } from '../reducers/mqttClientReducer';
import { storeFilteredTrainsAction } from '../reducers/filteredActiveTrainsReducer';
import mqttService from '../services/mqttWwebsocket';
import helpers from '../utils/helpers';

const AppContent = (props) => {
  const {
    stationsMetadata,
    trains,
    trainLocation,
    selectedTrains,
    filteredTrains,
    mqttClient,
    storeMqttClient,
    storeSelectedTrain,
    storeTrainLocation,
    storeFilteredTrains,
  } = props;

  const mapStyle = { height: 500, margin: '1% 20%' };
  const searchFieldStyle = { width: 300 };

  const date = helpers.getFormattedDate(new Date());
  const stationNames = stationsMetadata.map((data) => data.stationName);

  useEffect(() => {
    const client = mqttService.getClient();
    storeMqttClient(client);
    const callBack = (message) => {
      storeTrainLocation(
        helpers.extractTrainLocationWS(message),
      );
    };
    mqttService.onMessage(client, callBack);
    return mqttService.closeConnection(client);
  }, []);

  function stationSelectionHandler(station) {
    const trainsArray = helpers.getTrainsWithGivenStation(station, trains, stationsMetadata);
    storeFilteredTrains(trainsArray);
  }

  // Show all trains if search field is emptied
  function stationChangeHandler(value) {
    if (value === undefined || !value.length) {
      storeFilteredTrains([]);
    }
  }

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
        <SearchComponent
          style={searchFieldStyle}
          dataSource={stationNames}
          onSelect={stationSelectionHandler}
          onChange={stationChangeHandler}
        />
      </div>
      <div className="trains-component">
        <TrainsComponent
          rowSelectionHandler={rowSelectionHandler}
          trains={filteredTrains.length ? filteredTrains : trains}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stationsMetadata: state.stationsMetadata,
  trains: state.trains,
  selectedTrains: state.selectedTrains,
  trainLocation: state.trainLocation,
  filteredTrains: state.filteredTrains,
  mqttClient: state.mqttClient,
});

const mapDispatchToProps = {
  storeMqttClient: storeMqttClientAction,
  storeSelectedTrain: storeSelectedTrainAction,
  storeTrainLocation: storeTrainLocationAction,
  storeFilteredTrains: storeFilteredTrainsAction,
};

AppContent.propTypes = {
  stationsMetadata: PropTypes.arrayOf(PropTypes.object).isRequired,
  trains: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredTrains: PropTypes.arrayOf(PropTypes.object).isRequired,
  trainLocation: PropTypes.objectOf(PropTypes.number).isRequired,
  selectedTrains: PropTypes.arrayOf(PropTypes.number).isRequired,
  storeMqttClient: PropTypes.func.isRequired,
  storeSelectedTrain: PropTypes.func.isRequired,
  storeTrainLocation: PropTypes.func.isRequired,
  storeFilteredTrains: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
