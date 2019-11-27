import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Table } from 'antd';

import {getAllTrainsByDate, getStationMetadata } from '../services/rest';
import { getFormattedDate, getFormattedTrains } from '../utils/helpers';
import {selectIcon} from '../utils/icons';
import StatisticsTable from './StatisticsTable';

const DATA_HEADERS = [
  {
    title: 'Train Numner',
    dataIndex: 'trainNumber',
    key: 'trainNumber',
  },
  {
    title: 'Departure Station',
    dataIndex: 'departureStation',
    key: 'departureStation'
  },
  {
    title: 'Departure Time',
    dataIndex: 'departureTime',
    key: 'departureTime'
  },
  {
    title: 'Arrival Station',
    dataIndex: 'arrivalStation',
    key: 'arrivalStation'
  },
  {
    title: 'Arrival Time',
    dataIndex: 'arrivalTime',
    key: 'arrivalTime'
  }
];

class VehicleSelector extends Component {
  state = {
    trains: [],
    stationMetadata: [],
  }

  componentDidMount = async () => {
    const date = getFormattedDate(new Date());
    const trains = await getAllTrainsByDate(date);
    const stationMetadata = await getStationMetadata();

    this.setState({
      trains,
      stationMetadata,
    });
  }

  rowSelectionHandler = (selectedRowKeys, selectedRows) => {
    const { selectedTrain, onChange } = this.props;
    if (selectedRows[0] !== undefined && selectedRows[0] !== selectedTrain) {
      onChange(selectedRows[0].trainNumber);
    }
  };

  render = () => {
    const { coordinatesWs, coordinatesRest, style, statistics } = this.props;
    const { trains, stationMetadata } = this.state;
    let mapCenter = { lat: 60.18471605086973, lng: 24.825582504272464 }
    if(coordinatesWs && !coordinatesRest) {
      mapCenter = coordinatesWs
    }
    else if(!coordinatesWs && coordinatesRest) {
      mapCenter = coordinatesRest
    }
    else if(coordinatesWs && coordinatesRest) {
      mapCenter = coordinatesWs
    }

    const zoom = 13;
    const dataSource = getFormattedTrains(trains, stationMetadata);
    const rowSelection = {
      onChange: this.rowSelectionHandler,
      type: 'radio'
    };

    return (
      <>
        <div>
          <Map
            center={mapCenter}
            zoom={zoom}
            style={style}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {coordinatesWs? <Marker
              key="key-ws"
              icon = {selectIcon('WebSocket')}
              position={coordinatesWs}
            />: null}
            {coordinatesRest? <Marker
              key="key-rest"
              icon = {selectIcon('Rest')}
              position={coordinatesRest}
            />: null}
          </Map>
          {statistics? <StatisticsTable dataSource={statistics}/> : null}
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={DATA_HEADERS}/>
      </>
    );
  }

}

export default VehicleSelector;
