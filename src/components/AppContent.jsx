import React from 'react';
import { connect } from 'react-redux'

import { getAllActiveTrainsByDate } from '../reducers/trainsListReducer'
import { setTrainLocation } from '../reducers/trainLocationReducer'
import trainIcon from '../utils/icons'

import MapComponent from './MapComponent'
import SearchComponent from './SearchComponent'
import TrainsComponent from './TrainsComponent'

import PropTypes from 'prop-types';

const AppContent  = (props) => {
  const { trainLocation, getAllActiveTrainsByDate, webSocket  } = props

  const onGettingCoordinates = (coordinates) => {
    setTrainLocation(coordinates)
  }
  webSocket.mqttOnMessage(onGettingCoordinates)

  getAllActiveTrainsByDate(new Date())

  const mapStyle = {height:500, margin: '1% 20%'}

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

const mapStateToProps = (state) => {
  return {
    trainLocation: state.trainLocation,
    webSocket: state.webSocket
  }
}
const mapDispatchToProps = {
  getAllActiveTrainsByDate,
  setTrainLocation
}

// AppContent.propTypes = {
  
// };

export default connect(mapStateToProps, mapDispatchToProps)(AppContent)