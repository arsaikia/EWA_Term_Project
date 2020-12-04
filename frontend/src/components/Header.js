import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';
import Cookie from 'js-cookie';
import { isEmpty, get } from 'lodash';
import { ReactComponent as Login } from '../Images/Icons/signup.svg';
import { ReactComponent as Logout } from '../Images/Icons/logout.svg';
import { ReactComponent as ArrowIcon } from '../Images/Icons/arrow.svg';
import { ReactComponent as SigninIcon } from '../Images/Icons/signin.svg';
import { ReactComponent as RegisterIcon } from '../Images/Icons/register.svg';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import CartContext from '../Context/Cart/cartContext';
import UserContext from '../Context/User/userContext';

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
import AnimatedHamburger from './AnimatedHamburger';

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
    showMap,
    setShowMap,
    selectedStore,
    ...props
}) => {
    const history = useHistory();
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */
    const cartContext = useContext(CartContext);
    const {
        allProducts,
        allProductsFetched,
        productsInCartFetched,
        cartCount,
        getFilteredProducts,
        fetchDiscountDeals,
        discountDealsFetched,
        discountDeals,
        fetchRatingsDeals,
    } = cartContext;

    const userContext = useContext(UserContext);
    const { isUserAuthenticated } = userContext;

    /*
     ***************************************************
     * LOCAL STATES
     ***************************************************
     */

    const rememberedUser = Cookie.get('USER_ID');
    const userName = Cookie.get('USER_NAME');
    const userStore = Cookie.get('STORE_ID');

    const [searchButtonText, setSearchButtonText] = useState('Search');
    const [singleSelections, setSingleSelections] = useState([]);

    const [searchProducts, setSearchProducts] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        if (!isEmpty(get(searchKey, 'id'))) {
            setSearchButtonText('View Product');
        } else {
            setSearchButtonText('Search');
        }
    }, [searchKey]);

    /*
     ***************************************************
     * LOGOUT
     ***************************************************
     */

    const logoutHandler = () => {
        // removed All user Cookies
        Cookie.remove('USER_NAME');
        Cookie.remove('REMEMBER_ME');
        Cookie.remove('USER_ID');

        // Go to home
        setShowDropdown(false);
        return history.push('/home');
    };

    useEffect(() => {
        if (allProductsFetched) {
            const searches = [];

            for (const product of allProducts) {
                searches.push({
                    id: product.productId,
                    name: product.productName,
                });
            }

            setSearchProducts(searches);
        }
    }, [allProductsFetched, allProducts]);

    /*
     ***************************************************
     * User Clicks on Search
     ***************************************************
     */

    const searchHandler = () => {
        const pId = get(searchKey, 'id');
        if (!pId) {
            return getFilteredProducts(searchKey, 'NAME');
        }
        setSearchKey('');
        setSingleSelections([]);
        return history.push(`/products/${pId}`);
    };

    return (
        <>
            <header
                style={{
                    display: !showHeader && 'None',
                    padding: '0px',
                }}>
                <Navbar
                    width='100%'
                    bg='dark'
                    variant='dark'
                    expand='md'
                    // collapseOnSelect
                    fixed='top'>
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
                                    <AutcompleteSearchBar
                                        options={searchProducts}
                                        setSearchKey={setSearchKey}
                                        singleSelections={singleSelections}
                                        setSingleSelections={
                                            setSingleSelections
                                        }
                                    />
                                    <Button
                                        className='d-none d-md-block'
                                        variant='outline-primary'
                                        onClick={searchHandler}>
                                        {searchButtonText}
                                    </Button>
                                </Form>
                            </FlexContainer>
                            <FlexContainer>
                                <LinkContainer
                                    to='/cart'
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
                                                text={
                                                    productsInCartFetched
                                                        ? cartCount
                                                        : ` ${' My Cart'}`
                                                }
                                                backgroundColor='#ffff'
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
                    padding='.1em 2em .1em 2em'
                    flexDirection='row'
                    // style={{ position: 'sticky', top: '10em' }}
                    // position='fixed'
                    width='100%'
                    marginTop='70px'
                    backgroundColor='#232F3E'
                    zIndex='1'>
                    <FlexContainer
                        onClick={() => setShowMap(!showMap)}
                        flexDirection='row'
                        width='15%'
                        padding='1px'
                        justifyContent='flex-start'
                        alignItems='center'>
                        <i
                            className='fas fa-map-marker-alt fa-sm'
                            style={{ color: '#ffff', marginRight: '10px' }}></i>
                        <FlexContainer flexDirection='column' padding='5px'>
                            <Note
                                text={
                                    get(selectedStore, 'street1') || 'Set Store'
                                }
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
                        <FlexContainer
                            width='150px'
                            onClick={() => fetchDiscountDeals(userStore)}>
                            <Note text={'Popular Deals'} color='#ffff' bold />
                        </FlexContainer>

                        {/* <FlexContainer
                            width='150px'
                            onClick={() => fetchDiscountDeals(userStore)}>
                            <Note text={'Buy Again'} color='#ffff' bold />
                        </FlexContainer> */}

                        <FlexContainer
                            width='150px'
                            onClick={() => fetchRatingsDeals()}>
                            <Note text={'Best Seller'} color='#ffff' bold />
                        </FlexContainer>

                        {/* <MyContainer width='2em' />
                        <Note text={'Buy Again'} color='#ffff' bold />
                        <MyContainer width='2em' />
                        <Note text={'Best Seller'} color='#ffff' bold /> */}
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
                            className='fas fa-angle-down'
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
                    showDropdown={showDropdown}
                    setShowHeader={setShowHeader}
                    setShowDropdown={setShowDropdown}
                    rememberedUser={rememberedUser}
                    {...props}></DropdownMenu>
            )}
        </>
    );
};

export default Header;
