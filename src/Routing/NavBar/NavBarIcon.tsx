// Generate a Icon component with the favicon

import React from 'react';

const NavBarIcon = () => {
    return (
        <div>
            <img 
                style={{
                    width: "2rem",
                }} 
                src="/favicon.ico" 
                alt="webshop" 
            />
        </div>
    );
}

export default NavBarIcon;