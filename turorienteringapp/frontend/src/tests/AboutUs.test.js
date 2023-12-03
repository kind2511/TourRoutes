import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AboutUs from '../components/AboutUs';

test('AboutUs component renders without crashing', () => {
  render(
    <BrowserRouter>
      <AboutUs />
    </BrowserRouter>
  );
});

//----------------------------------------------->

// Snapshot test for the about us component
test('AboutUs component snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AboutUs />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

