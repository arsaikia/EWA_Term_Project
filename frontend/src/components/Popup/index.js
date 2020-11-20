import React from 'react';
import styled from 'styled-components/macro';
import { Colors } from '../Colors';
import { Description, HeaderTwo } from '../Texts';
// import { CircledX } from 'Icons';
import { FlexContainer } from '../StylingComponents/index';

const CircledX = () => null;

const PopupOuterContainer = styled.div`
    width: 100vw;
    height: 100%;
    overflow: hidden;
    z-index: 100;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PopupContainer = styled.div`
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 101;
    position: fixed;
    overflow: hidden;

    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        max-width: 594px;
        padding: 25px;
    }
`;

const FlashCardContainer = styled.div`
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 101;
    position: fixed;

    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    background: transparent;
`;

const Container = styled.div`
    height: 684px;
    width: 527px;
    background: white;

    @media (max-width: 768px) {
        width: 312px;
        max-height: 448px;
        min-height: 402px;
    }
`;

const HeaderContainer = styled.div`
    min-height: 122px;
    background-color: ${Colors.manifestBlue};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 34px 20px 49px;

    @media (max-width: 768px) {
        min-height: 60px;
        padding: 15px 17px 15px 29px;
    }
`;

const IconContainer = styled.div`
    svg {
        width: 36px;
        height: 36px;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
`;

const TextContainer = styled.div`
    width: 538px;
    height: 562px;
    overflow: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    text-align: justify;
    padding: 50px 51px 50px 49px;

    @media (max-width: 768px) {
        height: 388px;
        width: 310px;
        padding: 30px 27px 30px 29px;
    }
`;

const ModalContainer = styled.div`
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 100;
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        // max-width: 594px;
        padding: 60px 70px 60px 70px;

        width: 596px;
        height: 656px;
    }

    @media (max-width: 768px) {
        max-width: 80vw;
        width: 425px;
        padding: 21px 24px 21px 24px;
    }
`;

const CenterAlign = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Popup = ({ content = null, showPopup = false, handlePopup = null }) => {
    return (
        <>
            {showPopup ? (
                <>
                    <CenterAlign>
                        <PopupOuterContainer
                            onClick={
                                handlePopup ? () => handlePopup(false) : null
                            }
                        />
                        <PopupContainer>{content}</PopupContainer>
                    </CenterAlign>
                </>
            ) : null}
        </>
    );
};

const Modal = ({ content = null, showPopup = false, handlePopup = null }) => {
    return (
        <>
            {showPopup ? (
                <>
                    <PopupOuterContainer
                        onClick={handlePopup ? () => handlePopup(false) : null}
                    />
                    <ModalContainer />
                </>
            ) : null}
        </>
    );
};

const FlashCard = ({
    showPopup,
    handlePopup,
    regularCase = false,
    dynamicHeader = false,
    title = 'Flash Card Title',
    content = 'CONTENT : Deserunt Proident velit qui consequat sit dolor eu ad adipisicing. Duis incididunt occaecat elit elit sit dolore aute dolore. Irure id ea officia veniam dolor minim consequat officia labore. Mollit eu quis consequat sint cillum occaecat cupidatat duis laborum laboris amet proident id. Minim enim deserunt quis ex minim nostrud dolore labore duis Lorem Lorem enim. Nisi ex adipisicing nostrud ea. Ullamco reprehenderit pariatur excepteur nisi anim ea consequat cupidatat.Labore ad dolore consectetur veniam eiusmod minim eiusmod do exercitation. Laborum voluptate ad amet nulla id aute do nostrud non cillum. Irure reprehenderit ea qui pariatur tempor duis reprehenderit. Est duis aute ullamco non sint fugiat nulla.Commodo qui ea minim exercitation eiusmod cupidatat ex do occaecat do est occaecat. Incididunt eu aliqua amet do consequat ipsum in nisi culpa. Officia laborum occaecat sit voluptate reprehenderit esse ut ut culpa sit aliquip. Ullamco eiusmod officia esse eiusmod labore non aute velit veniam tempor ea fugiat in. Fugiat consequat fugiat aliqua quis aute esse commodo consectetur cillum officia officia.Culpa veniam sit dolore velit magna. Id mollit reprehenderit et commodo Lorem sit officia consectetur Lorem consequat ea eiusmod nostrud excepteur. Minim dolore est velit incididunt cupidatat officia qui exercitation enim enim aliqua amet. Incididunt culpa amet enim dolore esse nulla adipisicing culpa enim commodo.Ut nostrud eiusmod consectetur ullamco non amet do qui ad pariatur minim elit in. Ad enim incididunt quis laboris dolor sint. Eiusmod excepteur amet sint laboris laborum ipsum. Irure ullamco proident commodo ipsum ea sit. Nulla ea ipsum fugiat amet. Sunt ea quis commodo consectetur occaecat exercitation dolore incididunt commodo magna ut pariatur. Anim ea deserunt dolore commodo incididunt.Deserunt culpa occaecat enim qui exercitation aliqua proident qui amet. Nulla in duis do voluptate fugiat tempor non excepteur dolor ut nisi sunt anim elit. Excepteur excepteur sunt sunt officia ad esse anim id nostrud enim ex.Duis nisi magna reprehenderit elit enim aliqua anim deserunt cupidatat enim nulla. Sunt do adipisicing tempor do tempor amet. Non proident consectetur amet ipsum mollit eiusmod quis dolor consectetur amet et consectetur sit esse. Pariatur velit nostrud fugiat laborum deserunt sit occaecat nulla et veniam excepteur velit laborum. Laborum irure reprehenderit amet ipsum officia deserunt Lorem nisi ipsum.Pariatur tempor exercitation enim id veniam dolore dolore minim nostrud esse. Commodo culpa amet nisi irure consectetur eu esse est adipisicing. Quis mollit anim Lorem elit labore eu fugiat sunt Lorem labore aute esse. Esse non commodo dolor labore. Excepteur magna eiusmod reprehenderit labore adipisicing Lorem quis elit. Pariatur esse veniam duis aliqua et id est aliquip occaecat dolor ex enim ex. Aliquip labore aliquip dolor nisi dolore tempor Lorem fugiat magna.Velit ut consequat esse excepteur nostrud consequat minim id sunt deserunt amet. Cillum labore mollit cupidatat laboris nostrud culpa nostrud. Id nisi pariatur qui minim.Labore cupidatat veniam occaecat fugiat dolor. Nulla pariatur occaecat officia cillum ut cillum. Sint consectetur aute officia cupidatat dolor.Voluptate proident est nisi anim cillum nisi anim. Nostrud esse magna ut in laboris aliquip culpa minim officia cupidatat labore culpa labore. Consequat labore exercitation eiusmod id adipisicing exercitation ullamco sunt voluptate eu adipisicing eu. Eiusmod exercitation esse ad esse nisi deserunt occaecat laboris cillum. Cupidatat veniam adipisicing dolore quis cillum consequat pariatur exercitation voluptate consequat reprehenderit tempor velit ad.officiAdipisicing nisi culpa et officia ea et aute',
}) => {
    return (
        <>
            {showPopup ? (
                <>
                    <CenterAlign>
                        <PopupOuterContainer onClick={handlePopup} />
                        <FlashCardContainer>
                            <Container>
                                <HeaderContainer dynamicHeader={true}>
                                    <Description
                                        text={
                                            <p
                                                style={{
                                                    textTransform: regularCase
                                                        ? 'default'
                                                        : 'uppercase',
                                                }}>
                                                {title}
                                            </p>
                                        }
                                        bold
                                        color='white'
                                    />

                                    <IconContainer onClick={handlePopup}>
                                        <CircledX color='white' />
                                    </IconContainer>
                                </HeaderContainer>
                                <TextContainer>{content}</TextContainer>
                            </Container>
                        </FlashCardContainer>
                    </CenterAlign>
                </>
            ) : null}
        </>
    );
};

const UpdatedFlashCard = ({
    showPopup,
    handlePopup = null,
    regularCase = true,
    title = 'Flash Card Title',
    content = 'CONTENT : Deserunt Proident velit qui consequat sit dolor eu ad adipisicing. Duis incididunt occaecat elit elit sit dolore aute dolore. Irure id ea officia veniam dolor minim consequat officia labore. Mollit eu quis consequat sint cillum occaecat cupidatat duis laborum laboris amet proident id. Minim enim deserunt quis ex minim nostrud dolore labore duis Lorem Lorem enim. Nisi ex adipisicing nostrud ea. Ullamco reprehenderit pariatur excepteur nisi anim ea consequat cupidatat.Labore ad dolore consectetur',
}) => {
    return (
        <>
            {showPopup && (
                <>
                    <FlexContainer
                        width='100vw'
                        height='100vh'
                        position='absolute'
                        justifyContent='center'
                        alignItems='center'>
                        <FlexContainer
                            width='100vw'
                            height='100%'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                            position='fixed'
                            zIndex='100'
                            backgroundColor='rgba(255, 255, 255, 0.7)'
                            overflow='hidden'
                            onClick={handlePopup}
                        />
                        <FlexContainer
                            flexDirection='column'
                            width='600px'
                            mobileWidth='330px'
                            minHeight='300px'
                            mobileMinHeight='310px'
                            borderRadius='20px'
                            backgroundColor='white'
                            zIndex='101'>
                            <FlexContainer
                                width='100%'
                                flexDirection='row'
                                justifyContent='space-between'
                                paddingTop='20px'
                                paddingRight='30px'
                                paddingBottom='20px'
                                paddingLeft='30px'
                                backgroundColor={Colors.manifestBlue}
                                borderTopLeftRadius='20px'
                                borderTopRightRadius='20px'
                                wordBreak='break-word'>
                                <HeaderTwo
                                    text={
                                        <p
                                            style={{
                                                textTransform: regularCase
                                                    ? 'default'
                                                    : 'uppercase',
                                            }}>
                                            {title}
                                        </p>
                                    }
                                    color='white'
                                />
                                <FlexContainer
                                    paddingLeft='20px'
                                    mobilePaddingLeft='10px'
                                    justifyContent='center'
                                    alignItems='center'
                                    onClick={handlePopup}
                                    active={true}>
                                    <CircledX color='white' />
                                </FlexContainer>
                            </FlexContainer>

                            <FlexContainer
                                width='100%'
                                flexDirection='row'
                                justifyContent='space-between'
                                minHeight='72px'
                                paddingTop='30px'
                                paddingRight='30px'
                                paddingBottom='60px'
                                paddingLeft='30px'
                                wordBreak='break-word'>
                                <Description text={<p>{content}</p>} />
                            </FlexContainer>
                        </FlexContainer>
                    </FlexContainer>
                </>
            )}
        </>
    );
};

export { Popup, Modal, FlashCard, UpdatedFlashCard };
