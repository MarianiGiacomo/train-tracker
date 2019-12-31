import React from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker } from 'react-leaflet';

const MapComponent = props => {
  const { mapCenter, zoom, style, icon } = props

  return (
    <div>
      <Map center={mapCenter} zoom={zoom} style={style} className='map-element'>
        <TileLayer
          className='titleLayer-element'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker icon={icon} position={mapCenter} />
      </Map>
    </div>
  );
};

MapComponent.propTypes = {
  mapCenter: PropTypes.object,
  zoom: PropTypes.number,
  style: PropTypes.object
};

export default MapComponent;