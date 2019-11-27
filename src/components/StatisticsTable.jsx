import React from 'react';
import { Table } from 'antd';

import './StatisticsTable.css'

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
      <Table columns={DATA_HEADERS_WS} dataSource={dataSource.ws}/>
      <Table columns={DATA_HEADERS_REST} dataSource={dataSource.rest}/>
    </div>
  );
};

StatisticsTable.propTypes = {
  
};

export default StatisticsTable;