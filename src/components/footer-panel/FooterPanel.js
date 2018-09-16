import React from 'react';
import { Link } from 'react-router-dom';

import './FooterPanel.css';

const FooterPanel = () => {
    const fstyle = {cursor: 'pointer', marginRight: '5px'};
    return (
        <div className="footer transparent-bg">
            <div className="footer__links">
                <Link to="" className="footer__links-item" draggable="false">
                    <span className="footer__links-text change-color">About</span>
                </Link>
            </div>
            <div className="footer__langs">
                <span className="change-color" style={fstyle}>English</span>
                <span className="change-color" style={fstyle}>中文</span>
                <span className="change-color" style={fstyle}>Español</span>
                <span className="change-color" style={fstyle}>Русский</span>
            </div>
        </div>
    );
};

export default FooterPanel;
