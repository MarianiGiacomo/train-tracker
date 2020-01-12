import React from 'react';
import { AutoComplete } from 'antd';

const SearchComponent = (props) => {
  const {
    style,
    dataSource,
    onSelect,
    onChange, } = props;

  return (
    <div>
      <AutoComplete
        id="search-station-input"
        style={style}
        dataSource={dataSource}
        onSelect={onSelect}
        onChange={onChange}
        allowClear
        placeholder="Search by station"
        filterOption={(inputValue, option) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    </div>
  );
};

export default SearchComponent;
