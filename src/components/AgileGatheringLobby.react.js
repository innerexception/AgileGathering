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
                        <div className="card-back-inner"></div>
                        <div className="card-back-title">Agile:</div>
                        <div className="card-back-subtitle">The Gathering</div>
                        <div className="deck-name">{ match.matchName }</div>
            </div>);
        }, this);
        return (<div className={ this.state && this.state.transitionIn ? "matches lobby-transition jumbotron lobby-in" : "matches lobby-transition jumbotron" }>
                    <div className="atg-label">Matches</div>
                    <div className="match-list">
                        { matchEls }
                    </div>
                    <button onClick={ this.props.selectedMatch && this.props.selectedMatch.ownerId === this.props.playerId ? this.onMatchStarted : this.onMatchCreated }>{ this.props.selectedMatch && this.props.selectedMatch.ownerId === this.props.playerId ? 'Start' : 'Create' }</button>
                    <button className={ !this.props.enableJoin && this.props.selectedMatch ? "button-disabled" : ""} disabled={ !this.props.enableJoin && this.props.selectedMatch } onClick={ this.onMatchJoined }>Join</button>
                </div>)
    },

    onMatchSelected(context, event){
        LobbyActions.selectMatch(context.matchId);
    },

    onMatchCreated(){
        LobbyActions.createMatch(this.props.playerId, this.props.playerName, this.props.selectedDeck);
    },

    onMatchJoined(){
        const player = {
            playerName: this.props.playerName,
            matchId: this.props.selectedMatch.matchId,
            playerId: this.props.playerId,
            playerDeck: this.props.selectedDeck,
            playerHand: [],
            playerResources: [],
            resourcePool: 1,
            playerStories: [],
            playerPoints: 0,
            playerTurn: 1
        };
        LobbyActions.joinMatch(this.props.selectedMatch, player);
    },

    onMatchStarted(){
        LobbyActions.startMatch(this.props.selectedMatch, this.props.playerId);
    },

    _getMatchClassName(match){
        let classes = match.players && match.players.length > 1 ? " deck card-back match-disabled " : " deck card-back ";
        classes += this.props.selectedMatch && this.props.selectedMatch.matchId === match.matchId ? " deck card-back match-selected " : "";
        return classes;
    }
});
