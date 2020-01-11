import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { getByText } from '@testing-library/dom'

import AppHeader from '../../components/AppHeader'

describe('<AppHeader />', () => {
  afterEach(cleanup);

  test('Header shows title', () => {
      const text = 'title'
      const { container, debug } = render(<AppHeader title={text} />)
      expect(getByText(container, text)).toBeTruthy()
  })
})