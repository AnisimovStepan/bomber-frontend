import React from 'react';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true
        };

        this.handleLoading = this.handleLoading.bind(this);

        // Preproccesing open site logic async
        preopen(this.handleLoading);
    }

    handleLoading() {
        this.setState({loading: false});
    }

    render() {
        return (
            <div>Hi man!</div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);