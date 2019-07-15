import React from 'react';
import { render } from '@testing-library/react';
import Context from '../../../state/context';
import CharityCard from './CharityCard';

function generateContextComponent(props = {}, state = { donations: [] }, dispatch = jest.fn()) {

    return <Context.Provider value={{ state, dispatch }}>
                <CharityCard {...props} />
            </Context.Provider>;
}

describe('<CharityCard />', () => {

    const props = {
        id: 1, 
        name: 'Baan Kru Noi', 
        image: 'baan-kru-noi.jpg', 
        currency: 'THB' 
    };

    it('should exist', () => {
        const { getByTestId } = render(generateContextComponent(props));
        expect(getByTestId('charity-card')).toBeInTheDocument();
    });

    it('should render an image', () => {
        const { getByTestId } = render(generateContextComponent(props));
        expect(getByTestId('charity-card-image')).toBeInTheDocument();
    });

    it('should render a name', () => {
        const { getByTestId } = render(generateContextComponent(props));
        const name = getByTestId('charity-card-name');
        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent(props.name);
    });

    it('should render a Donate CTA', () => {
        const { getByTestId } = render(generateContextComponent(props));
        const cta = getByTestId('charity-card-cta');
        expect(cta).toBeInTheDocument();
        expect(cta).toHaveTextContent('Donate');
    });

});