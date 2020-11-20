import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Cookie from 'js-cookie';
import { isEmpty } from 'lodash';
import { ReactComponent as Login } from '../Images/Icons/signup.svg';
import { ReactComponent as ArrowIcon } from '../Images/Icons/arrow.svg';
import { ReactComponent as SigninIcon } from '../Images/Icons/signin.svg';
import { ReactComponent as RegisterIcon } from '../Images/Icons/register.svg';
import { CSSTransition } from 'react-transition-group';
import {
    Navbar,
    Nav,
    Container,
    Image,
    FormControl,
    Button,
    Form,
} from 'react-bootstrap';
import { LinkContainer, Row, Col } from 'react-router-bootstrap';
import logo from '../Images/eatFreshLogo.png';
import {
    Container as MyContainer,
    FlexContainer,
    Spacing,
} from './StylingComponents';
import { Note } from './Texts';
import AutcompleteSearchBar from './Typehead';

const AccountDropdown = styled(FlexContainer)`
    transition: 300ms;

    &:hover {
        filter: opacity(0.5);
    }
`;

const StyledInput = styled(Form.Control)`
    font-family: roboto;
    padding: 5px;
    width: 25rem !important;
`;

const Header = ({
    setShowHeader,
    showHeader,
    showDropdown,
    setShowDropdown,
    props,
}) => {
    const userName = Cookie.get('USER_NAME');
    const [searchKey, setSearchKey] = useState('');

    const DropdownMenu = (props) => {
        const [menuHeight, setMenuHeight] = useState(null);
        const [activeMenu, setActiveMenu] = useState('main');
        const dropdownRef = useRef(null);

        useEffect(() => {
            setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
        }, []);

        const calcHeight = (el) => {
            const height = el.offsetHeight + 25;
            setMenuHeight(height);
        };

        const DropdownItems = (props) => {
            return (
                <a
                    href={props.goToScreen || '#'}
                    className={'menu-item'}
                    onClick={() =>
                        props.goToMenu && setActiveMenu(props.goToMenu)
                    }>
                    <span className='icon-button'> {props.leftIcon}</span>

                    {props.children}

                    <span className='icon-right'> {props.rightIcon}</span>
                </a>
            );
        };

        return (
            <div className='dropdown' style={{ height: menuHeight }}>
                <CSSTransition
                    in={activeMenu === 'main'}
                    unmountOnExit
                    timeout={500}
                    classNames='menu-primary'
                    onEnter={calcHeight}>
                    <div className='menu'>
                        <DropdownItems
                            leftIcon={<SigninIcon />}
                            goToMenu={'signIn'}>
                            Sign In / Sign Up
                        </DropdownItems>
                        <DropdownItems>Account</DropdownItems>
                        <DropdownItems>Orders</DropdownItems>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={activeMenu === 'signIn'}
                    unmountOnExit
                    timeout={500}
                    classNames='menu-secondary'
                    onEnter={calcHeight}>
                    <div className='menu'>
                        <DropdownItems
                            leftIcon={<ArrowIcon />}
                            goToMenu={'main'}
                        />
                        <LinkContainer
                            to='/login'
                            onClick={() => setShowHeader(false)}>
                            <div>
                                <DropdownItems leftIcon={<Login />}>
                                    Log In
                                </DropdownItems>
                            </div>
                        </LinkContainer>
                        <LinkContainer
                            to='/signup'
                            onClick={() => setShowHeader(false)}>
                            <div>
                                <DropdownItems leftIcon={<RegisterIcon />}>
                                    Register
                                </DropdownItems>
                            </div>
                        </LinkContainer>
                    </div>
                </CSSTransition>
            </div>
        );
    };

    return (
        <>
            <header style={{ display: !showHeader && 'None', padding: '0px' }}>
                <Navbar
                    width='100%'
                    bg='dark'
                    variant='dark'
                    expand='md'
                    // collapseOnSelect
                    fixed='top'
                    fluid>
                    <Container
                        fluid
                        onClick={() => {
                            setShowDropdown(false);
                        }}>
                        <FlexContainer
                            justifyContent='space-between'
                            alignItems='center'
                            width='100%'>
                            <FlexContainer>
                                <LinkContainer to='/'>
                                    <Navbar.Brand>
                                        <Image
                                            src={logo}
                                            alt='eatFreshLogo..'
                                            style={{ width: '60px' }}
                                        />
                                    </Navbar.Brand>
                                </LinkContainer>
                            </FlexContainer>
                            <FlexContainer>
                                <Form inline className='mr rounded p-1'>
                                    {/* <StyledInput
                                        type='text'
                                        placeholder='Search Products'
                                        className='mr-sm-2'
                                        onChange={(e) =>
                                            setSearchKey(e.target.value)
                                        }
                                    /> */}
                                    <AutcompleteSearchBar />
                                    <Button
                                        className='d-none d-md-block'
                                        variant='outline-primary'
                                        onClick={() => console.log(searchKey)}>
                                        Search
                                    </Button>
                                </Form>
                            </FlexContainer>
                            <FlexContainer>
                                <LinkContainer
                                    to='/login'
                                    onClick={() => setShowHeader(false)}>
                                    <Nav.Link>
                                        <FlexContainer
                                            flexDirection='row'
                                            justifyContent='center'
                                            alignItems='center'>
                                            <FlexContainer
                                                justifyContent='center'
                                                alignItems='center'
                                                width='40px'
                                                height='40px'
                                                borderRadius='20px'
                                                backgroundColor='#ffff'>
                                                <i
                                                    className='fas fa-shopping-cart fa-1x'
                                                    style={{
                                                        color: 'black',
                                                    }}></i>
                                            </FlexContainer>
                                            <Note
                                                text={` ${' My Cart'}`}
                                                bold
                                                pointer
                                            />
                                        </FlexContainer>
                                    </Nav.Link>
                                </LinkContainer>
                            </FlexContainer>
                        </FlexContainer>
                    </Container>
                </Navbar>
                <FlexContainer
                    padding='0px 2em 0px 2em'
                    flexDirection='row'
                    position='fixed'
                    width='100%'
                    marginTop='70px'
                    backgroundColor='#232F3E'
                    zIndex='10'>
                    <FlexContainer
                        flexDirection='row'
                        width='15%'
                        padding='1px'
                        justifyContent='flex-start'
                        alignItems='center'>
                        <i
                            class='fas fa-map-marker-alt fa-sm'
                            style={{ color: '#ffff', marginRight: '10px' }}></i>
                        <FlexContainer flexDirection='column' padding='5px'>
                            <Note
                                text={'60616'}
                                color='#ffff'
                                bold
                                style={{ margin: '0px' }}
                            />
                        </FlexContainer>
                    </FlexContainer>
                    <FlexContainer
                        flexDirection='row'
                        width='70%'
                        alignItems='center'>
                        <Note text={'Popular Deals'} color='#ffff' bold />
                        <MyContainer width='2em' />
                        <Note text={'Buy Again'} color='#ffff' bold />
                        <MyContainer width='2em' />
                        <Note text={'Best Seller'} color='#ffff' bold />
                    </FlexContainer>
                    <AccountDropdown
                        onClick={() => setShowDropdown(!showDropdown)}
                        onBlur={() => setShowDropdown(false)}
                        flexDirection='row'
                        width='15%'
                        alignItems='center'
                        justifyContent='flex-end'>
                        <Note
                            text={
                                !isEmpty(userName)
                                    ? `Hello, ${userName}`
                                    : 'Your Account'
                            }
                            color='rgba(225,225,225,1)'
                            bold
                            pointer
                        />
                        <i
                            class='fas fa-angle-down'
                            style={{
                                color: '#ffff',
                                marginLeft: '10px',
                                cursor: 'pointer',
                            }}></i>
                    </AccountDropdown>
                </FlexContainer>
            </header>
            {showDropdown && (
                <DropdownMenu
                    onClick={() => setShowDropdown(!showDropdown)}
                    {...props}></DropdownMenu>
            )}
        </>
    );
};

export default Header;
