import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Colors } from '../../components/Colors';
import { get } from 'lodash';
import './index.css';
import {
    Description,
    Note,
    HeaderOne,
    HeaderTwo,
    HeaderThree,
} from '../../components/Texts';
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
    background-color: #c8d5da;

    transition: all 0.5s ease-in-out;

    cursor: pointer;
    /* background-color: rgba(10, 25, 47, 0.9); */
    box-shadow: 1px 1px 6px 1px rgba(239, 247, 250, 0.8);
    /* box-shadow: 0px 10px 40px rgb(10, 25, 47); */
    border-radius: 4px;

    @media screen and (max-width: 1010px) {
        min-width: 300px;
        min-width: 30%;
    }
    @media screen and (max-width: 768px) {
        min-width: 150px;
        max-width: 155px;
    }
`;

const Category = ({ getFilteredProducts, category, allSubcategoriers }) => {
    let cat = category.replaceAll('_', ' ');
    cat = cat.substring(0, 1) + cat.substring(1, cat.length).toLowerCase();
    const subcategory = get(allSubcategoriers, category, []);

    const subCatFilter = async (category, sub) => {
        await getFilteredProducts(category, 'CATEGORY');
        await getFilteredProducts(sub, 'SUB_CATEGORY');
    };

    return (
        <FlexContainer
            position='relative'
            width='100%'
            height='19%'
            justifyContent='space-between'
            // alignItems='center'
            // border='1px solid white'
            overflow='hidden'>
            <FlexContainer
                width='100%'
                height='100%'
                flexDirection='column'
                alignItems='center'>
                <FlexContainer
                    backgroundColor='#FBFBFB'
                    border='1px solid rgba(186, 185, 185, 0.62);'
                    shadow={'0px 4px 4px rgba(0, 0, 0, 0.25);'}
                    width='100%'
                    height='25%'
                    alignItems='center'
                    justifyContent='center'
                    padding='15px'
                    onClick={() => getFilteredProducts(category, 'CATEGORY')}>
                    <HeaderTwo
                        text={<p>{cat}</p>}
                        pointer='pointer'
                        color={'#FE935E'}
                        bold={650}
                    />
                </FlexContainer>

                {subcategory.map((sub) => (
                    <FlexContainer
                        backgroundColor='#FFFF'
                        border='0.20px solid rgba(186, 185, 185, 0.42);'
                        width='100%'
                        height='25%'
                        padding='10px'
                        alignItems='center'
                        justifyContent='center'
                        onClick={() => subCatFilter(category, sub)}>
                        <Description
                            text={<p>{sub.replaceAll('_', ' ')}</p>}
                            pointer='pointer'
                            color={'#7b7d7e'}
                            bold={650}
                        />
                    </FlexContainer>
                ))}
            </FlexContainer>
        </FlexContainer>
    );
};

const allCategoriers = [
    'DAIRY_AND_EGGS',
    'PRODUCE',
    'FROZEN',
    'BEVERAGES',
    'SNACKS',
];

const allSubcategoriers = {
    DAIRY_AND_EGGS: ['Milk', 'Breakfast', 'Eggs'],
    PRODUCE: ['Fruits', 'Vegetables', 'Meat'],
    BEVERAGES: ['Soda', 'Tea', 'Fruit'],
    FROZEN: ['Meals', 'Veggies', 'dessert'],
    SNACKS: ['Chips', 'Cookies & Chocolates', 'Nuts'],
};
const LeftNav = ({ getFilteredProducts, showSidebar, showSidebarHandler }) => {
    return (
        <SideBar
            showSidebar={showSidebar}
            position='relative'
            marginTop={'1.5%'}
            // marginBottom={'2.4%'}
            height='85vh'
            flexDirection='column'
            justifyContent='space-between'
            padding='1.5%'
            fadeIn
            duration='1000'>
            {allCategoriers.map((category, idx) => (
                <Category
                    key={idx}
                    getFilteredProducts={getFilteredProducts}
                    category={category}
                    allSubcategoriers={allSubcategoriers}
                />
            ))}
        </SideBar>
    );
};

export { LeftNav };
