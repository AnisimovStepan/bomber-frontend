import React from 'react';
import { Link } from 'react-router-dom';

// import { IconPerson } from '../../icons';

import './HeaderPanel.css';

const HeaderPanel = () => {
    return (
        <div className="header-panel transparent-bg">
            <Link to="/" className="header-panel__text change-color" draggable="false">
                <span>Bomber</span>
            </Link>
        </div>
    );
};

export default HeaderPanel;
