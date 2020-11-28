import styled from 'styled-components/macro';

const Container = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    max-width: ${(props) => props.maxWidth};
    max-height: ${(props) => props.maxHeight};
    min-width: ${(props) => props.minWidth};
    min-height: ${(props) => props.minHeight};
    background-color: ${(props) => props.backgroundColor};
    opacity: ${(props) => props.opacity};
    cursor: ${(props) => (props.active ? 'pointer' : props.pointer)};
    text-align: ${(props) => props.textAlign};
    word-break: ${(props) => props.wordBreak};
    white-space: ${(props) => props.whiteSpace};
    overflow: ${(props) => props.overflow};
    overflow-y: ${(props) => props.overflowY};
    overflow-x: ${(props) => props.overflowX};
    text-overflow: ${(props) => props.textOverflow};

    pointer-events: ${(props) => props.disabled};

    border: ${(props) => props.border};
    border-top: ${(props) => props.borderTop};
    border-right: ${(props) => props.borderRight};
    border-bottom: ${(props) => props.borderBottom};
    border-left: ${(props) => props.borderLeft};
    border-radius: ${(props) => props.borderRadius};
    border-top-left-radius: ${(props) => props.borderTopLeftRadius};
    border-top-right-radius: ${(props) => props.borderTopRightRadius};
    border-bottom-left-radius: ${(props) => props.borderBottomLeftRadius};
    border-bottom-right-radius: ${(props) => props.borderBottomRightRadius};

    margin: ${(props) => props.margin};
    margin-top: ${(props) => props.marginTop};
    margin-left: ${(props) => props.marginLeft};
    margin-right: ${(props) => props.marginRight};
    margin-bottom: ${(props) => props.marginBottom};

    padding: ${(props) => props.padding};
    padding-top: ${(props) => props.paddingTop};
    padding-right: ${(props) => props.paddingRight};
    padding-bottom: ${(props) => props.paddingBottom};
    padding-left: ${(props) => props.paddingLeft};

    transition: ${(props) => props.transition};
    filter: ${(props) => props.filter};
    box-shadow: ${(props) => props.boxShadow};

    z-index: ${(props) => props.zIndex};
    position: ${(props) => props.position};

    svg {
        width: ${(props) => props.imageWidth};
        height: ${(props) => props.imageHeight};
    }

    @media (max-width: 768px) {
        width: ${(props) => props.mobileWidth};
        height: ${(props) => props.mobileHeight};
        max-width: ${(props) => props.mobileMaxWidth};
        max-height: ${(props) => props.mobileMaxHeight};
        min-width: ${(props) => props.mobileMinWidth};
        min-height: ${(props) => props.mobileMinHeight};

        margin: ${(props) => props.mobileMargin};
        margin-top: ${(props) => props.mobileMarginTop};
        margin-left: ${(props) => props.mobileMarginLeft};
        margin-right: ${(props) => props.mobileMarginRight};
        margin-bottom: ${(props) => props.mobileMarginBottom};

        padding: ${(props) => props.mobilePadding};
        padding-top: ${(props) => props.mobilePaddingTop};
        padding-right: ${(props) => props.mobilePaddingRight};
        padding-bottom: ${(props) => props.mobilePaddingBottom};
        padding-left: ${(props) => props.mobilePaddingLeft};

        transition: ${(props) => props.mobileTransition};
        box-shadow: ${(props) => props.mobileBoxShadow};

        svg {
            width: ${(props) => props.mobileImageWidth};
            height: ${(props) => props.mobileImageHeight};
        }
    }
`;

const FlexContainer = styled(Container)`
    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    flex-wrap: ${(props) => props.flexWrap};
`;

const FadeInContainer = styled(FlexContainer)`
    animation: ${(props) =>
        props.fadeIn && `fadeInAnimation ease all ${props.duration}ms`};
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const Spacing = styled(Container)`
    height: ${(props) => props.space};

    @media (max-width: 768px) {
        height: ${(props) => props.mobileSpace};
    }
`;

const Input = styled.input`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    background-color: inherit;

    @media (max-width: 768px) {
        input {
            font-size: 15px;
            line-height: 23px;
        }
    }

    ::-webkit-clear-button {
        display: none;
    }

    ::-webkit-inner-spin-button,
    ::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }

    ::-webkit-calendar-picker-indicator {
        display: none;
    }
`;

export { Container, FlexContainer, FadeInContainer, Input, Spacing };
