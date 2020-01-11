import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  cleanup,
} from '@testing-library/react';
import store from '../../store'
import AppContent from '../../components/AppContent'

describe('<AppContent />', () => {
  afterEach(cleanup);

  test('Contains MapComponent div', () => {
    const { container } = render(
      <Provider store={store}>
        <AppContent />
      </ Provider>)
    expect(container.querySelector('.map-component')).toBeTruthy()
  })
  test('Contains SearchComponent div', () => {
        const { container } = render(
      <Provider store={store}>
        <AppContent />
      </ Provider>)
    expect(container.querySelector('.search-component')).toBeTruthy()
  })
  test('Contains TrainsComponent div', () => {
        const { container } = render(
      <Provider store={store}>
        <AppContent />
      </ Provider>)
    expect(container.querySelector('.trains-component')).toBeTruthy()
  })
})