import React from 'react';
import LobbyActions from '../actions/MatchLobbyActionCreators.js';

export default React.createClass({

    propTypes: {
        setSelectedMatch: React.PropTypes.func.isRequired,
        playerName:  React.PropTypes.string.isRequired,
        playerId:  React.PropTypes.number.isRequired,
        selectedMatch:  React.PropTypes.object,
        matches:  React.PropTypes.array.isRequired
    },

    render(){
        const matchEls = _.map(this.props.matches, function(match){
            return (<span className={ match.players.length > 1 ? "match-disabled" : "match" } onClick={ this.onMatchSelected.bind(match) }>
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
        LobbyActions.selectMatch(this.matchId);
    },

    onMatchCreated(){
        LobbyActions.createMatch(this.props.playerId, this.props.playerName);
    },

    onMatchJoined(){
        LobbyActions.joinMatch(this.props.selectedMatch, this.props.playerId, this.props.playerName);
    },

    onMatchStarted(){
        LobbyActions.startMatch(this.props.selectedMatch, this.props.playerId);
    }
});
