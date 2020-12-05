import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
    FadeInContainer,
    FlexContainer,
    Spacing,
} from '../../../components/StylingComponents';
import { Button } from 'react-bootstrap';
import { HeaderOne, HeaderTwo, Description } from '../../../components/Texts';
import ORDERED from '../../../Images/orderSuccessful.svg';
import { useHistory } from 'react-router-dom';
import CartContext from '../../../Context/Cart/cartContext';
import { isEmpty, get } from 'lodash';
import storeData from '../../../utils/stores.json';

const RowItem = ({ name = 'Order Id:', value = '#12beaf' }) => {
    return (
        <FlexContainer
            flexDirection='row'
            width='50%'
            minHeight='40px'
            alignItems='center'
            backgroundColor='rgba(41,215,147, .40)'
            border='solid 1px rgba(41,215,147, .60)'
            borderRadius='6px'>
            <FlexContainer width='50%' marginLeft='20px'>
                <Description bold={700} text={<p>{name}</p>} />
            </FlexContainer>
            <Spacing height={'10px'} />
            <FlexContainer width='50%'>
                <Description text={<p>{value}</p>} />
            </FlexContainer>
        </FlexContainer>
    );
};

const Index = () => {
    const cartContext = useContext(CartContext);
    const { transferCreated, lastTransfer, userAddresses } = cartContext;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [userAddress, setUserAddress] = useState('');

    const selectedAddressId = get(history.location.state, 'selectedAddressId');
    const selectedCardId = get(history.location.state, 'selectedCardId');
    const selectedStore = get(history.location.state, 'selectedStore', null);

    console.log('transferCreated', history);

    const getStore = () => {
        let store = storeData.filter((s) => s.storeId === selectedStore);
        store = store.length > 0 && store[0];
        console.log('store', store);
        return get(store, 'street1', '');
    };

    const loadData = useCallback(() => {
        if (transferCreated) {
            const x =
                userAddresses &&
                userAddresses.length > 0 &&
                userAddresses.filter((add) => {
                    return add.addressId === lastTransfer.addressId;
                });

            x && x.length > 0 && setUserAddress(x[0].street1);

            // console.log('userAddresses', x);
            setIsLoading(false);
        }
    }, [transferCreated]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return isLoading ? null : (
        <FadeInContainer
            width='100%'
            height='100vh'
            flexDirection='row'
            justifyContent='flex-start'
            alignItems='center'
            fadeIn
            duration={'1200'}
            style={{
                backgroundImage: `url(${ORDERED})`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '50%',
            }}>
            <FlexContainer
                marginLeft='10%'
                width='50vw'
                height='60%'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'>
                <HeaderOne text={<p>Hurray! Order Placed Successfully</p>} />
                <Spacing height={'10%'} />
                <HeaderTwo text={<p>Order Details:</p>} />
                <Spacing height={'6px'} />
                <RowItem
                    name={'Order Id:'}
                    value={`#${lastTransfer.transactionId.substring(0, 8)}`}
                />
                <RowItem
                    name={'Total Price:'}
                    value={`$${lastTransfer.totalPrice}`}
                />
                <RowItem
                    name={'Order type:'}
                    value={`${
                        lastTransfer.deliveryMethod === 'STORE'
                            ? 'Pickup'
                            : 'Delivery'
                    }`}
                />
                <RowItem
                    name={
                        selectedStore ? 'Selected store:' : 'Delivery Address:'
                    }
                    value={
                        selectedStore
                            ? getStore()
                            : `${userAddress.substring(0, 25)}`
                    }
                />
                <RowItem
                    name={selectedStore ? 'Pickup by:' : 'Expected Delivery:'}
                    value={`${lastTransfer.deliveryForcast}`}
                />
                <Spacing height={'10%'} />
                <FlexContainer
                    width='48%'
                    flexDirection='row'
                    justifyContent='space-between'>
                    <Button
                        variant='outline-success'
                        onClick={() => history.push('/home')}>
                        To Home
                    </Button>
                    <Button
                        variant='outline-success'
                        onClick={() => history.push('/orders')}>
                        Orders
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </FadeInContainer>
    );
};

export default Index;
