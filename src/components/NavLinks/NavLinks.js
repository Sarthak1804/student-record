import React from 'react';
import {Link} from 'react-router-dom';

const NavLinks = () => {
    return <nav>
        <Link style={{textDecoration: 'none', color: 'black'}} to="/">
            Students
        </Link>
    </nav>;
};

export default NavLinks;
