import React, { useState } from 'react';

import { FlexContainer } from '../components/StylingComponents';
import { Note } from '../components/Texts';

const BuyButton = ({
    disabled,
    showPointer,
    quantity,
    itemsInBag,
    productId,
    ContainsInCart,
    fullLengthButton = false,
    addProductToCart = null,
    reduceProductsInCart = null,
}) => {
    const gradient = 'linear-gradient(to right,#f64f59,#fc7233)';
    const [currentItemQuantity, setCurrentItemQuantity] = useState(quantity);

    const quantityHandler = (val) => () => {
        if (val === 'ADD') {
            addProductToCart(productId);
            setCurrentItemQuantity(currentItemQuantity + 1);
        } else {
            reduceProductsInCart(productId);
            setCurrentItemQuantity(
                currentItemQuantity > 0 ? currentItemQuantity - 1 : 0
            );
        }
    };

    const addInitialItem = () => {
        !!!itemsInBag &&
            addProductToCart &&
            showPointer === 'pointer' &&
            addProductToCart(productId);
    };

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
            onClick={addInitialItem}>
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
