// Generate a NavBarElement component

import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarElementProps {
    link: string;
    text: string;
}

const NavBarElement: React.FC<NavBarElementProps> = ({ link, text }) => {
    return (
        <Link className='nav-link' to={link}>
            {text}
        </Link>
    );
};

export default NavBarElement;