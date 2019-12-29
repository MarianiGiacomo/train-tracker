import React, { useState } from 'react';

import { getFormattedDate } from '../utils/helpers';
import WebSocket from '../services/mqttWwebsocket';
import MapComponent from './MapComponent'
import SearchComponent from './SearchComponent'
import TrainsComponent from './TrainsComponent'

import PropTypes from 'prop-types';

const AppContent = props => {
  const [selectedTrain, setSelectedTrain] = useState('')
  const [coordinates, setCoordinates] = useState(
    { lat: 60.18471605086973, lng: 24.825582504272464,})
  
  return (
    <div>
      <div className='map-component'>
        <MapComponent 
          mapCenter={coordinates} 
          zoom={13}
          style={{height:500, width: '100%'}}/>
      </div>
      <div className='search-component'>
        <SearchComponent/>
      </div>
      <div className='trains-component'>
        <TrainsComponent/>
      </div>
    </div>
  );
};

AppContent.propTypes = {
  
};

export default AppContent;