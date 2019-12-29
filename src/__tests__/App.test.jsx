import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import App from '../App'

afterEach(() => {
  cleanup();
  console.error.mockClear();
  console.warn.mockClear();
});

console.error = jest.fn();
console.warn = jest.fn();

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
  const { getAllByTestId } = render(<App />);
  expect(getAllByTestId('header-div').length).toBe(1);
  expect(getAllByTestId('content-div').length).toBe(1);
  expect(getAllByTestId('footer-div').length).toBe(1);
});