import React from 'react';
import { render } from '@testing-library/react';
import Admin from '../components/Admin';
import { BrowserRouter } from 'react-router-dom';

test('renders Admin component without crashing', () => {
    render(
        <BrowserRouter>
            <Admin />
        </BrowserRouter>
    );

});
