import React from 'react';
import { Table } from 'antd';
import sizeMe from 'react-sizeme';

import './StatisticsTable.css'

const styleLeft = {
  display: 'inline',
  float: 'left',
  width: '50%',
  padding: 10
}

const styleRight = {
  display: 'inline',
  float: 'right',
  width: '50%',
  padding: 10
}

const styleMobile = {
  display: 'block',
  width: '100%',
  padding: 10
}

const StatisticsTable = props => {
  const dataSource = props.dataSource
  const DATA_HEADERS_WS = [
    {
      title: 'WebSocket',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
    }
  ]

  const DATA_HEADERS_REST = [
    {
      title: 'REST',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
    }
  ]

  const getStyleLeft = (size) => {
    if(size.width < 400) {
      return styleMobile
    }
    return styleLeft
  }

  const getStyleRight = (size) => {
    if(size.width < 400) {
      return styleMobile
    }
    return styleRight
  }

  return (
    <div className='StatTableDiv' >
      <div style={getStyleLeft(props.size)} >
        <Table columns={DATA_HEADERS_WS} dataSource={dataSource.ws}/>
      </div>
      <div style={getStyleRight(props.size)} >
        <Table columns={DATA_HEADERS_REST} dataSource={dataSource.rest}/>
      </div>
    </div>
  );
};

StatisticsTable.propTypes = {
  
};

export default sizeMe()(StatisticsTable);