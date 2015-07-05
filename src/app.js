import React from 'react';

import AgileGatheringHost from './components/AgileGatheringHost.react.js';

let App = React.createClass({
    render() {
        return (<AgileGatheringHost />);
    }
});

React.render(<App/>, document.body);