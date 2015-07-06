import React from 'react';
import Actions from '../actions/MatchLobbyActionCreators.js';

let AgileGatheringLobby = React.createClass({

    propTypes: {
        setSelectedMatch: React.PropTypes.func.isRequired,
        playerName:  React.PropTypes.string.isRequired,
        playerId:  React.PropTypes.number.isRequired,
        selectedMatch:  React.PropTypes.object,
        matches:  React.PropTypes.array.isRequired
    },

    render(){
        const matchEls = _.map(this.props.matches, function(match){
            return (<span onClick={ this.onMatchSelected.bind(match) }>
                        <span>match.name</span>
                    </span>);
        });
        return (<div>
                    <div>Matches</div>
                    <div>
                        { matchEls }
                    </div>
                    <button onClick={ this.props.selectedMatch.ownerId === this.props.playerId ? this.onMatchCreated : this.onMatchStarted }>{ this.props.selectedMatch.ownerId === this.props.playerId ? 'Start' : 'Create' }</button>
                    <button enabled={ this.props.enableJoin } onClick={ this.onMatchJoined }>Join</button>
                </div>)
    },

    onMatchSelected(){
        Actions.selectMatch(this.matchId);
    },

    onMatchCreated(){
        Actions.createMatch(this.props.playerId, this.props.playerName);
    },

    onMatchJoined(){
        Actions.joinMatch(this.props.selectedMatch, this.props.playerId, this.props.playerName);
    },

    onMatchStarted(){
        Actions.startMatch(this.props.selectedMatch);
    }
});

export default AgileGatheringLobby;