import React from 'react';

import Loading from '../../../components/loading/Loading';

import './Button.css';

const ButtonSubmit = (props) => {
    return (
        <button
            className="form-button form-button__submit change-color-button"
            onClick={(e) => {
                e.preventDefault();
                props.submit(e.currentTarget, props);
            }}
        >
            <span className="form-button__submit__text">
                {props.needLoading && <Loading needOnlySpinner="1" size="18" />}
                {props.text}
            </span>
        </button>
    );
};

const ButtonNext = (props) => {
    return (
        <button />
    );
};

const ButtonBack = (props) => {
    return (
        <button />
    );
};

export { ButtonSubmit, ButtonNext, ButtonBack };