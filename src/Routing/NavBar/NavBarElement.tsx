// Generate a NavBarElement component

import React from 'react';

interface NavBarElementProps {
    children: JSX.Element;
    style?: React.CSSProperties;
}

const NavBarElement: React.FC<NavBarElementProps> = ({ children, style }) => {

    return (
        <div style={{
            border: '1px solid black',
            boxShadow: '0 0 5px black',
            borderRadius: '0.5rem',
            padding: '5px',
            color: 'black',
            cursor: 'pointer',
            ...style
        }}>
            {children}
        </div>
    );
};

export default NavBarElement;