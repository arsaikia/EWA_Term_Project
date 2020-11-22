import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useParams } from 'react-router-dom';
import SignupScreen from './SignupScreen';
import API from '../../utils/Query';
import { isPassword } from '../../utils/Validators';

import UserContext from '../../Context/User/userContext';

const SignupController = ({ showHeader, setShowHeader, ...props }) => {
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */
    const userContext = useContext(UserContext);
    const {
        allRegisteredUsers,
        allRegisteredUsersFetched,
        getAllRegisteredUsers,
        registerUser,
    } = userContext;
    /********************************************
     * Local States
     ********************************************/
    const [allUserEmails, setAllUserEmails] = useState([]);
    const [isAllUsersApiLoading, setIsAllUsersApiLoading] = useState(true);
    const [fillingScreenData, setFillingScreenData] = useState(true);

    // Registration Form States
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [selectedPreference, setSelectedPreference] = useState(0);
    const [error, setError] = useState({
        type: '',
        msg: { email: '', fName: '', lname: '', password: '' },
    });
    const [fieldOnFocus, setFieldOnFocus] = useState('');

    /*
     ***************************************************
     * HANDLER FUNCTIONS
     ***************************************************
     */

    /*
     ***************************************************
     * LOADING AND PAGE POPULATION HANDLERS
     **************************************************
     */

    const loadData = useCallback(() => {
        setShowHeader(false);
        if (isAllUsersApiLoading && !allRegisteredUsersFetched) {
            setIsAllUsersApiLoading(false);
            return getAllRegisteredUsers();
        }

        if (!isAllUsersApiLoading && allRegisteredUsersFetched) {
            setFillingScreenData(false);
            allRegisteredUsers.length > 0 &&
                setAllUserEmails(allRegisteredUsers.map((el) => el.email));
        }
    }, [
        setShowHeader,
        allRegisteredUsers,
        isAllUsersApiLoading,
        allRegisteredUsersFetched,
        getAllRegisteredUsers,
    ]);

    // On Load/Page refresh,  make sure header is hidden
    useEffect(() => {
        loadData();
    }, [loadData]);

    /********************************************
     * Frm Data check handlers
     ********************************************/

    const validateEmail = (emailToValidate) => {
        if (!isEmail(emailToValidate)) {
            return setError({
                type: 'email',
                msg: {
                    email: (
                        <p>
                            Email should be in format{' '}
                            <strong style={{ color: '#ff4949' }}>
                                "hello@eatFresh.com"
                            </strong>{' '}
                            !
                        </p>
                    ),
                    fName: '',
                    lname: '',
                    password: '',
                },
            });
        } else clearErrors('EMAIL');

        if (allUserEmails.includes(emailToValidate)) {
            setError({
                type: 'email',
                msg: {
                    email:
                        'An account already exists with the selected email !',
                    fName: '',
                    lname: '',
                    password: '',
                },
            });
        } else clearErrors('EMAIL');
    };

    const clearErrors = (val) => {
        switch (val) {
            case 'ALL':
                setError({
                    type: '',
                    msg: {
                        email: error.msg.email,
                        fName: error.msg.fName,
                        lname: error.msg.lname,
                        password: error.msg.password,
                    },
                });
                break;

            case 'EMAIL':
                setError({
                    type: '',
                    msg: {
                        email: '',
                        fName: error.msg.fName,
                        lname: error.msg.lname,
                        password: error.msg.password,
                    },
                });
                break;

            case 'NAME':
                setError({
                    type: '',
                    msg: {
                        email: error.msg.email,
                        fName: '',
                        lname: '',
                        password: error.msg.password,
                    },
                });
                break;

            default:
                break;
        }
    };

    const validatePassword = (val = '') => {
        console.log('equal', password, rePassword);
        if (val === 'repassword') {
            if (password !== rePassword) {
                return setError({
                    type: 'repassword',
                    msg: {
                        email: '',
                        fName: '',
                        lname: '',
                        password: 'Passwords do not match!',
                    },
                });
            }
        }
        if (!isPassword(password)) {
            setError({
                type: 'password',
                msg: {
                    email: '',
                    fName: '',
                    lname: '',
                    password:
                        'Invalid Password: need `1 char` `1 number` `1 uppercase` `1 lowercase` and `1 special char`',
                },
            });
        } else clearErrors('EMAIL');
    };

    const createUser = async () => {
        const body = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            userType: 'CUSTOMER',
            foodPreference: selectedPreference,
        };
        await registerUser(body);
    };

    const registerUserX = () => {
        setShowHeader(true);
        createUser();
        props.history.push('/login');
    };

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {
        setShowHeader(true);
    };

    if (fillingScreenData || isAllUsersApiLoading) {
        return null;
    }
    return (
        <SignupScreen
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            setFirstName={setFirstName}
            firstName={firstName}
            setLastName={setLastName}
            lastName={lastName}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
            fieldOnFocus={fieldOnFocus}
            setFieldOnFocus={setFieldOnFocus}
            error={error}
            registerUser={registerUserX}
            showHeader={showHeader}
            setSelectedPreference={setSelectedPreference}
            selectedPreference={selectedPreference}
            setRePassword={setRePassword}
            rePassword={rePassword}
        />
    );
};

export { SignupController };
