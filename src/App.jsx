import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

import './style/App.css';

import { storeActiveTrainsAction } from './reducers/allActiveTrainsReducer';
import { storestationsMetadataAction } from './reducers/stationsMetadataReducer';
import helpers from './utils/helpers';
import restService from './services/rest';

const App = (props) => {
  const { storestationsMetadata, storeActiveTrains } = props;
  const date = helpers.getFormattedDate(new Date());

  async function fetchInitialData() {
    const allTrains = await restService.getAllTrainsByDate(date);
    const stationsMetadata = await restService.getstationsMetadata();
    storestationsMetadata(stationsMetadata);
    storeActiveTrains(helpers.filterTrains(allTrains, stationsMetadata));
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

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

const mapStateToProps = (state) => ({
  mqttClient: state.mqttClient,
});

const mapDispatchToProps = {
  storestationsMetadata: storestationsMetadataAction,
  storeActiveTrains: storeActiveTrainsAction,
};

App.propTypes = {
  storestationsMetadata: PropTypes.func.isRequired,
  storeActiveTrains: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
