import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; 

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>
                <Link to="/" className="header-link">Employee Management System</Link>
            </h1>
        </header>
    );
};

export default Header;
