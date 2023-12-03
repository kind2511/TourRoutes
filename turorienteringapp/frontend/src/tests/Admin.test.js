import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Admin from '../components/Admin';

test('Admin component renders without crashing', () => {
  render(<Admin />);
});

//---------------------------------------->

// Snapshot test for the Admin component
test('Admin component snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});