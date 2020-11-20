import React, { useState } from 'react';

import { FlexContainer } from '../components/StylingComponents';
import { Note } from '../components/Texts';

const BuyButton = ({
    disabled,
    showPointer,
    quantity,
    itemsInBag,
    ContainsInCart = true,
    fullLengthButton = false,
}) => {
    const gradient = 'linear-gradient(to right,#f64f59,#fc7233)';
    const BuyNowHandler = () => console.log('clicked on buy now!');

    const [currentItemQuantity, setCurrentItemQuantity] = useState(quantity);
    const quantityHandler = (val) => () =>
        val === 'ADD'
            ? setCurrentItemQuantity(currentItemQuantity + 1)
            : setCurrentItemQuantity(
                  currentItemQuantity > 0 ? currentItemQuantity - 1 : 0
              );

    return (
        <FlexContainer
            disabled={true}
            width={fullLengthButton ? '100%' : '50%'}
            height='100%'
            justifyContent='center'
            alignItems='center'
            borderRadius='30px'
            padding='7px'
            pointer={showPointer}
            style={{
                background: !disabled ? gradient : 'grey',
            }}
            onClick={!ContainsInCart && BuyNowHandler}>
            {ContainsInCart ? (
                <FlexContainer
                    width='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <FlexContainer
                        width='30%'
                        alignItems='center'
                        justifyContent='center'
                        onClick={quantityHandler('REMOVE')}>
                        <Note text={'-'} color='white' pointer={showPointer} />
                    </FlexContainer>

                    <Note
                        text={itemsInBag}
                        color='white'
                        bold={700}
                        pointer={'cursor'}
                    />

                    <FlexContainer
                        width='30%'
                        alignItems='center'
                        justifyContent='center'
                        onClick={quantityHandler('ADD')}>
                        <Note text={'+'} color='white' pointer={showPointer} />
                    </FlexContainer>
                </FlexContainer>
            ) : (
                <Note
                    text={'Add to cart'}
                    color='white'
                    pointer={showPointer}
                />
            )}
        </FlexContainer>
    );
};

export default BuyButton;
