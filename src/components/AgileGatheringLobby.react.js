import React from 'react';
import LobbyActions from '../actions/MatchLobbyActionCreators.js';
import styles from './AgileGatheringLobby.css';

export default React.createClass({

    propTypes: {
        setSelectedMatch: React.PropTypes.func.isRequired,
        playerName:  React.PropTypes.string.isRequired,
        playerId:  React.PropTypes.string.isRequired,
        selectedMatch:  React.PropTypes.object,
        selectedDeck: React.PropTypes.object.isRequired,
        matches:  React.PropTypes.array.isRequired,
        enableJoin: React.PropTypes.bool
    },

    componentDidMount(){
        let self=this;
        setTimeout(()=>{
            self.setState({ transitionIn: true});
        }, 500);

    },

    render(){
        const matchEls = _.map(this.props.matches, function(match){
            return (<div className={ this._getMatchClassName(match) } onClick={ this.onMatchSelected.bind(this, match) }>
                        <div className="match-name">{ match.matchName }</div>
                    </div>);
        }, this);
        return (<div className={ this.state && this.state.transitionIn ? "matches lobby-transition jumbotron lobby-in" : "matches lobby-transition jumbotron" }>>
                    <div>Matches</div>
                    <div className="match-list">
                        { matchEls }
                    </div>
                    <button onClick={ this.props.selectedMatch && this.props.selectedMatch.ownerId === this.props.playerId ? this.onMatchStarted : this.onMatchCreated }>{ this.props.selectedMatch && this.props.selectedMatch.ownerId === this.props.playerId ? 'Start' : 'Create' }</button>
                    <button disabled={ !this.props.enableJoin } onClick={ this.onMatchJoined }>Join</button>
                </div>)
    },

    onMatchSelected(context, event){
        LobbyActions.selectMatch(context.matchId);
    },

    onMatchCreated(){
        LobbyActions.createMatch(this.props.playerId, this.props.playerName);
    },

    onMatchJoined(){
        LobbyActions.joinMatch(this.props.selectedMatch, this.props.playerId, this.props.playerName);
    },

    onMatchStarted(){
        LobbyActions.startMatch(this.props.selectedMatch, this.props.playerId);
    },

    _getMatchClassName(match){
        let classes = match.players.length > 1 ? "match match-disabled" : "match";
        classes += this.props.selectedMatch && this.props.selectedMatch.matchId === match.matchId ? " match-selected" : "";
        return classes;
    }
});
