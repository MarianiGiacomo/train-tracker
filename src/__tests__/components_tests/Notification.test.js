import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { getByText } from '@testing-library/dom';

import Notification from '../../components/Notification';

describe('<Notification /', () => {
  afterEach(cleanup);
  test('Shows messages', async () => {
    const message = 'test message'
    
    const { container } = render(<Notification message={message}/>);

    expect(getByText(container, message)).toBeTruthy();
  });

  test('Shows messages', () => {
    const error = 'test message'
    const { container } = render(<Notification error={error}/>);
    
    expect(getByText(container, error)).toBeTruthy();
  })
})