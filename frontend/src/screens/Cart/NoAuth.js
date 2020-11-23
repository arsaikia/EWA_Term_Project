import React from 'react';
import {
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import EMPTY_CART from '../../Images/Icons/empty_cart.svg';

const NoAuth = ({ history, isUserSemiAuthenticated, productsInCartEmpty }) => {
    return (
        <FadeInContainer
            width='100%'
            height='100vh'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            fadeIn
            duration={'300'}
            style={{
                backgroundImage: `url(${EMPTY_CART})`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '55%',
            }}>
            <FlexContainer flexDirection='column'>
                {!isUserSemiAuthenticated &&
                    'Looks like you have not logged in. Please logIn to see products in your Cart'}
                {productsInCartEmpty &&
                    'Your cart looks empty. Please add a few items to proceed!'}
                <Spacing space='50px' />
                <FlexContainer
                    justifyContent='center'
                    alignItems='center'
                    width='150px'
                    padding='10px'
                    backgroundColor='khaki'
                    borderRadius='20px'
                    opacity='0.85'
                    border='2px solid khaki'
                    boxShadow='10px 5px 5px grey'
                    pointer='pointer'
                    onClick={() => {
                        productsInCartEmpty
                            ? history.push('/home')
                            : history.push('/login');
                    }}>
                    {productsInCartEmpty ? 'Go Home' : 'Log In'}
                </FlexContainer>
            </FlexContainer>
        </FadeInContainer>
    );
};

export default NoAuth;
