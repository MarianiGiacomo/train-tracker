import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';

import AppContent from '../components/AppContent'


afterEach(cleanup)

describe('<AppContent />', () => {
test('Contains MapComponent div', () => {
    const { container } = render(<AppContent />)
    expect(container.querySelector('.map-component')).toBeTruthy()
  })
  test('Contains SearchComponent div', () => {
    const { container } = render(<AppContent />)
    expect(container.querySelector('.search-component')).toBeTruthy()
  })
  test('Contains TrainsComponent div', () => {
    const { container } = render(<AppContent />)
    expect(container.querySelector('.trains-component')).toBeTruthy()
  })
})