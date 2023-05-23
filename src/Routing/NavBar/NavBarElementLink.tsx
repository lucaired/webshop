// Generate a NavBarElement component

import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarElementLinkProps {
    link: string;
    text: string;
}

const NavBarElementLink: React.FC<NavBarElementLinkProps> = ({ link, text }) => {

    const style = {
        textDecoration: 'none',
        color: 'black',
    }

    return (
        <Link to={link} style={style}>
            {text}
        </Link>
    );
};

export default NavBarElementLink;