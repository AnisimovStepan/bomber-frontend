import React from 'react';

import './Loading.css';

const Loading = (props) => {
    if (props.needOnlySpinner) {
        const style = props.size ? {
            width: props.size + 'px',
            height: props.size + 'px',
            position: 'absolute',
            left: -parseInt(props.size, 10) - 12 + 'px',
            top: -3 + 'px',
        } : {};
        return (<div className="loading-container__item" style={style}/>);
    }
    else return (
        <div className="loading-container">
            <div className="loading-container__item"/>
        </div>
    );
};

export default Loading;