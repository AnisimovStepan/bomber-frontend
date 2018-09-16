import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
    return (
        <div className="transparent-bg-light not-found top-border">
            <h2 className="not-found__text">Oops! Page not found.</h2>

            <Link to="/" className="not-found__button change-color-button" draggable="false">Go to home page</Link>
        </div>
    );
};

export default NotFound;