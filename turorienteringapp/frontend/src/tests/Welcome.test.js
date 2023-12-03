import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../components/Welcome';

test('Welcome component renders without crashing', () => {
    render(
        <BrowserRouter>
            <Welcome />
        </BrowserRouter>
    );
});
