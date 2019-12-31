import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { getByRole } from '@testing-library/dom'

import MapComponent from '../components/MapComponent'
import trainIcon from '../utils/icons'

describe('<MapComponent />', () =>  {
  test('Map renders', () => {
    const mapCenter = { lat: 0, lng: 0}
    const style = { height:500, margin: '1% 20%' }
    const { container } = render(
      <MapComponent 
        style={style} 
        mapCenter={mapCenter} 
        icon={trainIcon}
        zoom={1}/>)
    expect(container.querySelector('.map-element')).toBeTruthy()
    expect(container.querySelector('.titleLayer-element')).toBeTruthy()
    expect(container.querySelector('.leaflet-marker-icon')).toBeTruthy()
  })
})