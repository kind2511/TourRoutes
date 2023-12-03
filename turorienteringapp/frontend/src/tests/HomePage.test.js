import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../components/HomePage';
import { BrowserRouter } from 'react-router-dom';


test('renders HomePage component without crashing', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  
});

//--------------------------------------------->

// Snapshot test for the HomePage  component
test('HomePage  component snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <HomePage  />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
