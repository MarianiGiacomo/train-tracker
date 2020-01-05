import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

import './style/App.css';

import { storeTrainLocation } from './reducers/trainLocationReducer';
import { getAndStoreActiveTrainsByDate } from './reducers/trainsListReducer';

const App = (props) => {
  const { getAndStoreActiveTrainsByDate } = props;

  useEffect(() => {
    getAndStoreActiveTrainsByDate(new Date());
  }, [getAndStoreActiveTrainsByDate]);

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
  getAndStoreActiveTrainsByDate,
  storeTrainLocation,
};

App.propTypes = {
  getAndStoreActiveTrainsByDate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
