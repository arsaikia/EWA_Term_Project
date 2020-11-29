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

    const loadData = useCallback(() => {
        if (transferCreated) {
            const x = userAddresses.filter((add) => {
                return add.addressId === lastTransfer.addressId;
            });
            setUserAddress(x[0].street1);

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
                    name={'Delivery Address:'}
                    value={`${userAddress.substring(0, 25)}`}
                />
                <RowItem
                    name={'Expected Delivery:'}
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
