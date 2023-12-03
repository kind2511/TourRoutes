import React from 'react';
import { render } from '@testing-library/react';
import DeleteUserButton from '../components/AdminDeleteUser';

test('DeleteUserButton renders without crashing', () => {
  render(<DeleteUserButton userId={1} onDelete={() => {}} />);
});

//------------------------------------------------->

// Snapshot test for the DeleteUserButton component
test('DeleteUserButton component snapshot', () => {
  const { asFragment } = render(<DeleteUserButton userId={1} onDelete={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});