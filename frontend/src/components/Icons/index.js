import React from 'react';

import styled from 'styled-components/macro';

const FoodType = ({ width = 30, height = 30 }) => {
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

const AlertIcon = ({ width = '34', height = '34', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 34 34'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <rect
                width='30'
                height='30'
                transform='translate(2 2)'
                fill='white'
            />
            <path
                d='M17 32C25.2843 32 32 25.2843 32 17C32 8.71573 25.2843 2 17 2C8.71573 2 2 8.71573 2 17C2 25.2843 8.71573 32 17 32Z'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M17 11V17'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <ellipse cx='17' cy='22.5' rx='1.375' ry='1.375' fill={color} />
        </svg>
    );
};

const DropdownArrow = ({ width = '26', height = '13', color = '#E0E0E0' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 26 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M1 1L13 11L25 1'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    );
};

const BackArrowIcon = ({ width = '52', height = '30', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 52 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M50.0723 14.875L2.67642 14.875'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M18.9883 27.6348L2.36896 14.8743L18.9883 2.11393'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const LeftArrow = ({ width = '41', height = '22', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 41 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M32.1616 10.9375L8.4637 10.9375'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M16.6191 17.3177L8.30948 10.9375L16.6191 4.55729'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const RightArrow = ({ width = '41', height = '22', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 41 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M8.46338 10.9375L32.1613 10.9375'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M24.0059 4.55729L32.3155 10.9375L24.0059 17.3177'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const CircledCheck = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M15.9994 30.9003C24.2289 30.9003 30.9003 24.229 30.9003 15.9994C30.9003 7.76991 24.2289 1.09856 15.9994 1.09856C7.76987 1.09856 1.09851 7.76991 1.09851 15.9994C1.09851 24.229 7.76987 30.9003 15.9994 30.9003Z'
                stroke={color}
                strokeWidth='2'
            />
            <path
                d='M10 15.5308L13.6421 20L22 12'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    );
};

const CircledFilledCheck = ({
    width = '30',
    height = '30',
    background = '#E8EDFF',
    color = '#0040FF',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M29.499 14.9995C29.499 23.0073 23.0073 29.499 14.9995 29.499C6.99164 29.499 0.5 23.0073 0.5 14.9995C0.5 6.99164 6.99164 0.5 14.9995 0.5C23.0073 0.5 29.499 6.99164 29.499 14.9995Z'
                fill={background}
                stroke={background}
            />
            <path
                d='M14.9994 28.9691C22.7146 28.9691 28.969 22.7147 28.969 14.9995C28.969 7.2843 22.7146 1.02991 14.9994 1.02991C7.28418 1.02991 1.02979 7.2843 1.02979 14.9995C1.02979 22.7147 7.28418 28.9691 14.9994 28.9691Z'
                fill={background}
                stroke={background}
                strokeWidth='2'
            />
            <path
                d='M9.375 14.5601L12.7894 18.75L20.625 11.25'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    );
};

const Check = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M26.6667 8L12 22.6667L5.33337 16'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const HamburgerMenu = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4 16H28'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M4 9H28'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M4 23H28'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const Edit = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 34 34'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M25.2335 2.30416C26.0936 1.46222 27.2511 0.993601 28.4546 1.00007C29.6581 1.00653 30.8105 1.48756 31.6615 2.33869C32.5125 3.18983 32.9935 4.34236 32.9999 5.54603C33.0064 6.7497 32.5378 7.90734 31.696 8.76757L9.88332 30.5832L1 33L3.42292 24.1198L25.2335 2.30416Z'
                fill={color}
                stroke='white'
                strokeWidth='0.25'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M20.2435 7.31021L26.9183 13.9267'
                stroke='white'
                strokeWidth='2'
            />
        </svg>
    );
};

const EmptyEdit = ({ width = '29', height = '29', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M16.1459 1.8151C16.6835 1.28889 17.4069 0.996 18.1591 1.00004C18.9113 1.00408 19.6315 1.30472 20.1634 1.83668C20.6953 2.36864 20.9959 3.08898 21 3.84127C21.004 4.59357 20.7112 5.31709 20.185 5.85473L6.55208 19.4895L1 21L2.51432 15.4499L16.1459 1.8151Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M13.0272 4.94388L17.1989 9.07921'
                stroke={color}
                strokeWidth='2'
            />
        </svg>
    );
};

const Lock = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M25.3333 14.6667H6.66667C5.19391 14.6667 4 15.8606 4 17.3333V26.6667C4 28.1394 5.19391 29.3333 6.66667 29.3333H25.3333C26.8061 29.3333 28 28.1394 28 26.6667V17.3333C28 15.8606 26.8061 14.6667 25.3333 14.6667Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9.33337 14.6667V9.33332C9.33337 7.56521 10.0358 5.86952 11.286 4.61928C12.5362 3.36904 14.2319 2.66666 16 2.66666C17.7682 2.66666 19.4638 3.36904 20.7141 4.61928C21.9643 5.86952 22.6667 7.56521 22.6667 9.33332V14.6667'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const CircledMinus = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M22.364 16.4558H9.63604'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M31.4989 15.9994C31.4989 24.5596 24.5596 31.4989 15.9994 31.4989C7.43934 31.4989 0.5 24.5596 0.5 15.9994C0.5 7.43934 7.43934 0.5 15.9994 0.5C24.5596 0.5 31.4989 7.43934 31.4989 15.9994Z'
                stroke={color}
            />
            <path
                d='M15.9994 30.9003C24.2289 30.9003 30.9003 24.229 30.9003 15.9994C30.9003 7.76991 24.2289 1.09856 15.9994 1.09856C7.76987 1.09856 1.09851 7.76991 1.09851 15.9994C1.09851 24.229 7.76987 30.9003 15.9994 30.9003Z'
                stroke={color}
                strokeWidth='2'
            />
        </svg>
    );
};

const CircledPlus = ({ width = '38', height = '38', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={'0 0 ' + width + ' ' + height}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M26.1602 19.5135H11.8408'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M19.0005 12.3538V26.6732'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M35.75 19C35.75 28.2508 28.2508 35.75 19 35.75C9.74923 35.75 2.25 28.2508 2.25 19C2.25 9.74923 9.74923 2.25 19 2.25C28.2508 2.25 35.75 9.74923 35.75 19Z'
                stroke={color}
                strokeWidth='2.5'
            />
            <path
                d='M18.9999 35.7641C28.2585 35.7641 35.764 28.2585 35.764 19C35.764 9.74146 28.2585 2.23593 18.9999 2.23593C9.74137 2.23593 2.23584 9.74146 2.23584 19C2.23584 28.2585 9.74137 35.7641 18.9999 35.7641Z'
                stroke={color}
                strokeWidth='3'
            />
        </svg>
    );
};

const NoteIcon = ({ width = '32', height = '32', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M25.0792 15.4608C24.9533 13.3835 24.0186 11.4282 22.4621 9.98658C20.9056 8.54493 18.8419 7.72313 16.6837 7.68496C14.5256 7.64678 12.432 8.39489 10.8217 9.78052C9.2113 11.1661 8.20274 13.0869 7.99783 15.1584C7.95368 16.6645 8.36722 18.1501 9.18751 19.4326C10.0078 20.7151 11.1991 21.7386 12.6149 22.377C12.7587 22.4408 12.881 22.5424 12.9676 22.6701C13.0543 22.7979 13.1019 22.9469 13.1049 23.0995V26.725C13.108 26.8339 13.1334 26.9413 13.1795 27.0408C13.2256 27.1402 13.2915 27.23 13.3736 27.3049C13.4557 27.3797 13.5523 27.4382 13.6579 27.477C13.7634 27.5158 13.8758 27.5342 13.9887 27.5311H19.0821C19.195 27.5342 19.3075 27.5158 19.413 27.477C19.5186 27.4382 19.6152 27.3797 19.6973 27.3049C19.7794 27.23 19.8453 27.1402 19.8914 27.0408C19.9375 26.9413 19.9629 26.8339 19.966 26.725V23.0995C19.969 22.9469 20.0166 22.7979 20.1033 22.6701C20.1899 22.5424 20.3122 22.4408 20.456 22.377C21.8228 21.7592 22.9813 20.7827 23.799 19.5595C24.6166 18.3362 25.0603 16.9159 25.0792 15.4608V15.4608Z'
                stroke={color}
                strokeWidth='2'
                strokeMiterlimit='10'
            />
            <path
                d='M3.5941 15.2521H1.0448'
                stroke={color}
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M16 3.46479V1.0072'
                stroke={color}
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M30.9552 15.2521H28.4059'
                stroke={color}
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M6.63449 7.04039L4.66296 5.48224'
                stroke={color}
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M25.3656 7.04039L27.3371 5.48224'
                stroke={color}
                strokeWidth='2'
                strokeMiterlimit='10'
                strokeLinecap='round'
            />
            <path
                d='M14.0762 30.993H18.6135'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    );
};

const CircledX = ({ width = '26', height = '26', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M16.5984 9.3999L9.39844 16.5999'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9.39844 9.3999L16.5984 16.5999'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M13.0003 24.1761C19.1726 24.1761 24.1763 19.1724 24.1763 13C24.1763 6.82766 19.1726 1.82397 13.0003 1.82397C6.82791 1.82397 1.82422 6.82766 1.82422 13C1.82422 19.1724 6.82791 24.1761 13.0003 24.1761Z'
                stroke={color}
                strokeWidth='2'
            />
        </svg>
    );
};

const LinkIcon = ({ width = '34', height = '18', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 34 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.9091 15.6364H8.81818C7.92281 15.6364 7.0362 15.46 6.20898 15.1174C5.38176 14.7747 4.63013 14.2725 3.997 13.6394C2.71834 12.3607 2 10.6265 2 8.81818C2 7.00989 2.71834 5.27566 3.997 3.997C5.27566 2.71834 7.00989 2 8.81818 2H12.9091'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M21.0909 1.99999L25.1818 1.99999C26.0772 1.99999 26.9638 2.17634 27.791 2.51899C28.6182 2.86164 29.3699 3.36386 30.003 3.99699C31.2817 5.27564 32 7.00988 32 8.81817C32 10.6265 31.2817 12.3607 30.003 13.6394C28.7243 14.918 26.9901 15.6364 25.1818 15.6364L21.0909 15.6364'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11.5454 8.81824H22.4545'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const UnlinkIcon = ({ width = '22', height = '20', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 22 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M13.8944 18.0114L8.09069 1'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
            <path
                d='M9 14.9999H6C5.34339 14.9999 4.69321 14.8706 4.08658 14.6193C3.47995 14.3681 2.92876 13.9998 2.46447 13.5355C1.52678 12.5978 1 11.326 1 9.99993C1 8.67384 1.52678 7.40207 2.46447 6.46439C3.40215 5.52671 4.67392 4.99993 6 4.99993H9'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M13 4.99992L16 4.99993C16.6566 4.99993 17.3068 5.12925 17.9134 5.38053C18.52 5.6318 19.0712 6.0001 19.5355 6.46439C20.4732 7.40207 21 8.67384 21 9.99993C21 11.326 20.4732 12.5978 19.5355 13.5355C18.5979 14.4731 17.3261 14.9999 16 14.9999L13 14.9999'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M7 9.99993H15'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const InfoIcon = ({ width = '19', height = '19', color = 'black' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 19 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M9.33333 17.6667C13.9357 17.6667 17.6667 13.9357 17.6667 9.33333C17.6667 4.73096 13.9357 1 9.33333 1C4.73096 1 1 4.73096 1 9.33333C1 13.9357 4.73096 17.6667 9.33333 17.6667Z'
                stroke={color}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M9.33337 12.9969V8.70197'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <mask id='path-3-inside-1' fill='white'>
                <ellipse cx='9.33337' cy='5.33334' rx='1' ry='1' />
            </mask>
            <ellipse cx='9.33337' cy='5.33334' rx='1' ry='1' fill={color} />
            <path
                d='M8.83337 5.33334C8.83337 5.0572 9.05723 4.83334 9.33337 4.83334V7.83334C10.7141 7.83334 11.8334 6.71406 11.8334 5.33334H8.83337ZM9.33337 4.83334C9.60952 4.83334 9.83337 5.0572 9.83337 5.33334H6.83337C6.83337 6.71406 7.95266 7.83334 9.33337 7.83334V4.83334ZM9.83337 5.33334C9.83337 5.60949 9.60952 5.83334 9.33337 5.83334V2.83334C7.95266 2.83334 6.83337 3.95263 6.83337 5.33334H9.83337ZM9.33337 5.83334C9.05723 5.83334 8.83337 5.60949 8.83337 5.33334H11.8334C11.8334 3.95263 10.7141 2.83334 9.33337 2.83334V5.83334Z'
                fill={color}
                mask='url(#path-3-inside-1)'
            />
        </svg>
    );
};

const HelpIcon = ({ width = '22', height = '22', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8.08984 7.99996C8.32495 7.33163 8.789 6.76807 9.3998 6.40909C10.0106 6.05012 10.7287 5.9189 11.427 6.03867C12.1253 6.15844 12.7587 6.52148 13.2149 7.06349C13.6712 7.60549 13.9209 8.29148 13.9198 8.99996C13.9198 11 10.9198 12 10.9198 12'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11 16H11.01'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const ForwardArrow = ({ width = '13', height = '24', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 13 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M2 22L10.5714 12L2 2'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
            />
        </svg>
    );
};

const HomeIcon = ({ width = '32', height = '32', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M2 11.8L16 2L30 11.8V27.2C30 27.9426 29.6722 28.6548 29.0888 29.1799C28.5053 29.705 27.714 30 26.8889 30H5.11111C4.28599 30 3.49467 29.705 2.91122 29.1799C2.32778 28.6548 2 27.9426 2 27.2V11.8Z'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M11.333 30V16H20.6663V30'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const SupportIcon = ({ width = '32', height = '32', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 38 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M4.89864 19.1402L1.9831 25.564L8.84047 22.9109C11.0241 24.1388 13.4223 24.6886 15.8219 24.5114C22.4795 24.0853 27.6591 18.6549 27.3893 12.37C27.1196 6.08496 21.5025 1.34553 14.846 1.77151C8.1895 2.1975 3.0078 7.62801 3.27754 13.913C3.37112 15.8264 3.9435 17.6586 4.91732 19.1619'
                stroke={color}
                strokeWidth='3'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M33.125 25.1338L36.0001 30.2208L30.1338 28.725C28.4189 29.9892 26.4719 30.7085 24.4706 30.8172C18.928 31.1706 14.2513 27.1575 14.0236 21.8526C13.796 16.5478 18.1035 11.9584 23.645 11.6038C29.1865 11.2492 33.8632 15.2623 34.0909 20.5684C34.1518 22.1841 33.8099 23.7843 33.1104 25.1577'
                fill='white'
            />
            <path
                d='M33.125 25.1338L36.0001 30.2208L30.1338 28.725C28.4189 29.9892 26.4719 30.7085 24.4706 30.8172C18.928 31.1706 14.2513 27.1575 14.0236 21.8526C13.796 16.5478 18.1035 11.9584 23.645 11.6038C29.1865 11.2492 33.8632 15.2623 34.0909 20.5684C34.1518 22.1841 33.8099 23.7843 33.1104 25.1577'
                stroke={color}
                strokeWidth='3'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const SettingsIcon = ({ width = '32', height = '32', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 35 35'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M17.4997 21.7273C19.8344 21.7273 21.727 19.8347 21.727 17.5C21.727 15.1654 19.8344 13.2728 17.4997 13.2728C15.1651 13.2728 13.2725 15.1654 13.2725 17.5C13.2725 19.8347 15.1651 21.7273 17.4997 21.7273Z'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M27.9273 21.7273C27.7397 22.1523 27.6837 22.6237 27.7666 23.0808C27.8495 23.5379 28.0674 23.9597 28.3923 24.2918L28.4768 24.3764C28.7388 24.6381 28.9467 24.9489 29.0885 25.291C29.2304 25.6332 29.3034 25.9999 29.3034 26.3702C29.3034 26.7406 29.2304 27.1073 29.0885 27.4494C28.9467 27.7915 28.7388 28.1024 28.4768 28.3641C28.2151 28.6261 27.9043 28.834 27.5621 28.9758C27.22 29.1176 26.8533 29.1906 26.483 29.1906C26.1126 29.1906 25.7459 29.1176 25.4038 28.9758C25.0616 28.834 24.7508 28.6261 24.4891 28.3641L24.4045 28.2795C24.0725 27.9547 23.6507 27.7368 23.1936 27.6539C22.7365 27.571 22.265 27.627 21.84 27.8145C21.4232 27.9932 21.0678 28.2898 20.8174 28.6678C20.5671 29.0458 20.4327 29.4888 20.4309 29.9423V30.1818C20.4309 30.9292 20.134 31.6461 19.6055 32.1746C19.077 32.7031 18.3602 33 17.6127 33C16.8653 33 16.1485 32.7031 15.62 32.1746C15.0915 31.6461 14.7945 30.9292 14.7945 30.1818V30.055C14.7836 29.5886 14.6327 29.1363 14.3613 28.7568C14.0899 28.3773 13.7106 28.0883 13.2727 27.9273C12.8477 27.7397 12.3763 27.6837 11.9192 27.7666C11.4621 27.8495 11.0403 28.0674 10.7082 28.3923L10.6236 28.4768C10.3619 28.7388 10.0511 28.9467 9.70897 29.0885C9.36685 29.2304 9.00013 29.3034 8.62977 29.3034C8.25942 29.3034 7.8927 29.2304 7.55058 29.0885C7.20846 28.9467 6.89764 28.7388 6.63591 28.4768C6.37388 28.2151 6.16602 27.9043 6.0242 27.5621C5.88237 27.22 5.80937 26.8533 5.80937 26.483C5.80937 26.1126 5.88237 25.7459 6.0242 25.4038C6.16602 25.0616 6.37388 24.7508 6.63591 24.4891L6.72045 24.4045C7.0453 24.0725 7.26322 23.6507 7.3461 23.1936C7.42898 22.7365 7.37303 22.265 7.18545 21.84C7.00683 21.4232 6.71025 21.0678 6.3322 20.8174C5.95416 20.5671 5.51115 20.4327 5.05773 20.4309H4.81818C4.07075 20.4309 3.35394 20.134 2.82543 19.6055C2.29691 19.077 2 18.3602 2 17.6127C2 16.8653 2.29691 16.1485 2.82543 15.62C3.35394 15.0915 4.07075 14.7945 4.81818 14.7945H4.945C5.4114 14.7836 5.86373 14.6327 6.24319 14.3613C6.62265 14.0899 6.91169 13.7106 7.07273 13.2727C7.2603 12.8477 7.31625 12.3763 7.23337 11.9192C7.15049 11.4621 6.93257 11.0403 6.60773 10.7082L6.52318 10.6236C6.26116 10.3619 6.05329 10.0511 5.91147 9.70897C5.76964 9.36685 5.69665 9.00013 5.69665 8.62977C5.69665 8.25942 5.76964 7.8927 5.91147 7.55058C6.05329 7.20846 6.26116 6.89764 6.52318 6.63591C6.78491 6.37388 7.09573 6.16602 7.43785 6.0242C7.77997 5.88237 8.14669 5.80937 8.51705 5.80937C8.8874 5.80937 9.25412 5.88237 9.59624 6.0242C9.93836 6.16602 10.2492 6.37388 10.5109 6.63591L10.5955 6.72045C10.9275 7.0453 11.3493 7.26322 11.8064 7.3461C12.2635 7.42898 12.735 7.37303 13.16 7.18545H13.2727C13.6895 7.00683 14.0449 6.71025 14.2953 6.3322C14.5457 5.95416 14.68 5.51115 14.6818 5.05773V4.81818C14.6818 4.07075 14.9787 3.35394 15.5072 2.82543C16.0358 2.29691 16.7526 2 17.5 2C18.2474 2 18.9642 2.29691 19.4928 2.82543C20.0213 3.35394 20.3182 4.07075 20.3182 4.81818V4.945C20.32 5.39843 20.4543 5.84143 20.7047 6.21947C20.9551 6.59752 21.3105 6.89411 21.7273 7.07273C22.1523 7.2603 22.6237 7.31625 23.0808 7.23337C23.5379 7.15049 23.9597 6.93257 24.2918 6.60773L24.3764 6.52318C24.6381 6.26116 24.9489 6.05329 25.291 5.91147C25.6332 5.76964 25.9999 5.69665 26.3702 5.69665C26.7406 5.69665 27.1073 5.76964 27.4494 5.91147C27.7915 6.05329 28.1024 6.26116 28.3641 6.52318C28.6261 6.78491 28.834 7.09573 28.9758 7.43785C29.1176 7.77997 29.1906 8.14669 29.1906 8.51705C29.1906 8.8874 29.1176 9.25412 28.9758 9.59624C28.834 9.93836 28.6261 10.2492 28.3641 10.5109L28.2795 10.5955C27.9547 10.9275 27.7368 11.3493 27.6539 11.8064C27.571 12.2635 27.627 12.735 27.8145 13.16V13.2727C27.9932 13.6895 28.2898 14.0449 28.6678 14.2953C29.0458 14.5457 29.4888 14.68 29.9423 14.6818H30.1818C30.9292 14.6818 31.6461 14.9787 32.1746 15.5072C32.7031 16.0358 33 16.7526 33 17.5C33 18.2474 32.7031 18.9642 32.1746 19.4928C31.6461 20.0213 30.9292 20.3182 30.1818 20.3182H30.055C29.6016 20.32 29.1586 20.4543 28.7805 20.7047C28.4025 20.9551 28.1059 21.3105 27.9273 21.7273V21.7273Z'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const SignOutIcon = ({ width = '32', height = '32', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={'0 0 ' + width + ' ' + height}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11.3333 29.9999H5.1111C4.28598 29.9999 3.49466 29.6721 2.91122 29.0887C2.32778 28.5052 2 27.7139 2 26.8888V5.1111C2 4.28598 2.32778 3.49466 2.91122 2.91122C3.49466 2.32778 4.28598 2 5.1111 2H11.3333'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M20.2227 23.7777L28.0004 15.9999L20.2227 8.22217'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M27.9996 15.9999H9.33301'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const CallIcon = ({ width = '22', height = '22', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={'0 0 ' + width + ' ' + height}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M13.388 4.82261C14.3232 5.00472 15.1827 5.46123 15.8565 6.1337C16.5302 6.80617 16.9876 7.66402 17.1701 8.59743M13.388 1C15.331 1.21544 17.1429 2.08388 18.5261 3.46272C19.9093 4.84157 20.7817 6.64887 21 8.58788M20.0425 16.214V19.0809C20.0436 19.3471 19.989 19.6105 19.8821 19.8544C19.7753 20.0983 19.6186 20.3172 19.4221 20.4971C19.2256 20.677 18.9937 20.814 18.7411 20.8993C18.4885 20.9845 18.2208 21.0162 17.9552 20.9922C15.0089 20.6727 12.1787 19.6678 9.69214 18.0584C7.37869 16.5911 5.4173 14.6335 3.94724 12.3245C2.32908 9.83138 1.32206 6.99289 1.00777 4.03897C0.983845 3.7747 1.01531 3.50836 1.10017 3.25689C1.18503 3.00543 1.32141 2.77435 1.50065 2.57838C1.67989 2.3824 1.89804 2.22582 2.14123 2.11861C2.38442 2.0114 2.64731 1.9559 2.91316 1.95565H5.78561C6.25028 1.95109 6.70076 2.11532 7.05309 2.41774C7.40541 2.72016 7.63554 3.14013 7.70057 3.59937C7.82181 4.51686 8.04665 5.41772 8.37081 6.28476C8.49963 6.62681 8.52751 6.99855 8.45115 7.35593C8.37478 7.71331 8.19737 8.04135 7.93994 8.30118L6.72394 9.51486C8.08697 11.9074 10.0717 13.8883 12.4688 15.2488L13.6848 14.0351C13.9452 13.7782 14.2738 13.6011 14.6319 13.5249C14.99 13.4486 15.3624 13.4765 15.7051 13.6051C16.5738 13.9286 17.4764 14.153 18.3957 14.274C18.8608 14.3395 19.2855 14.5733 19.5892 14.931C19.8928 15.2887 20.0542 15.7453 20.0425 16.214Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const EmailIcon = ({ width = '22', height = '19', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={'0 0 ' + width + ' ' + height}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M3 1H19C20.1 1 21 1.9 21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3C1 1.9 1.9 1 3 1Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M20.274 1.90918L11.0009 10.0001L1.72852 1.90918'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const TransferIcon = ({
    width = '25',
    height = '25',
    background = '#E8EDFF',
    color = '#0040FF',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0)'>
                <path
                    d='M12.8125 22.5206H24.1389V9.54657H12.8125V22.5206Z'
                    fill={background}
                    stroke={color}
                    strokeWidth='2'
                    strokeLinejoin='round'
                />
                <path
                    d='M4.14307 13.9607H15.4695V0.986633H4.14307V13.9607Z'
                    fill={background}
                    stroke={color}
                    strokeWidth='2'
                    strokeLinejoin='round'
                />
                <path
                    d='M6.64502 17.9901L9.27379 21.0012L6.64502 24.0084'
                    stroke={color}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M0.861328 14.3761V18.5919C0.861328 19.2309 1.08293 19.8437 1.47739 20.2956C1.87184 20.7474 2.40684 21.0013 2.96469 21.0013H9.27476'
                    stroke={color}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </g>
            <defs>
                <clipPath id='clip0'>
                    <path d='M0 0H25V25H0V0Z' fill='white' />
                </clipPath>
            </defs>
        </svg>
    );
};

const RefreshIcon = ({ width = '51', height = '51', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 51 51'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11.3844 17.5186C13.3237 14.1595 16.3677 11.5769 19.9978 10.2106C23.6279 8.84434 27.6194 8.77902 31.2922 10.0258C34.965 11.2725 38.0919 13.7542 40.1401 17.048C42.1883 20.3418 43.0311 24.2438 42.5248 28.0893C42.0186 31.9348 40.1946 35.4858 37.3637 38.1372C34.5328 40.7887 30.8701 42.3765 26.9998 42.6302C23.1294 42.8838 19.2908 41.7877 16.138 39.5284C12.9853 37.2692 10.7134 33.9867 9.70952 30.2402'
                stroke={color}
                strokeWidth='3'
                strokeLinecap='round'
            />
            <path
                d='M9.66016 8.82617L9.24584 19.914L20.0646 17.451'
                stroke={color}
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const StarIcon = ({
    width = '17',
    height = '17',
    color = '#0040FF',
    halfStar = false,
}) => {
    if (halfStar) {
        return (
            <svg
                width={width}
                height={height}
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M7 0L9.163 4.60778L14 5.35121L10.5 8.93586L11.326 14L7 11.6078L2.674 14L3.5 8.93586L0 5.35121L4.837 4.60778L7 0Z'
                    fill='#FFDE03'
                />
                <path
                    d='M6.93848 11.6417L6.99987 11.6078L11.3259 14L10.4999 8.93586L13.9999 5.35121L9.16287 4.60778L6.99987 0L6.93848 0.13078V11.6417Z'
                    fill='#E8EDFF'
                />
            </svg>
        );
    }

    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 17 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M7 0L9.163 4.60778L14 5.35121L10.5 8.93586L11.326 14L7 11.6078L2.674 14L3.5 8.93586L0 5.35121L4.837 4.60778L7 0Z'
                fill={color}
            />
        </svg>
    );
};

const CrossIcon = ({ width = '30', height = '30', color = '#757985' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M19.219 11.209L10.7813 19.6468'
                stroke={color}
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M10.7812 11.209L19.219 19.6468'
                stroke={color}
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const PlusIcon = ({ width = '13', height = '13', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 13 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11 6.5H2'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M6.5 2V11'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const SearchIcon = ({ width = '13', height = '28' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 30 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <circle
                cx='12.7725'
                cy='11.9776'
                r='7.4138'
                transform='rotate(-46.6505 12.7725 11.9776)'
                stroke='#757985'
                strokeWidth='2.11823'
            />
            <line
                x1='18.9338'
                y1='17.7936'
                x2='27.1489'
                y2='25.5485'
                stroke='#757985'
                strokeWidth='2.8243'
                strokeLinecap='round'
            />
        </svg>
    );
};

const SearchBarIcon = ({ width = '30', height = '30' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.3218 7.33848C14.4861 4.66164 10.0173 4.79041 7.34049 7.62608C4.66366 10.4618 4.79242 14.9305 7.62809 17.6074C10.4638 20.2842 14.9325 20.1554 17.6094 17.3198C20.2862 14.4841 20.1574 10.0153 17.3218 7.33848ZM5.28672 5.68734C9.03428 1.7174 15.2906 1.53713 19.2605 5.2847C22.8818 8.70315 23.3498 14.209 20.5597 18.1629L27.8206 25.0172C28.3878 25.5525 28.4135 26.4463 27.8781 27.0134C27.3428 27.5806 26.449 27.6063 25.8819 27.0709L18.621 20.2167C14.8343 23.2298 9.31065 23.0796 5.68936 19.6611C1.71942 15.9136 1.53915 9.65729 5.28672 5.68734Z'
                fill='#757985'
            />
        </svg>
    );
};

const PipeSeparator = ({ width = '4', height = '26' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 4 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <line
                x1='2'
                y1='1.5'
                x2='2'
                y2='24.5'
                stroke='#E8E8E8'
                strokeWidth='3'
                strokeLinecap='round'
            />
        </svg>
    );
};

const SolidCircledCheck = ({
    width = '36',
    height = '36',
    isChecked = false,
    filledBackgroundColor = '#0040FF',
    filledBorderColor = '#0040FF',
    emptyBordercolor = '#757985',
}) => {
    return isChecked ? (
        <svg
            width={width}
            height={height}
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M34.4988 17.9994C34.4988 27.1117 27.1117 34.4988 17.9994 34.4988C8.88702 34.4988 1.5 27.1117 1.5 17.9994C1.5 8.88702 8.88702 1.5 17.9994 1.5C27.1117 1.5 34.4988 8.88702 34.4988 17.9994Z'
                fill={filledBackgroundColor}
                stroke={filledBorderColor}
                strokeWidth='3'
            />
            <path
                d='M11.25 17.4721L15.3473 22.5L24.75 13.5'
                stroke='white'
                strokeWidth='3'
                strokeLinecap='round'
            />
        </svg>
    ) : (
        <svg
            width={width}
            height={height}
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M34.4988 17.9994C34.4988 27.1117 27.1117 34.4988 17.9994 34.4988C8.88702 34.4988 1.5 27.1117 1.5 17.9994C1.5 8.88702 8.88702 1.5 17.9994 1.5C27.1117 1.5 34.4988 8.88702 34.4988 17.9994Z'
                stroke={emptyBordercolor}
                strokeWidth='3'
            />
        </svg>
    );
};

const TrashCan = ({ width = '22', height = '29', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 22 29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M21 10L1 10L1 9C1 7.89543 1.89543 7 3 7L19 7C20.1046 7 21 7.89543 21 9L21 10Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M14 7L8 7L8 5C8 3.89543 8.89543 3 10 3L12 3C13.1046 3 14 3.89543 14 5L14 7Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M4 10H18V24C18 25.1046 17.1046 26 16 26H6C4.89543 26 4 25.1046 4 24V10Z'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8.5 21.6316L8.5 14'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
            <path
                d='M13.5 21.6316L13.5 14'
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    );
};

const RadioCheck = ({ width = '25', height = '25', isChecked = false }) => {
    return isChecked ? (
        <svg
            width={width}
            height={height}
            viewBox='0 0 26 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M22.1409 12.5C22.1409 17.4706 18.1114 21.5 13.1409 21.5C8.17031 21.5 4.14087 17.4706 4.14087 12.5C4.14087 7.52944 8.17031 3.5 13.1409 3.5C18.1114 3.5 22.1409 7.52944 22.1409 12.5Z'
                fill='white'
                stroke='#0040FF'
                strokeWidth='7'
            />
        </svg>
    ) : (
        <svg
            width={width}
            height={height}
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z'
                fill='#F0F0F0'
            />
        </svg>
    );
};
const ReloadIcon = ({ width = '45', height = '35', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 45 35'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M8.97111 22.8053L9.19247 23.478L9.86403 23.2531L14.515 21.696L10.8245 30.5292L2.55929 25.6988L6.52353 24.3716L7.18884 24.1488L6.96886 23.4826C3.98918 14.4582 8.86423 4.71442 17.8849 1.69421C21.5391 0.470751 25.317 0.538189 28.7194 1.64992L27.9812 3.63254C25.0165 2.6823 21.7352 2.63405 18.556 3.69849C10.6443 6.34739 6.36638 14.8895 8.97111 22.8053ZM38.6344 10.5392L37.9691 10.762L38.1891 11.4282C41.1688 20.4526 36.2937 30.1964 27.273 33.2166C23.6188 34.44 19.8409 34.3726 16.4385 33.2609L17.1768 31.2782C20.1414 32.2285 23.4227 32.2767 26.602 31.2123C34.5136 28.5634 38.7916 20.0213 36.1868 12.1055L35.9655 11.4328L35.2939 11.6576L30.6429 13.2148L34.3334 4.38156L42.5987 9.21195L38.6344 10.5392Z'
                fill={color}
                stroke={color}
                strokeWidth='1.40909'
            />
        </svg>
    );
};

const SuccessCheck = ({ width = '62', height = '62', color = '#0040FF' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 62 62'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M19.375 30.0909L26.4315 38.75L42.625 23.25'
                stroke={color}
                strokeWidth='4.13333'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

const LineBreak = () => {
    return (
        <svg
            width='140'
            height='3'
            viewBox='0 0 140 3'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <line
                y1='1.14062'
                x2='140'
                y2='1.14062'
                stroke='#E8E8E8'
                strokeWidth='2'
            />
        </svg>
    );
};

const ProgressIcon = ({ width = '62', height = '62' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill='#E8EDFF'
            />
            <path
                d='M18.0273 36.4879L18.2465 37.1539L18.9114 36.9313L23.5161 35.3896L19.8623 44.1351L11.6792 39.3527L15.604 38.0386L16.2627 37.8181L16.0449 37.1585C13.0948 28.2237 17.9215 18.5767 26.8526 15.5865C30.4705 14.3752 34.2108 14.442 37.5795 15.5426L36.8485 17.5056C33.9133 16.5648 30.6646 16.517 27.517 17.5709C19.6839 20.1935 15.4484 28.6507 18.0273 36.4879ZM47.396 24.3437L46.7373 24.5642L46.9551 25.2238C49.9051 34.1586 45.0785 43.8056 36.1474 46.7958C32.5295 48.0071 28.7892 47.9403 25.4205 46.8396L26.1515 44.8767C29.0866 45.8175 32.3354 45.8653 35.483 44.8114C43.3161 42.1888 47.5516 33.7316 44.9727 25.8944L44.7535 25.2284L44.0886 25.451L39.4839 26.9927L43.1377 18.2471L51.3208 23.0296L47.396 24.3437Z'
                fill='#0040FF'
                stroke='#0040FF'
                strokeWidth='1.3951'
            />
        </svg>
    );
};

const CheckTileIcon = ({ width = '62', height = '62' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill='#E8EDFF'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M44.1183 21.821C44.9075 22.6455 44.8789 23.9538 44.0544 24.743L27.8609 40.243C27.4443 40.6418 26.8799 40.8483 26.3043 40.8127C25.7287 40.7772 25.1941 40.5027 24.8298 40.0556L17.7733 31.3964C17.0522 30.5116 17.185 29.2099 18.0698 28.4888C18.9546 27.7678 20.2564 27.9005 20.9774 28.7853L26.6199 35.7093L41.1963 21.757C42.0208 20.9678 43.3291 20.9964 44.1183 21.821Z'
                fill='#0040FF'
            />
        </svg>
    );
};

const AlertTileIcon = ({ width = '62', height = '62' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill='#FF331F'
            />
            <path
                d='M33.7354 18.3553H27.9459L28.4663 37.0118H33.228L33.7354 18.3553ZM30.8471 45.3382C32.5124 45.3382 33.9565 43.9462 33.9695 42.2158C33.9565 40.5115 32.5124 39.1194 30.8471 39.1194C29.1298 39.1194 27.7117 40.5115 27.7247 42.2158C27.7117 43.9462 29.1298 45.3382 30.8471 45.3382Z'
                fill='white'
            />
        </svg>
    );
};

const PlusTileIcon = ({ width = '62', height = '62' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill='#E8EDFF'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M31.4091 15.5C32.9328 15.5 34.168 16.7352 34.168 18.2589L34.168 42.0502C34.168 43.5739 32.9328 44.8091 31.4091 44.8091C29.8854 44.8091 28.6503 43.5739 28.6503 42.0502L28.6503 18.2589C28.6503 16.7352 29.8854 15.5 31.4091 15.5Z'
                fill='#0040FF'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M16.6914 30.093C16.6914 28.5693 17.9266 27.3342 19.4503 27.3342L43.2416 27.3342C44.7653 27.3342 46.0005 28.5693 46.0005 30.093C46.0005 31.6167 44.7653 32.8519 43.2416 32.8519L19.4503 32.8519C17.9266 32.8519 16.6914 31.6167 16.6914 30.093Z'
                fill='#0040FF'
            />
        </svg>
    );
};

const CrossTileIcon = ({ width = '62', height = '62' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill='#E8EDFF'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.4428 18.7566C19.7688 17.4305 21.9187 17.4305 23.2447 18.7566L43.95 39.4619C45.2761 40.7879 45.2761 42.9378 43.95 44.2638C42.624 45.5899 40.4741 45.5899 39.148 44.2638L18.4428 23.5586C17.1167 22.2325 17.1167 20.0826 18.4428 18.7566Z'
                fill='#0040FF'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.3346 44.2643C17.0086 42.9382 17.0086 40.7883 18.3346 39.4623L39.0399 18.757C40.3659 17.431 42.5158 17.431 43.8419 18.757C45.1679 20.083 45.1679 22.2329 43.8418 23.559L23.1366 44.2643C21.8105 45.5903 19.6606 45.5903 18.3346 44.2643Z'
                fill='#0040FF'
            />
        </svg>
    );
};

const NumberOneIcon = ({
    width = '62',
    height = '62',
    color = '#0040FF',
    backgroundColor = '#E8EDFF',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill={backgroundColor}
            />
            <path
                d='M34.9218 20.1818H30.5858L25.1846 23.6016V27.6925L30.181 24.5604H30.3089V42H34.9218V20.1818Z'
                fill={color}
            />
        </svg>
    );
};

const NumberTwoIcon = ({
    width = '62',
    height = '62',
    color = '#0040FF',
    backgroundColor = '#E8EDFF',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill={backgroundColor}
            />
            <path
                d='M23.3202 42H38.8742V38.2287H29.7123V38.0795L32.8976 34.9581C37.3827 30.8672 38.5866 28.8217 38.5866 26.3395C38.5866 22.5575 35.4971 19.8835 30.8202 19.8835C26.2393 19.8835 23.0965 22.6214 23.1072 26.9041H27.4857C27.4751 24.8161 28.7961 23.5376 30.7883 23.5376C32.7059 23.5376 34.1334 24.7308 34.1334 26.6484C34.1334 28.3849 33.0681 29.5781 31.0866 31.4851L23.3202 38.6761V42Z'
                fill={color}
            />
        </svg>
    );
};

const NumberThreeIcon = ({
    width = '62',
    height = '62',
    color = '#0040FF',
    backgroundColor = '#E8EDFF',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12C0 5.37258 5.37258 0 12 0H50C56.6274 0 62 5.37258 62 12V50C62 56.6274 56.6274 62 50 62H12C5.37258 62 0 56.6274 0 50V12Z'
                fill={backgroundColor}
            />
            <path
                d='M30.9454 42.2983C35.846 42.2983 39.3509 39.603 39.3403 35.8743C39.3509 33.1577 37.6251 31.2188 34.4184 30.8139V30.6435C36.858 30.2067 38.5413 28.4808 38.5306 26.0305C38.5413 22.5895 35.5264 19.8835 31.0093 19.8835C26.5349 19.8835 23.1684 22.5043 23.1045 26.2756H27.5257C27.5789 24.6136 29.1024 23.5376 30.988 23.5376C32.8524 23.5376 34.0988 24.6669 34.0882 26.3075C34.0988 28.0227 32.6393 29.1839 30.5406 29.1839H28.5058V32.5717H30.5406C33.0122 32.5717 34.5569 33.8075 34.5463 35.5653C34.5569 37.3018 33.0654 38.495 30.9561 38.495C28.9213 38.495 27.3978 37.4297 27.3126 35.8317H22.6677C22.7423 39.6456 26.1514 42.2983 30.9454 42.2983Z'
                fill={color}
            />
        </svg>
    );
};

const PuzzlePieceA = ({ width = '52', height = '71' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 5.15832C0 2.30946 2.32812 0 5.2 0H46.8C49.6719 0 52 2.30946 52 5.15832V46.4249C52 49.2738 49.6719 51.5832 46.8 51.5832H34.7936C32.8089 51.5832 31.2 53.1792 31.2 55.148C31.2 56.162 31.6723 57.1022 32.2794 57.918C33.2351 59.2019 33.8 60.7891 33.8 62.5081C33.8 66.7811 30.3078 70.2456 26 70.2456C21.6922 70.2456 18.2 66.7811 18.2 62.5081C18.2 60.7891 18.7649 59.2019 19.7206 57.918C20.3277 57.1022 20.8 56.162 20.8 55.148C20.8 53.1792 19.1911 51.5832 17.2064 51.5832H5.2C2.32812 51.5832 0 49.2738 0 46.4249V34.4891C0.0139443 32.5322 1.61748 30.95 3.59352 30.95C4.61571 30.95 5.56352 31.4185 6.38583 32.0208C7.6801 32.9688 9.28018 33.5292 11.0131 33.5292C15.3206 33.5292 18.8131 30.065 18.8131 25.7917C18.8131 21.5184 15.3206 18.0542 11.0131 18.0542C9.28018 18.0542 7.6801 18.6146 6.38583 19.5626C5.56352 20.1649 4.61571 20.6334 3.59352 20.6334C1.61747 20.6334 0.0139284 19.0512 0 17.0943V5.15832Z'
                fill='#0040FF'
            />
        </svg>
    );
};

const PuzzlePieceB = ({ width = '52', height = '52' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M46.8 -2.30969e-07L34.7936 -7.64258e-07C32.8089 -8.52412e-07 31.2 1.60891 31.2 3.59361C31.2 4.6158 31.6723 5.56361 32.2794 6.38592C33.2351 7.68019 33.8 9.28027 33.8 11.0132C33.8 15.3207 30.3078 18.8132 26 18.8132C21.6922 18.8132 18.2 15.3207 18.2 11.0132C18.2 9.28027 18.7649 7.68019 19.7206 6.38592C20.3277 5.56361 20.8 4.6158 20.8 3.59361C20.8 1.60891 19.1911 -1.45728e-06 17.2064 -1.54543e-06L5.2 -2.07872e-06C2.32812 -2.20628e-06 -1.00149e-07 2.32812 -2.23688e-07 5.2L-2.01319e-06 46.8C-2.13673e-06 49.6719 2.32812 52 5.2 52L46.8 52C49.6719 52 52 49.6719 52 46.8L52 5.2C52 2.32812 49.6719 -1.03408e-07 46.8 -2.30969e-07Z'
                fill='#0040FF'
            />
        </svg>
    );
};

const DownArrow = ({ width = '24', height = '50' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M10.9023 49.0977C11.5085 49.704 12.4915 49.704 13.0977 49.0977L22.9774 39.2181C23.5837 38.6118 23.5837 37.6288 22.9774 37.0226C22.3712 36.4163 21.3882 36.4163 20.7819 37.0226L12 45.8045L3.21806 37.0226C2.61179 36.4163 1.62884 36.4163 1.02257 37.0226C0.416306 37.6288 0.416306 38.6118 1.02257 39.2181L10.9023 49.0977ZM13.5524 2C13.5524 1.14261 12.8574 0.447557 12 0.447557C11.1426 0.447557 10.4476 1.14261 10.4476 2L13.5524 2ZM13.5524 48L13.5524 2L10.4476 2L10.4476 48L13.5524 48Z'
                fill='#B7C5FF'
            />
        </svg>
    );
};

const ConnectedPuzzle = ({ width = '87', height = '170' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 75.1698C0 73.5129 1.34315 72.1698 3 72.1698H84C85.6569 72.1698 87 73.5129 87 75.1698V165C87 167.761 84.7614 170 82 170H5C2.23858 170 0 167.761 0 165V75.1698Z'
                fill='#B7C5FF'
            />
            <path
                d='M0 8.54866C0 3.82737 3.89512 0 8.7 0H78.3C83.1049 0 87 3.82737 87 8.54866V76.938C87 81.6593 87 86.1471 87 86.1471H58.2124C54.8918 86.1471 52.2 88.7921 52.2 92.0549C52.2 93.7353 52.9902 95.2935 54.006 96.6454C55.6049 98.7731 56.55 101.404 56.55 104.252C56.55 111.334 50.7073 117.075 43.5 117.075C36.2927 117.075 30.45 111.334 30.45 104.252C30.45 101.404 31.3951 98.7731 32.994 96.6454C34.0098 95.2935 34.8 93.7353 34.8 92.0549C34.8 88.7921 32.1082 86.1471 28.7876 86.1471C28.7876 86.1471 13.5049 86.1471 8.7 86.1471C3.89513 86.1471 0 86.1471 0 86.1471V57.1573C0.0233298 53.9141 2.70616 51.2921 6.01224 51.2921C7.72243 51.2921 9.30819 52.0685 10.684 53.0667C12.8494 54.6378 15.5265 55.5665 18.4258 55.5665C25.6326 55.5665 31.4758 49.8254 31.4758 42.7435C31.4758 35.6615 25.6326 29.9205 18.4258 29.9205C15.5265 29.9205 12.8494 30.8492 10.684 32.4202C9.30819 33.4184 7.72243 34.1948 6.01224 34.1948C2.70615 34.1948 0.0233032 31.5728 0 28.3296V8.54866Z'
                fill='#0040FF'
            />
        </svg>
    );
};

export {
    FoodType,
    AlertIcon,
    DropdownArrow,
    BackArrowIcon,
    CircledCheck,
    CircledFilledCheck,
    Check,
    LeftArrow,
    RightArrow,
    ForwardArrow,
    HamburgerMenu,
    Edit,
    EmptyEdit,
    Lock,
    CircledMinus,
    CircledPlus,
    NoteIcon,
    CircledX,
    LinkIcon,
    UnlinkIcon,
    InfoIcon,
    HelpIcon,
    HomeIcon,
    SupportIcon,
    SettingsIcon,
    SignOutIcon,
    CallIcon,
    EmailIcon,
    TransferIcon,
    RefreshIcon,
    StarIcon,
    CrossIcon,
    PlusIcon,
    SearchIcon,
    SearchBarIcon,
    PipeSeparator,
    SolidCircledCheck,
    TrashCan,
    RadioCheck,
    ReloadIcon,
    SuccessCheck,
    LineBreak,
    ProgressIcon,
    CheckTileIcon,
    AlertTileIcon,
    CrossTileIcon,
    PlusTileIcon,
    NumberOneIcon,
    NumberTwoIcon,
    NumberThreeIcon,
    PuzzlePieceA,
    PuzzlePieceB,
    DownArrow,
    ConnectedPuzzle,
};
