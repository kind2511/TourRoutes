import React from 'react';
import { render } from '@testing-library/react';
import DeleteRouteButton from '../components/AdminDeleteRoute';

test('DeleteRouteButton renders without crashing', () => {
  render(<DeleteRouteButton routeId={1} onDelete={() => {}} />);
});

//--------------------------------------->

// Snapshot test for the DeleteRouteButton 
test('DeleteRouteButton component snapshot', () => {
  const { asFragment } = render(<DeleteRouteButton routeId={1} onDelete={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});