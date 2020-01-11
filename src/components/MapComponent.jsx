import React from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker } from 'react-leaflet';

const MapComponent = (props) => {
  const {
    mapCenter, zoom, style, icon,
  } = props;

  return (
    <div>
      <Map center={mapCenter} zoom={zoom} style={style} className="map-element">
        <TileLayer
          className="titleLayer-element"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker icon={icon} position={mapCenter} />
      </Map>
    </div>
  );
};

MapComponent.propTypes = {
  mapCenter: PropTypes.objectOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  icon: PropTypes.shape({
    iconUrl: PropTypes.string,
    iconSize: PropTypes.arrayOf(PropTypes.number),
    iconAnchor: PropTypes.arrayOf(PropTypes.number),
    popupAnchor: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default MapComponent;
