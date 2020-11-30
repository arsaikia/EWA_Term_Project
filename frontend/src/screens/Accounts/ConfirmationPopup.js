import React from 'react';
import { FlexContainer } from '../../components/StylingComponents';
import { Popup } from '../../components/Popup';

const ConfirmationPopup = ({
    show,
    setShow,
    text,
    popUpWidth = '120vw',
    popupHeight = '150vh',
}) => {
    return (
        <Popup
            popupWidth={popUpWidth}
            popupHeight={popupHeight}
            showPopup={show}
            handlePopup={setShow}
            content={
                <FlexContainer
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'>
                    <p>{`${text}`}</p>
                    <p>{`Click anywhere to close the popup`}</p>
                </FlexContainer>
            }
        />
    );
};

export default ConfirmationPopup;
