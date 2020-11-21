import React, { useState } from 'react';
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
}) => {
    const [singleSelections, setSingleSelections] = useState([]);

    return (
        <>
            <StyledInput>
                <Typeahead
                    align='justify'
                    className='mr-sm-2'
                    id='typeahead'
                    labelKey='name'
                    onChange={setSingleSelections}
                    options={options}
                    placeholder='Search for a product...'
                    selected={singleSelections}
                />
            </StyledInput>
        </>
    );
};

export default AutcompleteSearchBar;
