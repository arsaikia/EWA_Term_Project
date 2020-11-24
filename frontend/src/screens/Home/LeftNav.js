import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Description } from '../../components/Texts';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

const SideBar = styled(FadeInContainer)`
    display: ${(props) => (props.showSidebar ? 'default' : 'none')};
    width: 30%;
    min-width: 350px;
    max-width: 355px;
    background-color: white;

    transition: all 0.5s ease-in-out;

    cursor: pointer;
    /* background-color: rgba(10, 25, 47, 0.9); */
    box-shadow: 2px 2px 10px 2px grey;
    /* box-shadow: 0px 10px 40px rgb(10, 25, 47); */
    border-radius: 8px;

    @media screen and (max-width: 1010px) {
        min-width: 300px;
        min-width: 30%;
    }
    @media screen and (max-width: 768px) {
        min-width: 150px;
        max-width: 155px;
    }
`;

const Category = ({ getFilteredProducts, category }) => {
    return (
        <FlexContainer
            position='relative'
            width='100%'
            height='18%'
            backgroundColor='khaki'
            justifyContent='space-between'
            alignItems='center'
            overflow='hidden'>
            <FlexContainer
                width='100%'
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                onClick={() => getFilteredProducts(category, 'CATEGORY')}>
                <Description
                    text={category.replaceAll('_', ' ')}
                    pointer='pointer'
                />
            </FlexContainer>
        </FlexContainer>
    );
};

const allCategoriers = [
    'PRODUCE',
    'DAIRY_AND_EGGS',
    'FROZEN',
    'BEVERAGES',
    'SNACKS',
];
const LeftNav = ({ getFilteredProducts, showSidebar, showSidebarHandler }) => {
    return (
        <SideBar
            showSidebar={showSidebar}
            position='relative'
            marginTop={'2.4%'}
            marginBottom={'2.4%'}
            height='100vh'
            flexDirection='column'
            justifyContent='space-between'
            padding='2%'
            fadeIn
            duration='1000'>
            {allCategoriers.map((category, idx) => (
                <Category
                    key={idx}
                    getFilteredProducts={getFilteredProducts}
                    category={category}
                />
            ))}
        </SideBar>
    );
};

export { LeftNav };
