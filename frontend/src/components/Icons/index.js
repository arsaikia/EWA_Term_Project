import React from 'react';

import styled from 'styled-components';

const FoodType = ({width=30, height=30}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            width={width}
            height='30'>
            <circle
                cx='100'
                cy='100'
                r='50'
                transform='translate(-22.5,-22.5)'
                style='fill:#008000'
            />
            <rect width='30' height='5' x='0' y='0' style='fill:#008000' />
            <rect width='30' height='5' x='0' y='150' style='fill:#008000' />
            <rect width='5' height='30' x='0' y='0' style='fill:#008000' />
            <rect width='5' height='30' x='150' y='0' style='fill:#008000' />
        </svg>
    );
};

export { FoodType };
