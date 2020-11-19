import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import { Popup } from '../../components/Popup/index';
import FRUIT from '../../Images/fruit_orange.png';
import CAKE from '../../Images/food_cake.png';

import Loader from '../../components/Loader';

import { ItemCard } from '../../components/Cards';

const HomeScreen = ({
    showHeader,
    setEmail,
    setPassword,
    getUsersHandler,
    setShowDropdown,
}) => {
    const randArray = Array.from({ length: 1 }, () =>
        Math.floor(Math.random() * 40)
    );
    const [showPopup, setShowPopup] = useState(false);
    const [zipCode, setZipCode] = useState('60616');
    console.log('zipCode', zipCode);

    return (
        <FadeInContainer
            width='100%'
            minHeight='96vh'
            padding='8rem 2rem 0rem 2rem'
            onClick={() => setShowDropdown(false)}>
            <ItemCard
                productImage={CAKE}
                isVeg={!true}
                discount={15}
                productName={'Chocolate Deloche'}
            />
            <ItemCard
                productImage={FRUIT}
                isVeg={true}
                discount={17.99}
                productName={'Fresh Oranges - California'}
            />
        </FadeInContainer>

        // <FadeInContainer
        //     onClick={() => setShowDropdown(false)}
        //     maxWidth='100%'
        //     minHeight='100vh'
        //     fadeIn
        //     duration={'300'}>
        //     <Popup
        //         showPopup={showPopup}
        //         handlePopup={() => console.log('Clicked on popup')}
        //         content={
        //             <Container>
        //                 <label>Enter Zip Code:</label>
        //                 <input
        //                     type='email'
        //                     className='form-control'
        //                     placeholder='Enter your zipcode'
        //                     onChange={(e) => setZipCode(e.target.value)}
        //                 />
        //                 <Spacing space='20px' mobileSpace='10px' />
        //                 <button
        //                     color='#ffff'
        //                     type='submit'
        //                     className='btn btn-success btn-lg btn-block'
        //                     onClick={() => setShowPopup(false)}>
        //                     Use This Location
        //                 </button>
        //             </Container>
        //         }
        //     />
        //     <FlexContainer miHeight='100px' />

        //     <ItemCard Image={Image} backgroundColor='khaki'/>

        //     <FadeInContainer width='100%' height='100%' padding='10rem 3rem' backgroundColor='khaki'>

        //         {/* <FlexContainer
        //             flexDirection='row'
        //             justifyContents='center'
        //             alignItems='center'
        //             // backgroundColor='red'
        //             // style={{ flexWrap: 'wrap' }}
        //         >
        //             {[1, 2].map((el) => (
        //                 <ItemCard Image={Image} />

        //                 // <FlexContainer
        //                 //     justifyContent='center'
        //                 //     alignItems='center'
        //                 //     margin='3rem'
        //                 //     style={{ flex: '1 0 18%' }}>
        //                 //     <img src={Image} alt='......' width='280em' />
        //                 // </FlexContainer>
        //             ))}
        //         </FlexContainer> */}

        //     </FadeInContainer>
        // </FadeInContainer>
    );
};

export default HomeScreen;
