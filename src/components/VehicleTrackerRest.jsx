import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Table } from 'antd';
import "antd/dist/antd.css";
import { getAllTrainsByDate, getStationMetadata } from '../services/rest';
import { getFormattedDate, getFormattedTrains } from '../utils/helpers';

class VehicleTrackerRest extends Component {
  state = {
    stationsMetadata: [],
    date:  getFormattedDate(new Date()),
    trains: [],
  };
  
  initialize = async () => {
    const { date } = this.state;
    const trains = await getAllTrainsByDate(date);
    const stationMetadata = await getStationMetadata();
    this.setState({ stationMetadata: stationMetadata, trains: trains});
  }

  componentDidMount = async () =>{
    await this.initialize(); 
  }

  render = () => {
    const { stationMetadata, trains } = this.state;
    const center = {
      lat: 60.18471605086973,
      lng: 24.825582504272464,
    };
    const zoom = 13;
    const dataSource = getFormattedTrains( trains, stationMetadata);    
    const columns = [
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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    
    return (
      <>
      <Map
        center={ center }
        zoom={ zoom }
        style={{height:500, width: '100%'}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker
          key="key"
          position={center}
        />
      </Map>
      <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns}/>
      </>
    );
  }
}

export default VehicleTrackerRest;
