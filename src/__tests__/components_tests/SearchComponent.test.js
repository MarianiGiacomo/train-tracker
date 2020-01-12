import React from 'react';
import {
  render,
  cleanup,
  fireEvent
} from '@testing-library/react';

import helpers from '../../utils/helpers'
import SearchComponent from '../../components/SearchComponent';

afterEach(cleanup);
  
describe('<SearchComponent />', () => {
 
  test('Renders the correct placeholder', () => {
    const { getByText } = render(<SearchComponent />);
    expect(getByText('Search by station')).toBeTruthy();
  })
})