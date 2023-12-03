import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';

test('Register renders without crashing', () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
});

//---------------------------------------->

// Snapshot test for the Regsiter component
test('Regiser component snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  


