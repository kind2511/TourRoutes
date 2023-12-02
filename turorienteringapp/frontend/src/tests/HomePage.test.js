import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../components/HomePage';
import { BrowserRouter } from 'react-router-dom';


test('renders HomePage component without crashing', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  
});
