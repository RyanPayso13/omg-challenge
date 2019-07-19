import React from 'react';
import { render } from '@testing-library/react';
import { OverlayClose } from './OverlayClose';

describe('<OverlayClose />', () => {

    it('should work', () => {
        const { container } = render(<OverlayClose />);
        expect(container.firstChild).toMatchSnapshot();    
    });

});
