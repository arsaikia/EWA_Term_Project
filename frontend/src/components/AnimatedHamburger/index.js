import React, { useState } from 'react';
import './style.css';

const AnimatedHamburger = ({ isMenuOpen = false, setShowSidebar }) => {
    const [menuOpen, setMenuOpen] = useState(isMenuOpen);

    const [classN, setClassN] = useState(
        isMenuOpen ? 'menu-btn open' : 'menu-btn '
    );
    const menuBtn = document.querySelector('.menu-btn');
    return (
        <div
            className={classN}
            onClick={() => {
                if (!menuOpen) {
                    setClassN('menu-btn open');
                    setShowSidebar(true);
                    setMenuOpen(true);
                } else {
                    setClassN('menu-btn');
                    setShowSidebar(false);
                    setMenuOpen(false);
                }
            }}>
            <div className='menu-btn__burger'></div>
        </div>
    );
};

export default AnimatedHamburger;
