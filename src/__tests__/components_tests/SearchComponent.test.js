import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';

import SearchComponent from '../../components/SearchComponent';

describe('<SearchComponent />', () => {
  afterEach(cleanup);
  
  test('Search component renders', () => {
    const { container } = render(<SearchComponent />);
    
  })
})