import React from 'react';
import { render } from '@testing-library/react';
import DeleteUser from '../components/DeleteUser';
import { BrowserRouter } from 'react-router-dom';

test('renders DeleteUser component without crashing', () => {
  render(
    <BrowserRouter>
      <DeleteUser />
    </BrowserRouter>
  );
});
