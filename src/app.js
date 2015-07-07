import React from 'react';

import AgileGatheringHost from './components/AgileGatheringHost.react.js';
import bootstrap from './vendor/bootstrap.min.css';

let App = React.createClass({
    render() {
        return (<div className="container-fluid" style={{maxWidth: "720px", maxHeight:"1024px", overflow:"hidden"}}>
                    <div className="header clearfix">
                        <h3 className="text-muted" style={{marginLeft: "auto", marginRight: "auto", width: "250px"}}>Agile: The Gathering</h3>
                        <AgileGatheringHost/>
                    </div>
                </div>
            );
    }
});

React.render(<App/>, document.body);