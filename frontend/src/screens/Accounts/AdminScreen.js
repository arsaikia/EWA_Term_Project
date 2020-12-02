import React, { useState, useEffect, useCallback } from 'react';
import { FormDropdown, FormInput } from '../../components/Forms';
import ADMIN from '../../Images/admin.svg';
import TICK from '../../Images/Icons/tick.svg';
import { get, isEmpty } from 'lodash';
import { Button } from '../../components/Button';
import Cookie from 'js-cookie';
import ConfirmationPopup from './ConfirmationPopup';
import PaymentCard from 'react-payment-card-component';

import storeData from '../../utils/stores.json';

import {
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    Description,
} from '../../components/Texts';
import { Colors } from '../../components/Colors';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

const MakeStoreManager = ({ allRegisteredUsers, makeManager }) => {
    const [options, setOptions] = useState([]);
    const [allStores, setAllStores] = useState([]);
    const [dropdown, setDropdown] = useState({ label: '', value: '' });

    const getOptions = useCallback(() => {
        let users = allRegisteredUsers.filter(
            (user) => user.userType === 'CUSTOMER'
        );

        return setOptions(users);
    }, [allRegisteredUsers]);

    useEffect(() => {
        getOptions();
    }, [allRegisteredUsers, getOptions]);

    useEffect(() => {
        let all = [];
        storeData.forEach((store) => {
            const curr = {};
            curr['value'] = store.storeId;
            curr['label'] = store.storeName;
            all.push(curr);
        });

        setAllStores(all);
    }, []);
    console.log('storeData', allStores);

    return (
        <FlexContainer
            flexDirection='column'
            alignItems='center'
            padding='10px 20px'
            width='80%'
            height='100%'
            // backgroundColor='rgba(41,215,147,0.4)'

            borderRadius='10px'>
            <Spacing height='20px' />
            <HeaderThree
                text={<p>Change User Type:</p>}
                color={Colors.lightTextColor}
            />
            {options.map((user, idx) => {
                return (
                    <FlexContainer
                        FlexContainer
                        width='100%'
                        margin='10px 0px'
                        backgroundColor={'white'}
                        border='2px solid rgba(41,215,147,0.4)'
                        borderRadius='8px'
                        padding='10px'
                        flexDirection='row'
                        width='100%'
                        justifyContent='space-between'
                        alignItems='center'>
                        <Container width='40%'>
                            <HeaderThree
                                text={<p>{user.email}</p>}
                                color={Colors.lightTextColor}
                                bold={700}
                            />
                        </Container>

                        <Container width='25%'>
                            <FormDropdown
                                options={allStores}
                                value={dropdown}
                                onChange={setDropdown}
                            />
                        </Container>

                        <Container width='20%'>
                            <Button
                                inverted={true}
                                type={'small'}
                                text={'Manager'}
                                onClick={() =>
                                    makeManager(user.userId, dropdown.value)
                                }
                            />
                        </Container>
                    </FlexContainer>
                );
            })}
        </FlexContainer>
    );
};

const MKB = ({}) => {
    return (
        <FlexContainer
            width='100%'
            flexDirection='column'
            justifyContent='space-between'
            backgroundColor='khaki'>
            <FlexContainer height='100%'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                itaque voluptatibus quisquam saepe possimus, est excepturi vel
                pariatur illo consequuntur sapiente porro et ducimus atque nemo
                eum reiciendis odio. Maiores commodi excepturi ea cum dolor sed
                quia esse explicabo sint. Debitis aut accusantium blanditiis,
                adipisci ea iusto dolorum sint suscipit earum, cupiditate dolor
                fugiat ab deleniti ipsam voluptatum, quam quae eligendi
                voluptatem odio pariatur? Nostrum impedit maiores suscipit
                officiis corporis laborum dolorum doloremque expedita sunt nisi
                eaque totam assumenda sint sapiente perspiciatis iste id,
                tenetur voluptatem illo sed omnis nobis dolorem. Quos eos
                distinctio, doloribus quo placeat iure deserunt rem! Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Cum itaque
                voluptatibus quisquam saepe possimus, est excepturi vel pariatur
                illo consequuntur sapiente porro et duc Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Cum itaque voluptatibus
                quisquam saepe possimus, est excepturi vel pariatur illo
                consequuntur sapiente porro et ducimus atque nemo eum reiciendis
                odio. Maiores commodi excepturi ea cum dolor sed quia esse
                explicabo sint. Debitis aut accusantium blanditiis, adipisci ea
                iusto dolorum sint suscipit earum, cupiditate dolor fugiat ab
                deleniti ipsam voluptatum, quam quae eligendi voluptatem odio
                pariatur? Nostrum impedit maiores suscipit officiis corporis
                laborum dolorum doloremque expedita sunt nisi eaque totam
                assumenda sint sapiente perspiciatis iste id, tenetur voluptatem
                illo sed omnis nobis dolorem. Quos eos distinctio, doloribus quo
                placeat iure deserunt rem! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Cum itaque voluptatibus quisquam
                saepe possimus, est excepturi vel pariatur illo consequuntur
                sapiente porro et ducimus atque nemo eum reiciendis odio.
                Maiores commodi excepturi ea cum dolor sed quia esse explicabo
                sint. Debitis aut accusantium blanditiis, adipisci ea iusto
                dolorum sint suscipit earum, cupiditate dolor fugiat ab deleniti
                ipsam voluptatum, quam quae eligendi voluptatem odio pariatur?
                Nostrum impedit maiores suscipit officiis corporis laborum
                dolorum doloremque expedita sunt nisi eaque totam assumenda sint
                sapiente perspiciatis iste id, tenetur voluptatem illo sed omnis
                nobis dolorem. Quos eos distinctio, doloribus quo placeat iure
                deserunt rem!imus atque nemo eum reiciendis odio. Maiores
                commodi excepturi ea cum dolor sed quia esse explicabo sint.
                Debitis aut accusantium blanditiis, adipisci ea iusto dolorum
                sint suscipit earum, cupiditate dolor fugiat ab deleniti ipsam
                voluptatum, quam quae eligendi voluptatem odio pariatur? Nostrum
                impedit maiores suscipit officiis corporis laborum dolorum
                doloremque expedita sunt nisi eaque totam assumenda sint
                sapiente perspiciatis iste id, tenetur voluptatem illo sed omnis
                nobis dolorem. Quos eos distinctio, doloribus quo placeat iure
                deserunt rem!
            </FlexContainer>
        </FlexContainer>
    );
};

const AdminScreen = ({ allRegisteredUsers, makeManager }) => {
    const [selectedOption, setSelectedOption] = useState(2);
    return (
        <FadeInContainer
            flexDirection='row'
            width={'100%'}
            height={'80%'}
            padding='3rem 50px 0rem 50px'
            fadeIn
            duration={1200}
            style={{
                backgroundImage: `url(${ADMIN})`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '60%',
            }}>
            <FlexContainer
                width='50%'
                mobileWidth='80%'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'>
                <FlexContainer
                    width='100%'
                    justifyContent='center'
                    // backgroundColor='khaki'
                >
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Make Admin'}
                        onClick={() => setSelectedOption(1)}
                    />
                    <Spacing width='15px' />
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Market Basket Analysis'}
                        onClick={() => setSelectedOption(2)}
                    />
                </FlexContainer>

                {/* The Inforrmation Container */}
                {selectedOption === 1 && (
                    <FlexContainer
                        paddingTop='120px'
                        mobilePaddingTop='80px'
                        width='100%'
                        overflow='scroll'
                        flexDirection='column'
                        alignItems='center'>
                        <MakeStoreManager
                            allRegisteredUsers={allRegisteredUsers}
                            makeManager={makeManager}
                        />
                    </FlexContainer>
                )}

                {selectedOption === 2 && (
                    <FlexContainer
                        paddingTop='120px'
                        mobilePaddingTop='80px'
                        width='100%'
                        height='100%'
                        overflow='scroll'
                        flexDirection='column'
                        alignItems='space-between'>
                        <MKB />
                    </FlexContainer>
                )}
                {selectedOption === 2 && (
                    <FlexContainer height='10%'>
                        <Button
                            inverted={true}
                            type={'flexible'}
                            text={'Re-calibrate Market Basket Analysis'}
                            onClick={() => null}
                        />
                    </FlexContainer>
                )}

                {/* The Inforrmation Container */}
            </FlexContainer>
        </FadeInContainer>
    );
};

export default AdminScreen;
