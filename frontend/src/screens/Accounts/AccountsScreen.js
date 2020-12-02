import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { FormInput } from '../../components/Forms';
import { useHistory } from 'react-router-dom';
import { get, isEmpty } from 'lodash';

import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import CustomerScreen from './CustomerScreen';
import AdminScreen from './AdminScreen';

const AccountsScreen = ({
    userType,
    isUserAuthenticated,
    loggedInUser,
    updateUser,
    userCards,
    updateCard,
    userAddresses,
    allRegisteredUsers,
    allRegisteredUsersFetched,
    makeManager,
    allMBA,
    recalculateMBA,
    ...props
}) => {
    // const history = useHistory();
    // if (!isUserAuthenticated) {
    //     return history.push('/login');
    // }
    return (
        <>
            <FadeInContainer
                flexDirection='row'
                width='100vw'
                height='100vh'
                fadeIn
                duration={500}>
                {userType === 'CUSTOMER' && (
                    <CustomerScreen
                        isUserAuthenticated={isUserAuthenticated}
                        loggedInUser={loggedInUser}
                        userType={userType}
                        updateUser={updateUser}
                        userCards={userCards}
                        updateCard={updateCard}
                        userAddresses={userAddresses}
                    />
                )}

                {userType === 'ADMIN' && allRegisteredUsersFetched && (
                    <AdminScreen
                        isUserAuthenticated={isUserAuthenticated}
                        loggedInUser={loggedInUser}
                        userType={userType}
                        allRegisteredUsers={allRegisteredUsers}
                        makeManager={makeManager}
                        allMBA={allMBA}
                        recalculateMBA={recalculateMBA}
                    />
                )}
            </FadeInContainer>
        </>
    );
};

export default AccountsScreen;
