import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const tableHeaders = [
  {
    title: 'Train Numner',
    dataIndex: 'trainNumber',
    key: 'trainNumber',
  },
  {
    title: 'Departure Station',
    dataIndex: 'departureStation',
    key: 'departureStation',
  },
  {
    title: 'Departure Time',
    dataIndex: 'departureTime',
    key: 'departureTime',
  },
  {
    title: 'Arrival Station',
    dataIndex: 'arrivalStation',
    key: 'arrivalStation',
  },
  {
    title: 'Arrival Time',
    dataIndex: 'arrivalTime',
    key: 'arrivalTime',
  },
];

const TrainsComponent = (props) => {
  const { trains, rowSelectionHandler } = props;

  const rowSelection = {
    onChange: rowSelectionHandler,
    type: 'radio',
  };

  return (
    <div>
      <Table
        dataSource={trains}
        columns={tableHeaders}
        rowSelection={rowSelection}
      />
    </div>
  );
};

// const mapStateToProps = (state) => ({ trains: state.trains });

TrainsComponent.propTypes = {
  rowSelectionHandler: PropTypes.func.isRequired,
};

export default TrainsComponent;
