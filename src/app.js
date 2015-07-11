import React from 'react';

import AgileGatheringHost from './components/AgileGatheringHost.react.js';
import bootstrap from './vendor/bootstrap.min.css';
import styles from './common.css';

let App = React.createClass({
    render() {
        return (<div className="container-fluid" style={{maxHeight:"1024px", backgroundImage: "url('./res/img/background2.jpg')", backgroundSize: "cover"}}>
                    <div className="header clearfix">
                        <h3>Agile: The Gathering</h3>
                        <AgileGatheringHost/>
                    </div>
                </div>
            );
    }
});

React.render(<App/>, document.body);