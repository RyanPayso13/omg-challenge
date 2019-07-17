import React from 'react';
import { render } from '@testing-library/react';
import { GridContainer } from './GridContainer.js';

describe('<GridContainer />', () => {

    it('should work', () => {
        const { container } = render(<GridContainer />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
