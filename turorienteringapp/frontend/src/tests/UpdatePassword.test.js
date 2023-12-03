import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UpdatePassword from '../components/UpdatePassword';

test('UpdatePassword component renders without crashing', () => {
  render(<UpdatePassword close={() => { }} />);
});

//---------------------------------------------->

// Snapshot test for the update pasword component
test('UpdatePassword component snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <UpdatePassword />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
