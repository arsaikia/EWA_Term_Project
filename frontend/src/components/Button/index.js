import React from 'react';
import styled from 'styled-components';
import { FlexContainer } from '../StylingComponents';
import { BackArrowIcon } from '../Icons';
import { Colors } from '../Colors';

const ButtonContainer = styled(FlexContainer)`
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
  background: ${(props) =>
      props.error
          ? Colors.red
          : props.inverted
          ? '#eff7fa'
          : props.active
          ? Colors.deepBlue
          : Colors.lightGrey};
  border: 1px solid
    ${(props) =>
        props.error
            ? Colors.red
            : props.active
            ? Colors.lightTextColor
            : props.inverted
            ? Colors.darkGrey
            : Colors.lightGrey};
      }
  
  &:hover {
    opacity: ${(props) => (props.inverted ? '0.65' : '0.85')};
    transition: 0.3s;
    background: ${(props) => props.active && `rgba(57,213,150, 0.8)`}
  }
`;

const RoundedContainer = styled(ButtonContainer)`
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const ButtonText = styled.p`
    color: ${(props) =>
        props.inverted && !props.active
            ? Colors.darkGrey
            : props.inverted
            ? Colors.lightTextColor
            : props.active
            ? 'white'
            : 'black'};
    font-size: ${(props) => (props.isSmall ? '14px' : '17px')};
    font-style: normal;
    font-weight: 600;
    line-height: ${(props) => (props.isSmall ? '22px' : '28px')};

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 22px;
    }
`;

const BackArrowContainer = styled.div`
    top: 1.3vh;
    left: 10%;
    position: fixed;
    z-index: 6;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius: 100%;
    cursor: pointer;

    @media (min-width: 1500px) {
        position: fixed;
        left: 20%;
    }

    @media (min-width: 768px) {
        svg {
            width: 50px;
            height: 50px;
        }

        top: 1.1vh;
    }

    @media (max-width: 768px) {
        svg {
            width: 35px;
            height: 19px;
            stroke-width: 2em;
        }

        top: 22px;
        left: 5vw;
    }
`;

const RegularButton = ({
    text,
    active = true,
    onClick,
    inverted = false,
    error = false,
}) => {
    return (
        <>
            <RoundedContainer
                width='200px'
                height='60px'
                mobileWidth='170px'
                mobileHeight='50px'
                justifyContent='center'
                alignItems='center'
                inverted={inverted}
                onClick={active && onClick}
                active={active}
                error={error}>
                <ButtonText inverted={inverted} active={active}>
                    {text}
                </ButtonText>
            </RoundedContainer>
        </>
    );
};

const SmallButton = ({
    text,
    active = true,
    onClick,
    inverted = false,
    error = false,
}) => {
    return (
        <>
            <RoundedContainer
                width='150px'
                height='60px'
                mobileWidth='110px'
                mobileHeight='50px'
                justifyContent='center'
                alignItems='center'
                onClick={active && onClick}
                active={active}
                inverted={inverted}
                error={error}>
                <ButtonText inverted={inverted} active={active}>
                    {text}
                </ButtonText>
            </RoundedContainer>
        </>
    );
};

const LongButton = ({
    text,
    active = true,
    onClick,
    inverted = false,
    error = false,
}) => {
    return (
        <>
            <ButtonContainer
                width='100%'
                maxWidth='560px'
                mobileMaxWidth='306px'
                height='40px'
                mobileHeight='30px'
                justifyContent='center'
                alignItems='center'
                borderRadius='10px'
                onClick={active && onClick}
                active={active}
                inverted={inverted}
                error={error}>
                <ButtonText inverted={inverted} active={active}>
                    {text}
                </ButtonText>
            </ButtonContainer>
        </>
    );
};

const FlexibleButton = ({
    text,
    active = true,
    onClick,
    inverted = false,
    error = false,
}) => {
    return (
        <>
            <RoundedContainer
                width='100%'
                height='60px'
                mobileWidth='100%'
                mobileHeight='50px'
                justifyContent='center'
                alignItems='center'
                inverted={inverted}
                padding='0px 20px 0px 20px'
                onClick={active && onClick}
                active={active}
                error={error}>
                <ButtonText inverted={inverted} active={active}>
                    {text}
                </ButtonText>
            </RoundedContainer>
        </>
    );
};

const Button = ({ type = 'regular', ...args }) => {
    return type === 'long' ? (
        <LongButton {...args} />
    ) : type === 'small' ? (
        <SmallButton {...args} />
    ) : type === 'flexible' ? (
        <FlexibleButton {...args} />
    ) : (
        <RegularButton {...args} />
    );
};

const BackArrow = ({ onClick = null }) => {
    return (
        <BackArrowContainer onClick={onClick}>
            <BackArrowIcon color='black' />
        </BackArrowContainer>
    );
};

export { Button, BackArrow };
