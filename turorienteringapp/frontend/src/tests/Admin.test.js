import React from 'react';
import { render } from '@testing-library/react';
import Admin from '../components/Admin';

test('Admin component renders without crashing', () => {
  render(<Admin />);
});
