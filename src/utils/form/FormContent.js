import React from 'react';
import { Redirect } from 'react-router-dom';

// import { getParamsByFetchMethod, handleResponse } from '../../helpers';
import Input from './Input/Input';
import { ButtonSubmit } from './Button/Button';

import './FormContent.css';

const FORM_TYPES = {
    input: 0,
    button: {
        back: 1,
        next: 2,
        submit: 3
    },
    select: 4,
    checkbox: 5,
};

class FormContent extends React.Component {
    constructor(props) {
        super(props);

        this.getInitState = this.getInitState.bind(this);

        this.state = this.getInitState();

        this.getControlByType = this.getControlByType.bind(this);
        this.handleValidateItem = this.handleValidateItem.bind(this);
        this.handleValidateAllItems = this.handleValidateAllItems.bind(this);
        this.fetchForItem = this.fetchForItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.activeItem) return;

        if (this.props.activeItem.pathTo !== nextProps.activeItem.pathTo ) {
            this.setState(this.getInitState());
        }
    }

    getInitState() {
        let returnObj = {
            loadingForButton: false,
            redirectUrl: null,
        };
        for (let i in this.props.activeItem.form) {
            returnObj[this.props.activeItem.form[i].name + 'Error'] = null;
        }
        return returnObj;
    }

    getControlByType(type, props, error) {
        switch (type) {
            case FORM_TYPES.input: return <Input
                error={error}
                handleValidate={this.handleValidateItem}
                {...props} />;
            case FORM_TYPES.button.submit: return <ButtonSubmit
                submit={this.fetchForItem}
                needLoading={this.state.loadingForButton}
                {...props}/>;
            default: return null;
        }
    }

    handleValidateItem(formControl, item) {
        if (!item || !item.validators || !item.validators.length) return null;

        const placeholder = item.placeholder;
        const inputText = formControl.value;

        let error = '';
        // Get all validators an if is correct return empty string, else return name of error
        switch (item.controlType) {
            case FORM_TYPES.input:
                item.validators.map((validateFunc) => {
                    if (!validateFunc) return '';
                    error = error + validateFunc(inputText, placeholder);
                    return '';
                });
                break;
            default: return null;
        }

        if (error === '') { error = null; }

        let errObj = {};
        errObj[item.name + 'Error'] = error;

        this.setState(errObj);

        return error;
    }

    handleValidateAllItems(form) {
        if (!this.props.activeItem || !this.props.activeItem.form) return;

        const { activeItem } = this.props;
        const errors = [];
        let err;
        // Get element by name to accociate with config array and DOM
        for (let i in activeItem.form) {
            err = this.handleValidateItem(form[activeItem.form[i].name], activeItem.form[i]);
            if (err) { errors.push(err); }
        }

        return errors;
    }

    fetchForItem(formControl, item) {
        if (!item || !formControl || !formControl.form) return;

        // Clear error label
        let errObj = {};
        errObj[item.name + 'Error'] = null;
        this.setState(errObj);

        const errors = this.handleValidateAllItems(formControl.form);
        // if we have some error here so exit
        if (errors.length || !item.fetchParams) return;

        this.setState({ loadingForButton: true });

        // Callback for form after async call
        const cb = (date, errMsg) => {
            if (!errMsg) {
                this.setState({
                    loadingForButton: false,
                    redirectUrl: item.fetchParams.redirectUrl,
                });
            }
            else if (errMsg[errMsg.length - 1] === '%'){
                this.setState({ loadingForButton: false });
            }
            else {
                let errObj = { loadingForButton: false };
                errObj[item.name + 'Error'] = errMsg;
                this.setState(errObj);
            }
        };
        cb.bind(this);
        item.fetchParams.actionFunc(formControl.form, cb);
        // fetch(`${item.fetchParams.url}${getParamsByFetchMethod(item.fetchParams.method, item.fetchParams.getParams(formControl.form))}`,
        //     { method: item.fetchParams.method })
        //     .then(handleResponse)
        //     .then((data) => {
        //         console.log(data);
        //         this.setState({
        //             loadingForButton: false,
        //             redirectUrl: item.fetchParams.redirectUrl,
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         let errObj = { loadingForButton: false };
        //         errObj[item.name + 'Error'] = error;
        //         this.setState(errObj);
        //     });
    }

    render() {
        const { activeItem } = this.props;

        // if we have a redirect link go
        if (this.state.redirectUrl) return (<Redirect to={this.state.redirectUrl} />);

        return (
            <form noValidate>
                {activeItem && activeItem.form && activeItem.form.map((item, i) => {
                    const error = this.state[item.name + 'Error'];
                    return (
                        <div className="form__row" key={i}>
                            {error && <div className="form__error">{error}</div>}
                            {this.getControlByType(item.controlType, item, error)}
                        </div>
                    );
                })}
            </form>
        );

    }
}

export { FormContent, FORM_TYPES };