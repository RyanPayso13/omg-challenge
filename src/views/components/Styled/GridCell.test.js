import React from 'react';
import { render } from '@testing-library/react';
import { GridCell } from './GridCell';

describe('<GridCell />', () => {

    it('should work', () => {
        const { container } = render(<GridCell />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
