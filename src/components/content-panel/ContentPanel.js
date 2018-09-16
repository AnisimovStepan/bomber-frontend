import React from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../../utils/form/Input/Input';
import {ButtonSubmit} from '../../utils/form/Button/Button';
import './ContentPanel.css';

const ContentPanel = (props) => {
    const { history } = props;

    const InputObj = {
        type: 'text', name: 'playerName', placeholder: 'Please, enter your name'
    };

    return (
        <div className="content-panel transparent-bg-light">
            {/*<div className="content-panel__header">*/}
                {/*<span style={{verticalAlign: 'middle'}}>Welcome!</span>*/}
            {/*</div>*/}
            <div className="content-panel__content">
                <div className="content-panel__content__row">
                    <Input {...InputObj}/>
                </div>
                <div className="content-panel__content__row">
                    <div className="content-panel__content__row__button">
                        <ButtonSubmit submit={() => {
                            history.push('/start-game');
                        }} text="Play single"/>
                    </div>
                    <div className="content-panel__content__row__button">
                        <ButtonSubmit submit={() => {
                            history.push('/start-game');
                        }} text="Play with friends"/>
                    </div>
                </div>
                {/*<FormContent activeItem={ContentItems[0]}/>*/}
            </div>
        </div>
    );
};

export default withRouter(ContentPanel);