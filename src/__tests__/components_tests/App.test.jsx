import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  cleanup,
} from '@testing-library/react';
import store from '../../store'

import App from '../../App'

afterEach(() => {
  cleanup();
  console.error.mockClear();
  console.warn.mockClear();
});

console.error = jest.fn();
console.warn = jest.fn();

describe('<App />', () => {
  afterEach(cleanup);

  test('Test snapshot', () => {
      const { container } = render(
        <Provider store={store}>
          <App />
        </ Provider>);
      expect(container.firstChild).toMatchSnapshot();
  });

  test('Renders without errors or warnings', () => {
      render(
        <Provider store={store}>
          <App />
        </ Provider>
      );
      expect(console.error).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
  });

  test('Page renders the right components', () => {
      const { getByText } = render(
        <Provider store={store}>
          <App />
        </ Provider>
      );
      expect(getByText('Train Tracker')).toBeTruthy();
  });
})


