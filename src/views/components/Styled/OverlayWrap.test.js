import React from 'react';
import { render } from '@testing-library/react';
import { OverlayWrap } from './OverlayWrap.js';

describe('<OverlayWrap />', () => {

    it('should work', () => {
        const { container } = render(<OverlayWrap />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
