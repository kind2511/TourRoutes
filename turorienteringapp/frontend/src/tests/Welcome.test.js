import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../components/Welcome';

// Test to check if the Welcome component renders without crashing
test('Welcome component renders without crashing', () => {
    render(
        <BrowserRouter>
            <Welcome />
        </BrowserRouter>
    );
});

//---------------------------------------------->

// Snapshot test for the Welcome component
test('Welcome component snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  