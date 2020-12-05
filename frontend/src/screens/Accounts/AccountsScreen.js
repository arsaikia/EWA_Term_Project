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
import ManagerScreen from './ManagerScreen';

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
    getStoreProducts,
    storeProducts,
    storeNotProducts,
    storeId,
    addStoreProduct,
    removeStoreProduct,
    updateProductsInCart,
    ...props
}) => {
    
    
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
                        updateProductsInCart={updateProductsInCart}
                    />
                )}

                {userType === 'STORE_MANAGER' && (
                    <ManagerScreen
                        isUserAuthenticated={isUserAuthenticated}
                        loggedInUser={loggedInUser}
                        userType={userType}
                        getStoreProducts={getStoreProducts}
                        storeProducts={storeProducts}
                        storeNotProducts={storeNotProducts}
                        storeId={storeId}
                        addStoreProduct={addStoreProduct}
                        removeStoreProduct={removeStoreProduct}
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
