import React from 'react';
import { render } from '@testing-library/react';
import { ValidationMessage } from './ValidationMessage.js';

describe('<ValidationMessage />', () => {

    it('should work', () => {
        const { container } = render(<ValidationMessage />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
