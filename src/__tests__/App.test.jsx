import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';

import App from '../App'

afterEach(() => {
  cleanup();
  console.error.mockClear();
  console.warn.mockClear();
});

console.error = jest.fn();
console.warn = jest.fn();

describe('<App />', () => {
  test('Test snapshot', () => {
      const { container } = render(<App />);
      expect(container.firstChild).toMatchSnapshot();
  });

  test('Renders without errors or warnings', () => {
      render(<App />);
      expect(console.error).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
  });

  test('Page renders the right components', () => {
      const { getByText } = render(<App />);
      expect(getByText('Train Tracker')).toBeTruthy();
  });
})


