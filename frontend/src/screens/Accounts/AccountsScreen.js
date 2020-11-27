import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { FormInput } from '../../components/Forms';

import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

const AccountsScreen = ({
    userTransactions,
    reviewSubmitHandler,
    ...props
}) => {
    const [transactId, setTransactId] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    return (
        <>
            <FadeInContainer
                flexDirection='row'
                width='98vw'
                minHeight='96vh'
                justifyContent='space-between'
                padding='3rem 50px 0rem 50px'
                onClick={() => null}
                // backgroundColor='khaki'
                fadeIn
                duration={500}>
                <FlexContainer width='#0%' height='80%' flexDirection='column'>
                    {userTransactions.length > 0 &&
                        userTransactions.map((ut, idx) => (
                            <FlexContainer
                                onClick={() => setTransactId(ut.transactionId)}
                                width='100%'
                                margin='20px 0px'
                                backgroundColor='khaki'>
                                {ut.transactionId}
                            </FlexContainer>
                        ))}
                </FlexContainer>

                <FlexContainer
                    width='30%'
                    height='80%'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'>
                    <FormInput
                        cancellable={false}
                        error={false}
                        errorMessage={'Text Cannot be Empty'}
                        onChange={setText}
                        title={'Review Text'}
                        value={text}
                        handleBlur={null}
                        required
                    />
                    <Spacing height={'20px'} />
                    <FormInput
                        cancellable={false}
                        error={false}
                        errorMessage={'Review Rating'}
                        onChange={setRating}
                        title={'Review Rating'}
                        value={rating}
                        handleBlur={null}
                        required
                    />
                    <Spacing height={'20px'} />
                    <Spacing height={'20px'} />
                    <button
                        type='button'
                        class='btn btn-primary'
                        onClick={reviewSubmitHandler}>
                        Submit Review
                    </button>
                </FlexContainer>
            </FadeInContainer>
        </>
    );
};

export default AccountsScreen;
