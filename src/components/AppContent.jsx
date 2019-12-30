import React, { useState } from 'react';
import { connect } from 'react-redux'

import { getFormattedDate, getFormattedCurentlyRunningTrains } from '../utils/helpers';
import restService from '../services/rest';
import { getAllActiveTrainsByDate } from '../reducers/trainsListReducer'
import webSocketService from '../services/mqttWwebsocket';
import trainIcon from '../utils/icons'

import MapComponent from './MapComponent'
import SearchComponent from './SearchComponent'
import TrainsComponent from './TrainsComponent'

import PropTypes from 'prop-types';

const AppContent  = (props) => {
  const [selectedTrain, setSelectedTrain] = useState({})
  const [trainLocation, setTrainLocation] = useState({ lat: 60.170605, lng: 24.940906 })
  const mqttClient = webSocketService.mqttConnectGetClient()
  const mapStyle = {height:500, margin: '1% 20%'}
  props.getAllActiveTrainsByDate(new Date())

  return (
    <div>
      <div className='map-component'>
        <MapComponent 
          mapCenter={trainLocation} 
          zoom={15}
          style={mapStyle}
          icon={trainIcon} />
      </div>
      <div className='search-component'>
        <SearchComponent/>
      </div>
      <div className='trains-component'>
        <TrainsComponent />
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  getAllActiveTrainsByDate
}

AppContent.propTypes = {
  
};

export default connect(null, mapDispatchToProps)(AppContent)