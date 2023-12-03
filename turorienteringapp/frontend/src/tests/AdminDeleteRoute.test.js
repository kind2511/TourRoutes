import React from 'react';
import { render } from '@testing-library/react';
import DeleteRouteButton from '../components/AdminDeleteRoute';

test('DeleteRouteButton renders without crashing', () => {
  render(<DeleteRouteButton routeId={1} onDelete={() => {}} />);
});
