import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../components/Logout';
import { AuthProvider } from '../components/AuthContext'; 

test('Logout component renders without crashing', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Logout />
      </AuthProvider>
    </BrowserRouter>
  );
});
