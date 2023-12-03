import React from 'react';
import { render } from '@testing-library/react';
import UserProfile from '../components/UserProfile';
import { BrowserRouter } from 'react-router-dom';

test('UserProfile component renders without crashing', () => {
  render(
    <BrowserRouter>
      <UserProfile />
    </BrowserRouter>
  );
});
