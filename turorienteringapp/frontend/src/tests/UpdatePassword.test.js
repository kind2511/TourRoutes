import React from 'react';
import { render } from '@testing-library/react';
import UpdatePassword from '../components/UpdatePassword';

test('UpdatePassword component renders without crashing', () => {
  render(<UpdatePassword close={() => {}} />);
});
