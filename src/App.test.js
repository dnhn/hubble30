import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders', () => {
  const { asFragment } = render(<App />);
  expect(asFragment().textContent).toBe('#Hubble30');
});
