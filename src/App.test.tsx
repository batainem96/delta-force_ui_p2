import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('just works', () => {
  expect(render(<App />)).toBeTruthy();
});
