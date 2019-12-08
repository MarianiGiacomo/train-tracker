import React from 'react';
import { Table } from 'antd';

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

  return (
    <div className='StatTableDiv' >
      <div style={styleLeft} >
        <Table columns={DATA_HEADERS_WS} dataSource={dataSource.ws}/>
      </div>
      <div style={styleRight} >
        <Table columns={DATA_HEADERS_REST} dataSource={dataSource.rest}/>
      </div>
    </div>
  );
};

StatisticsTable.propTypes = {
  
};

export default StatisticsTable;