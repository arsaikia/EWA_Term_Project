import React, { useState } from 'react';
import styled from 'styled-components';
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
        { id: 11, name: 'Jill' },
        { id: 2, name: 'Miles' },
        { id: 33, name: 'Charles' },
        { id: 41, name: 'Hexrbie' },
        { id: 112, name: 'Jaack' },
        { id: 121, name: 'Jisll' },
        { id: 22, name: 'Mdiltes' },
        { id: 32, name: 'Chasrles' },
        { id: 42, name: 'Herrtbie' },
        { id: 323, name: 'Charles' },
        { id: 421, name: 'Hexwrrbie' },
        { id: 11112, name: 'Jtahack' },
        { id: 12421, name: 'Jsdisll' },
        { id: 222, name: 'Mdisles' },
        { id: 312, name: 'Chassrles' },
        { id: 412, name: 'Herarbie' },
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
