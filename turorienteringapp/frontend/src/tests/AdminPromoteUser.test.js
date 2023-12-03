import React from 'react';
import { render } from '@testing-library/react';
import PromoteUserButton from '../components/AdminPromoteUser';

test('PromoteUserButton renders without crashing', () => {
  render(<PromoteUserButton userId={1} onPromote={() => {}} />);
});

//---------------------------------->

// Snapshot test for the PromoteUserButton component
test('PromoteUserButton component snapshot', () => {
  const { asFragment } = render(<PromoteUserButton userId={1} onPromote={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});