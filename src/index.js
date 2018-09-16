import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HeaderPanel from './components/header-panel/HeaderPanel';
import ContentPanel from './components/content-panel/ContentPanel';
import FooterPanel from './components/footer-panel/FooterPanel';
import GamePanel from './components/game-panel/GamePanel';
import NotFound from './components/not-found/NotFound';

import ScrollToTop from './utils/ScrollToTop';

import './index.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true
        };

        this.handleLoading = this.handleLoading.bind(this);

        // Preproccesing open site logic async
        // preopen(this.handleLoading);
    }

    handleLoading() {
        this.setState({loading: false});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <ScrollToTop />
                    <Switch>
                        {/*<Route exact path="/start-game" component={GamePanel} />*/}
                        <Route exact path="/start-game" component={GamePanel} />
                        <Route render={() => {
                            return(
                                <div>
                                    <div className="containerWrapper"/>
                                    <div className="container">
                                        <HeaderPanel />
                                        {/*<Navigation />*/}
                                        {/*<MobileMenuProvider />*/}

                                        <Switch>
                                            {/*<Route exact path="/about" component={GamePanel}/>*/}
                                            <Route exact path="/" component={ContentPanel}/>
                                            <Route component={NotFound} />
                                        </Switch>

                                        <FooterPanel />
                                    </div>
                                </div>
                            )
                        }}/>
                    </Switch>
                    {/*<ModalDialog />*/}
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);