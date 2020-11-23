import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'react-bootstrap';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import {
    FormInput,
    DateInput,
    FormPasswordInput,
} from '../../components/Forms';
import { Popup } from '../../components/Popup/index';
import EMPTY_CART from '../../Images/Icons/empty_cart.svg';
import CROSS_ICON from '../../Images/Icons/crossIcon.svg';
import GO_BACK from '../../Images/Icons/goBack.svg';
import NoAuth from './NoAuth';
import {
    HeaderOne,
    Description,
    HeaderTwo,
    Note,
    FinePrint,
} from '../../components/Texts';

const textColor = '#383838';
const lightTextColor = '#585656';
const lightOnDark = '#cbd2dd';

const ExpandingContainer = styled(Container)`
    cursor: pointer;
    flex-direction: column;
    width: 100%;
    position: relative;
    transition: height 500ms ease-in-out, 500ms background-color ease-in-out;
    -webkit-transition: height 500ms ease-in-out,
        500ms background-color ease-in-out;

    &:hover {
        height: 100%;
        background-color: #3f536d;
    }
`;

const AddressAndCards = () => {
    return (
        <FlexContainer
            flexDirection='column'
            width='100%'
            height='100%'
            justifyContent='space-between'>
            <ExpandingContainer
                width='100%'
                height='40px'
                overflow='hidden'
                padding='5px'
                borderRadius='8px'
                border='1px solid #35475e'>
                <FlexContainer
                    width='100%'
                    flexDirection='row'
                    justifyContent='center'
                    alignSelf='center'
                    alignItems='center'>
                    <Description
                        text={<p>Select an existing Card</p>}
                        color={lightOnDark}
                        pointer={'pointer'}
                    />
                </FlexContainer>
                <Container>Card</Container>
                <Container>Card</Container>
                <Container>Card</Container>
                <Container>Card</Container>
                <Container>Card</Container>
            </ExpandingContainer>
            <Spacing height='50px' mobileHeight='30px' />
            <FlexContainer
                width='100%'
                height='80%'
                flexDirection='column'
                alignItems='center'
                borderRadius='8px'
                alignSelf='center'
                // backgroundColor={'#35475e'}
                padding={'1em'}>
                <HeaderTwo text={<p>Add a new Card</p>} color={lightOnDark} />
                <Spacing height='50px' mobileHeight='30px' />

                <FlexContainer
                    flexDirection={'column'}
                    width='100%'
                    height='100%'
                    justifyContent='space-between'>
                    <FormInput
                        cancellable={'!isEmpty(columnTherapiesX)'}
                        error={false}
                        onChange={null}
                        title={'Name on Card'}
                        value={'Arunabh Saikia'}
                        handleBlur={null}
                        required
                    />
                    <FormInput
                        cancellable={'!isEmpty(columnTherapiesX)'}
                        error={false}
                        onChange={null}
                        title={'Card Number'}
                        value={'2901 3121 2212 9898'}
                        handleBlur={null}
                        required
                    />

                    <FlexContainer
                        width='100%'
                        justifyContent='space-between'
                        marginBottom='10px'>
                        <FlexContainer width='60%'>
                            <DateInput
                                title={'Expiry Date'}
                                required></DateInput>
                        </FlexContainer>
                        <FlexContainer width='30%'>
                            <FormPasswordInput
                                cancellable={false}
                                error={false}
                                onChange={null}
                                title={'cvv'}
                                value={123}
                                handleBlur={null}
                                required></FormPasswordInput>
                        </FlexContainer>
                    </FlexContainer>

                    <Button
                        variant='primary'
                        onClick={() => {
                            console.log('Clicked on Button!');
                        }}>{`Complete Order`}</Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

export default AddressAndCards;
