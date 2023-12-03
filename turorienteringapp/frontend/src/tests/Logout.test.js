import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../components/Logout';
import { AuthProvider } from '../components/AuthContext';

// Test for rendering Logout component without crashing
test('Logout component renders without crashing', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Logout />
      </AuthProvider>
    </BrowserRouter>
  );
});

//------------------------------------------------->

// Snapshot test for the Logout component
test('Logout component snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthProvider>
        <Logout />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
