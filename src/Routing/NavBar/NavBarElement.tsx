// Generate a NavBarElement component

import React from 'react';

interface NavBarElementProps {
    children: JSX.Element;
}

const NavBarElement: React.FC<NavBarElementProps> = ({ children }) => {

    // add some nice styling to the NavBarElement component

    const style = {
        border: '1px solid black',
        boxShadow: '0 0 5px black',
        padding: '5px',
        borderRadius: '0.5rem',
        color: 'black',
        cursor: 'pointer',
    }

    return (
        <div style={style}>
            {children}
        </div>
    );
};

export default NavBarElement;