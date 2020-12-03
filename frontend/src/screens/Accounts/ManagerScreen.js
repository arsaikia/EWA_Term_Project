import React, { useState, useEffect, useCallback } from 'react';
import { FormDropdown, FormInput } from '../../components/Forms';
import ADMIN from '../../Images/admin.svg';
import TICK from '../../Images/Icons/tick.svg';
import { get, isEmpty } from 'lodash';
import { Button } from '../../components/Button';
import Cookie from 'js-cookie';
import ConfirmationPopup from './ConfirmationPopup';
import PaymentCard from 'react-payment-card-component';

import storeData from '../../utils/stores.json';

import {
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    Description,
    FinePrint,
    Note,
} from '../../components/Texts';
import { Colors } from '../../components/Colors';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

const StoreProducts = ({ getStoreProducts, storeProducts }) => {
    // console.log('storeProducts', storeProducts);
    // getStoreProducts('537a2109-095b-40c4-86a8-33447c8a8040');

    return (
        <FlexContainer flexDirection='column'>
            {storeProducts.map((sp) => {
                return (
                    <Container
                        width='100%'
                        border={`1px solid ${Colors.lightTextColor}`}
                        margin='5px 0px'
                        borderRadius='6px'>
                        <FlexContainer
                            padding='5px'
                            backgroundColor={'##fbfbfb'}>
                            <Description text={sp.productName} bold={550} />
                        </FlexContainer>
                    </Container>
                );
            })}
        </FlexContainer>
    );
};

const NonStoreProducts = ({ storeNotProducts }) => {
    // console.log('storeProductsXXXX', storeNotProducts);

    return (
        <FlexContainer flexDirection='column'>
            {storeNotProducts.map((snp) => {
                return (
                    <Container
                        width='100%'
                        border={`1px solid ${Colors.lightTextColor}`}
                        margin='5px 0px'
                        borderRadius='6px'>
                        <FlexContainer
                            padding='5px'
                            backgroundColor={'##fbfbfb'}
                            flexDirection='row'
                            justifyContent='space-between'
                            alignItems='center'>
                            <Description text={snp.productName} bold={550} />
                            <button
                                type='button'
                                class='btn btn-outline-success'>
                                Add to store
                            </button>
                        </FlexContainer>
                    </Container>
                );
            })}
        </FlexContainer>
    );
};

const ManagerScreen = ({
    getStoreProducts,
    storeProducts,
    storeNotProducts,
    storeId,
}) => {
    const [selectedOption, setSelectedOption] = useState(1);

    const [store, setStore] = useState({});

    useEffect(() => {
        let currentStore = storeData.filter(
            (store) => store.storeId === storeId
        );
        setStore(currentStore[0]);
        console.log(currentStore[0]);
    }, [storeId]);
    return (
        <FadeInContainer
            flexDirection='row'
            width={'100%'}
            height={'80%'}
            padding='3rem 50px 0rem 50px'
            fadeIn
            duration={1200}
            style={{
                backgroundImage: `url(${ADMIN})`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '60%',
            }}>
            <FlexContainer
                width='50%'
                mobileWidth='80%'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'>
                <FlexContainer
                    width='100%'
                    justifyContent='center'
                    // backgroundColor='khaki'
                >
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'View store products'}
                        onClick={() => setSelectedOption(1)}
                    />
                    <Spacing width='15px' />
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Add product to store'}
                        onClick={() => setSelectedOption(2)}
                    />
                    <Spacing width='15px' />
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Remove product from store'}
                        onClick={() => setSelectedOption(3)}
                    />
                </FlexContainer>

                {/* The Inforrmation Container */}
                {selectedOption === 1 && (
                    <FlexContainer
                        paddingTop='120px'
                        mobilePaddingTop='80px'
                        width='100%'
                        overflow='scroll'
                        flexDirection='column'
                        alignItems='center'>
                        <StoreProducts
                            getStoreProducts={getStoreProducts}
                            storeProducts={storeProducts}
                        />
                    </FlexContainer>
                )}

                {selectedOption === 2 && (
                    <FlexContainer height='10%' marginTop='30px'>
                        <HeaderTwo
                            color={Colors.lightTextColor}
                            text={<p>Products Not in store:</p>}
                        />
                    </FlexContainer>
                )}
                {selectedOption === 2 && (
                    <FlexContainer
                        paddingTop='20px'
                        mobilePaddingTop='20px'
                        width='100%'
                        height='100%'
                        overflow='scroll'
                        flexDirection='column'
                        alignItems='space-between'>
                        <NonStoreProducts storeNotProducts={storeNotProducts} />
                    </FlexContainer>
                )}

                <Container marginTop='100px' mobilMarginTop='60px'>
                    {!isEmpty(store) && (
                        <Note
                            style={{ fontStyle: 'italic' }}
                            color={Colors.lightTextColor}
                            bold={500}
                            text={
                                <p>{`#${store.storeId.substring(0, 6)} - ${
                                    store.storeName
                                } - ${store.street1} - ${store.city} - ${
                                    store.zip
                                } - ${store.state}`}</p>
                            }
                        />
                    )}
                </Container>

                {console.log(storeData)}

                {/* The Inforrmation Container */}
            </FlexContainer>
        </FadeInContainer>
    );
};

export default ManagerScreen;
