import './index.css';
import React from 'react';
import { Popup } from '../Popup';
import { Container, FlexContainer, Spacing } from '../StylingComponents';

const Loader = ({ showLoader }) => {
    return (
        showLoader && (
            <Popup
                display='flex'
                justifyContent='center'
                alignItems='center'
                showPopup={true}
                handlePopup={null}
                width='100%'
                content={
                    <FlexContainer>
                        <div className='lds-default'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </FlexContainer>
                }
            />
        )
    );
};

export default Loader;
