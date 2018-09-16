import React from 'react';
import { Link } from 'react-router-dom';

import {IconRemove} from '../../../icons';
import './ModalDialog.css';

const MODAL_TYPES = {
    ERROR: 0,
    INFO: 1,
    CONFIRM: 2,
    BUTTONS: 3,
};

const modalDialog = {};

class ModalDialog extends React.Component {
    constructor() {
        super();

        this.state = {
            isShow: false,
            headMsg: '',
            bodyMsg: '',
            buttons: [],
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        modalDialog.show = this.show;
        modalDialog.hide = this.hide;
    }

    show({type, headMsg, bodyMsg, buttons}) {
        switch (type) {
            case MODAL_TYPES.ERROR:
                this.setState({
                    isShow: true,
                    headMsg: 'Ошибка!',
                    bodyMsg,
                    buttons
                });
                break;

            default: return;
        }
        document.querySelector('body').style.overflow = 'hidden';

        // Add listener for ESC Key
        window.addEventListener('keyup', this.handleKeyUp, false);
    }

    hide() {
        if (!this.state.isShow) return;
        // Remove blur from fist child
        document.getElementById('root').firstChild.firstChild.classList.remove('blur');

        this.setState({ isShow: false });
        document.querySelector('body').style.overflow = '';

        // Remove listener for ESC Key
        window.removeEventListener('keyup', this.handleKeyUp, false);
    }

    handleCloseClick() {
        this.hide();
    }

    handleKeyUp(e) {
        const keys = {
            // ESC Code
            27: () => {
                e.preventDefault();
                this.handleCloseClick();
            },
        };

        if (keys[e.keyCode]) { keys[e.keyCode](); }
    }

    render() {
        if (!this.state.isShow) return null;

        const { headMsg, bodyMsg, buttons } = this.state;

        let buttonsTemplate;
        if (buttons && buttons.length) {
            buttonsTemplate = buttons.map((item, key) => {
                return (
                    <Link to={item.to} className="modal__content__buttons__button change-color-button" key={key} draggable="false"
                          onClick={this.handleCloseClick}
                    >
                        {item.icon && <item.icon classNames="modal__content__buttons__button__icon svg-col-mid"/>}
                        {item.text}
                    </Link>
                );
            });
        }
        else {
            buttonsTemplate =
                <div className="modal__content__buttons__button modal__content__buttons__button__ok change-color-button"
                     onClick={this.handleCloseClick}
                >OK</div>
        }

        // If we need to show find content and set blur-class to blured it
        document.getElementById('root').firstChild.firstChild.classList.add('blur');

        return (
            <div className="modal-overlay transparent-bg-light"
                 onClick={this.handleCloseClick}
            >
                <div className="modal transparent-bg-light" onClick={(e) => e.stopPropagation()}>
                    <div className="modal__header">
                        <div className="modal__header__caption modal__header__caption-error">{headMsg}</div>
                        <div onClick={this.handleCloseClick}>
                            <IconRemove classNames="modal__header__close"/>
                        </div>
                    </div>
                    <div className="modal__content">
                        <div className="modal__content__text">{bodyMsg}</div>
                        <div className="modal__content__buttons">
                            {buttonsTemplate}

                            {/*<Link to="/account/registration" className="modal__content__buttons__button change-color-button"*/}
                                  {/*onClick={this.handleCloseClick}*/}
                            {/*>*/}
                                {/*<IconRegistration classNames="modal__content__buttons__button__icon svg-col-mid"/>*/}
                                {/*Регистрация*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { ModalDialog, MODAL_TYPES, modalDialog };