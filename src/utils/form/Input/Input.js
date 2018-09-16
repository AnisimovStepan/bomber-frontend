import React from 'react';

import './Input.css';

const Input = (props) => {
    return (
        <input
            className={'form-input ' + (props.error ? 'form-input__error' : '')}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            autoCorrect="off"
            autoCapitalize="none"
            // onBlur={(e) => { props.handleValidate(e.currentTarget, props); }}
        />
    );
};

export default Input;