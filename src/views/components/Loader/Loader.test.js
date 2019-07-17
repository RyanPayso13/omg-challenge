import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader.js';

describe('<Loader />', () => {

    it('should render', () => {
        const { container } = render(<Loader isLoading={ true } />);
        expect(container.firstChild).toMatchSnapshot();    
    });

    it('should not render', () => {
        const { container } = render(<Loader isLoading={ false } />);
        expect(container.firstChild).toBeNull();    
    });

});
