import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const StyledInput = styled(Form.Group)`
    font-family: roboto;
    color: black;
    padding: 5px;
`;

const AutcompleteSearchBar = ({
    options = [
        { id: 1, name: 'Apple Pie' },
        { id: 12, name: 'Jack' },
    ],
    setSearchKey,
    singleSelections,
    setSingleSelections
}) => {

    useEffect(() => {
        singleSelections && setSearchKey(singleSelections[0]);
    }, [singleSelections]);

    return (
        <>
            <StyledInput>
                <Typeahead
                    align='justify'
                    className='mr-sm-2'
                    id='typeahead'
                    labelKey='name'
                    onChange={setSingleSelections}
                    onInputChange={setSearchKey}
                    options={options}
                    placeholder='Search for a product...'
                    selected={singleSelections}
                />
            </StyledInput>
        </>
    );
};

export default AutcompleteSearchBar;
