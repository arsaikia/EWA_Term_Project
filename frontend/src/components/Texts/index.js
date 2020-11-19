import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { Colors } from '../Colors';

const StyledHeaderOne = styled.div`
    p {
        text-shadow: ${(props) =>
            props.loading ? '0 0 20px ' + Colors.manifestBlue : 'none'};
        font-family: roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 46px;
        color: ${(props) => (props.loading ? 'transparent' : props.color)};

        @media (max-width: 768px) {
            font-size: 26px;
            line-height: 36px;
        }
    }
`;

const HeaderOneLoading = styled.div`
    width: 310px;
    height: 56px;
    background-color: ${Colors.manifestLightBlue};
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;

    @media (max-width: 768px) {
        width: 171px;
        height: 28px;
    }
`;

const StyledHeaderTwo = styled.div`
    p {
        font-family: roboto;
        font-style: normal;
        font-weight: ${(props) => (props.bold ? 700 : 600)};
        font-size: 22px;
        line-height: 32px;
        color: ${(props) => props.color};
        cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

        &:hover {
            opacity: ${(props) => (props.pointer ? '0.8' : '1')};
        }

        @media (max-width: 768px) {
            font-size: 20px;
            line-height: 30px;
        }
    }
`;

const StyledHeaderThree = styled.div`
    p {
        font-family: roboto;
        font-style: normal;
        font-weight: ${(props) => (props.bold ? 700 : 600)};
        font-size: 20px;
        line-height: 27px;
        color: ${(props) => props.color};
        cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

        &:hover {
            opacity: ${(props) => (props.pointer ? '0.8' : '1')};
        }

        @media (max-width: 768px) {
            font-size: 17px;
            line-height: 24px;
        }
    }
`;

const StyledHenryQuestion = styled.div`
    p {
        font-family: roboto;
        font-style: normal;
        font-weight: ${(props) => (props.bold ? 700 : 600)};
        font-size: 27px;
        line-height: 37px;
        color: ${(props) => props.color};
        cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

        &:hover {
            opacity: ${(props) => (props.pointer ? '0.8' : '1')};
        }

        @media (max-width: 768px) {
            font-size: 17px;
            line-height: 24px;
        }
    }
`;

const StyledDescription = styled.div`
    p {
        font-family: roboto;
        font-style: normal;
        font-weight: ${(props) => (props.bold ? props.bold : 'normal')};
        font-size: 17px;
        line-height: 28px;
        color: ${(props) => props.color};
        cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

        @media (max-width: 768px) {
            font-size: 14px;
            line-height: 22px;
        }
    }
`;

const StyledNote = styled.div`
    font-family: roboto;
    font-style: normal;
    font-weight: ${(props) => (props.bold ? 600 : 'normal')};
    font-size: 14px;
    line-height: 20px;
    color: ${(props) => props.color};
    cursor: ${(props) => (props.pointer !=='cursor' ? 'pointer' : 'cursor')};

    @media (max-width: 768px) {
        font-size: 12px;
        line-height: 16px;
    }
`;

const StyledFinePrint = styled.div`
    font-family: roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: ${(props) => props.color};
    font-weight: ${(props) => (props.bold ? props.bold : 'normal')};
    cursor: ${(props) =>
        props.pointer !== 'cursor' ? 'pointer' : props.pointer};

    @media (max-width: 768px) {
        font-size: 10px;
        line-height: 14px;
    }
`;

const StyledInfoTitle = styled.div`
    p {
        font-family: roboto;
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 32px;
        color: ${(props) => props.color};
        cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

        @media (max-width: 768px) {
            font-size: 20px;
            line-height: 26px;
        }
    }

    ul {
        list-style: none;
    }

    li {
        &:before {
            font-size: 200px;
            color: blue;
        }
    }
`;

const StyledButtonText = styled.div`
    p {
        font-family: roboto;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 0px;
        color: ${(props) => props.color};

        @media (max-width: 768px) {
            font-size: 15px;
        }
    }
`;

const StyledHeader = styled.p`
    font-family: roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    color: ${(props) => props.color};
`;

const HeaderOne = ({ text, color = 'black', loading = false }) => {
    if (loading) {
        return <HeaderOneLoading />;
    }

    return (
        <StyledHeaderOne loading={loading} color={color}>
            {text}
        </StyledHeaderOne>
    );
};

const HeaderTwo = ({
    text,
    bold,
    color = 'black',
    onClick,
    pointer = false,
}) => {
    return (
        <StyledHeaderTwo
            pointer={pointer}
            onClick={onClick}
            bold={bold}
            color={color}>
            {text}
        </StyledHeaderTwo>
    );
};

const HeaderThree = ({ text, color = 'black', bold = false, pointer }) => {
    return (
        <StyledHeaderThree bold={bold} color={color} pointer={pointer}>
            {text}
        </StyledHeaderThree>
    );
};

const HenryQuestion = ({ text, color = 'black', bold = false }) => {
    return (
        <StyledHenryQuestion bold={bold} color={color}>
            {text}
        </StyledHenryQuestion>
    );
};

const Description = ({
    text,
    color = 'black',
    onClick,
    bold = false,
    pointer = false,
    maxSize = 0,
}) => {
    const getText = () => {
        if (maxSize && !isEmpty(text)) {
            if (text.length > maxSize) {
                return text.slice(0, maxSize - 8) + '...';
            }
            return text.slice(0, maxSize - 1);
        }
        return text;
    };

    return (
        <StyledDescription
            onClick={onClick}
            color={color}
            bold={bold}
            pointer={pointer}>
            <p>{getText()}</p>
        </StyledDescription>
    );
};

const InfoTitle = ({
    text,
    color = 'black',
    onClick,
    bold = false,
    pointer = false,
}) => {
    return (
        <StyledInfoTitle
            onClick={onClick}
            color={color}
            bold={bold}
            pointer={pointer}>
            {text}
        </StyledInfoTitle>
    );
};

const Note = ({
    text,
    color = 'black',
    bold = false,
    onClick,
    pointer = false,
    maxSize,
}) => {
    const getText = () => {
        if (maxSize && !isEmpty(text)) {
            if (text.length > maxSize) {
                return text.slice(0, maxSize - 8) + '...';
            }
            return text.slice(0, maxSize - 1);
        }
        return text;
    };

    return (
        <StyledNote
            pointer={pointer}
            onClick={onClick}
            bold={bold}
            color={color}>
            <p>{getText()}</p>
        </StyledNote>
    );
};

const FinePrint = ({
    text,
    color = Colors.manifestBlue,
    pointer = false,
    bold,
    maxSize,
}) => {
    const getText = () => {
        if (maxSize && !isEmpty(text)) {
            if (text.length > maxSize) {
                return text.slice(0, maxSize - 8) + '...';
            }
            return text.slice(0, maxSize - 1);
        }
        return text;
    };

    return (
        <StyledFinePrint pointer={pointer} color={color} bold={bold}>
            <p>{getText()}</p>
        </StyledFinePrint>
    );
};

const HeaderRegular = ({ text, color = 'black' }) => {
    return <StyledHeader color={color}>{text}</StyledHeader>;
};

const ButtonText = ({ text, color = 'black' }) => {
    return <StyledButtonText color={color}>{text}</StyledButtonText>;
};

export {
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    HenryQuestion,
    Description,
    ButtonText,
    InfoTitle,
    Note,
    HeaderRegular,
    FinePrint,
};
