import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader.js';

describe('<Loader />', () => {

    it('should render', () => {
        const { container } = render(<Loader />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
