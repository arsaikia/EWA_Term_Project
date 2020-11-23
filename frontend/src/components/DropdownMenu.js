import React, { useState, useRef, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ReactComponent as Login } from '../Images/Icons/signup.svg';
import { ReactComponent as Logout } from '../Images/Icons/logout.svg';
import { ReactComponent as ArrowIcon } from '../Images/Icons/arrow.svg';
import { ReactComponent as SigninIcon } from '../Images/Icons/signin.svg';
import { ReactComponent as RegisterIcon } from '../Images/Icons/register.svg';
import { CSSTransition } from 'react-transition-group';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

/*
 ***************************************************
 * DROPDOWN MENU
 ***************************************************
 */

const DropdownMenu = ({
    rememberedUser,
    setShowHeader,
    showDropdown,
    setShowDropdown,
    ...props
}) => {
    const history = useHistory();
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

    const HideMenu = () => {
        setShowHeader(false);
        setShowDropdown(false);
    };
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
                    <DropdownItems
                        leftIcon={<SigninIcon />}
                        goToMenu={'signIn'}>
                        Sign In / Sign Up
                    </DropdownItems>
                    <DropdownItems>Account</DropdownItems>
                    <DropdownItems>Orders</DropdownItems>
                    {rememberedUser && (
                        <div onClick={logoutHandler}>
                            <DropdownItems leftIcon={<Logout />}>
                                Log Out
                            </DropdownItems>
                        </div>
                    )}
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
                    <LinkContainer to='/login' onClick={HideMenu}>
                        <div>
                            <DropdownItems leftIcon={<Login />}>
                                Log In
                            </DropdownItems>
                        </div>
                    </LinkContainer>
                    <LinkContainer to='/signup' onClick={HideMenu}>
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

export default DropdownMenu;
