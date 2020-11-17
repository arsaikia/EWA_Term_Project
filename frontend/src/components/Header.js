import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
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

const AccountDropdown = styled(FlexContainer)`
  transition: 300ms;

  &:hover {
    filter: opacity(0.5);
  }
`;

const Header = ({
  setShowHeader,
  showHeader,
  showDropdown,
  setShowDropdown,
  props,
}) => {
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
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
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
            <DropdownItems leftIcon={<SigninIcon />} goToMenu={'signIn'}>
              Sign In
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
            <DropdownItems leftIcon={<ArrowIcon />} goToMenu={'main'} />
            <LinkContainer to='/login' onClick={() => setShowHeader(false)}>
              <div>
                <DropdownItems leftIcon={<Login />}>Log In</DropdownItems>
              </div>
            </LinkContainer>
            <LinkContainer to='/signup' onClick={() => setShowHeader(false)}>
              <div>
                <DropdownItems leftIcon={<RegisterIcon />}>
                  Signup
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
          bg='dark'
          variant='dark'
          expand='md'
          collapseOnSelect
          // fixed='top'
          fluid>
          <Container fluid>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <Image
                  src={logo}
                  alt='eatFreshLogo..'
                  style={{ width: '60px' }}
                />
              </Navbar.Brand>
            </LinkContainer>

            <Form inline className='mr rounded p-1'>
              <FormControl
                // style={{ marginLeft: '500px' }}
                type='text'
                placeholder='Search Products'
                className='mr-sm-2'
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <Button
                variant='outline-primary'
                onClick={() => console.log(searchKey)}>
                Search
              </Button>
            </Form>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <LinkContainer to='/login' onClick={() => setShowHeader(false)}>
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
                          style={{ color: 'black' }}></i>
                      </FlexContainer>
                      <Note text={` ${' My Cart'}`} bold pointer />
                    </FlexContainer>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <FlexContainer
          padding='0px 2em 0px 2em'
          flexDirection='row'
          // position='fixed'
          width='100%'
          // marginTop='70px'
          backgroundColor='#232F3E'>
          <FlexContainer
            flexDirection='row'
            width='15%'
            padding='1px'
            justifyContent='flex-start'
            alignItems='center'>
            <i
              class='fas fa-map-marker-alt fa-sm'
              style={{ color: '#ffff', marginRight: '10px' }}></i>
            <FlexContainer flexDirection='column'>
              <Note text={'Deliver to Arunabh'} color='#ffff' />
              <Note
                text={'Chicago, 60616'}
                color='#ffff'
                bold
                style={{ margin: '0px' }}
              />
            </FlexContainer>
          </FlexContainer>
          <FlexContainer flexDirection='row' width='70%' alignItems='center'>
            <Note text={'Popular Deals'} color='#ffff' bold />
            <MyContainer width='2em' />
            <Note text={'Buy Again'} color='#ffff' bold />
            <MyContainer width='2em' />
            <Note text={'Best Seller'} color='#ffff' bold />
          </FlexContainer>
          <AccountDropdown
            onClick={() => setShowDropdown(!showDropdown)}
            flexDirection='row'
            width='15%'
            alignItems='center'
            justifyContent='flex-end'>
            <Note
              text={'Your Account'}
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
