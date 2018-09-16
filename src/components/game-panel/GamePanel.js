import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { IconRefresh, IconFullscreen, IconFitWindow, IconClose } from "../../icons";

import './GamePanel.css';

const frameSizeWidth = 1920;
const frameSizeHeight = 1080;

class GamePanel extends React.Component {
    constructor() {
        super();

        this.state = {
            frameDOM: null,
            isFitWindow: false,
            currentGame: null,
        };
        this.handleResize = this.handleResize.bind(this);
        this.handleFitWindow = this.handleFitWindow.bind(this);
    }

    handleResize() {
        if (!this.state.frameDOM) return;

        const { frameDOM } = this.state;

        let scale = Math.min(
            (window.innerHeight - ((this.state.isFitWindow) ? 50 : 0)) / (frameSizeHeight),
            (window.innerWidth - ((this.state.isFitWindow) ? 20 : 0)) / frameSizeWidth
        );

        // If need offsets on container
        if (!this.state.isFitWindow) { scale = scale * 0.812; }

        // frameDOM.style.transform = `scale(${scale})`;
        frameDOM.style.width = `${scale * frameSizeWidth}px`;
        frameDOM.style.height = `${scale * frameSizeHeight}px`;
    }

    componentWillMount() {
        // Find cur game by id
        // const compareUrl = PROD_PATH + this.props.match.url;
        // const currentGame = GameList.filter(game => game.path === compareUrl)[0];
        // const currentGame = GameList.filter(game => game.path === this.props.match.url)[0];
        this.setState({ currentGame: {name: 'Bomber'} });
    }

    componentDidMount() {
        const frameDOM = document.querySelectorAll('.game-panel__frame-wrapper')[0];
        window.addEventListener("resize", this.handleResize);

        this.setState({ frameDOM}, this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize)
    }

    handleFullscreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    handleFitWindow() {
        this.setState({ isFitWindow: !this.state.isFitWindow }, this.handleResize);
    }

    handleRefreshIFrame() {
        // const iframe = document.querySelectorAll('iframe')[0];
        // iframe.src = iframe.src;
    }


    render() {
        const { currentGame } = this.state;

        if (!currentGame) return <Redirect to="/not-found" />;

        return (
            <div className="game-panel-container containerWrapper">
                <div className="game-panel transparent-bg">
                    <div className="game-panel__header">
                        <div className="game-panel__header__name">{currentGame.name}</div>
                        <div className="game-panel__header__update" onClick={this.handleRefreshIFrame}>
                            <span className="game-panel__header__update__text">{'%PLAYER_NAME'}</span>
                            <IconRefresh classNames="game-panel__header__update__icon svg-col-mid" />
                        </div>
                        <div className="game-panel__header__controls">
                            <div className="game-panel__header__controls__item" onClick={this.handleFullscreen} title="Open to full screen">
                                <IconFullscreen classNames="game-panel__header__controls__icon svg-col-mid" />
                            </div>
                            <div className="game-panel__header__controls__item" onClick={this.handleFitWindow} title="Stretch the whole screen">
                                <IconFitWindow classNames="game-panel__header__controls__icon svg-col-mid" />
                            </div>
                            <div className="game-panel__header__controls__item" title="Close"
                                 onClick={() => {
                                     // Cancel fullscreen
                                     if (document.cancelFullScreen) {
                                         document.cancelFullScreen();
                                     } else if (document.mozCancelFullScreen) {
                                         document.mozCancelFullScreen();
                                     } else if (document.webkitCancelFullScreen) {
                                         document.webkitCancelFullScreen();
                                     }

                                     this.props.history.push('/')
                                 }}
                            >
                                <IconClose classNames="game-panel__header__controls__icon svg-col-mid" />
                            </div>
                        </div>
                    </div>
                    <div className="game-panel__frame-wrapper">
                        {/*<iframe*/}
                            {/*// className="game-panel__frame"*/}
                            {/*src={API_FRAME_URL}*/}
                            {/*frameBorder="0"*/}
                            {/*width="100%"*/}
                            {/*height="100%"*/}
                            {/*title="game"*/}
                            {/*>*/}
                        {/*</iframe>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(GamePanel);