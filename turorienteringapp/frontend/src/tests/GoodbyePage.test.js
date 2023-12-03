import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GoodbyePage from '../components/GoodbyePage';

test('GoodbyePage component renders without crashing', () => {
  render(
    <BrowserRouter>
      <GoodbyePage />
    </BrowserRouter>
  );
});

//------------------------------------------>

// Snapshot test for the GoodbyePage  component
test('GoodbyePage  component snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <GoodbyePage  />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
