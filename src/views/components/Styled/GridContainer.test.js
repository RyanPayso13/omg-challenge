import React from 'react';
import { render } from '@testing-library/react';
import { GridContainer } from './GridContainer';

describe('<GridContainer />', () => {

    it('should work', () => {
        const { container } = render(<GridContainer />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
