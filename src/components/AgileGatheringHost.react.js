import React from 'react';
import AgileGatheringBoard from './AgileGatheringBoard.react.js';
import AgileGatheringBuilder from './AgileGatheringBuilder.react.js';
import AgileGatheringLobby from './AgileGatheringLobby.react.js';
import MatchStore from '../stores/AgileGatheringMatchStore.js';

export default React.createClass({

    componentWillMount() {
        MatchStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        MatchStore.removeChangeListener(this._onChange);
    },

    getInitialState(){
        return MatchStore.get();
    },

    render() {
        if(!this.state.playerDeck){
            return (
                <AgileGatheringBuilder decks={ this.state.decks }
                    selectedDeck={ this.state.selectedDeck }
                    allCards={ this.state.cards } />
               );
        }
        else if(this.state.selectedMatch && this.state.started){
            return (<AgileGatheringBoard match={ this.state.selectedMatch }
                                         currentPlayerId={ this.state.currentPlayerId }
                                         activePlayerId={ this.state.selectedMatch.activePlayerId }
                                         cards={ this.state.cards } />);
        }
        else{
            return (<AgileGatheringLobby matches={ this.state.matches }
                playerName={ this.state.currentPlayerName }
                playerId={ this.state.currentPlayerId }
                selectedDeck={ this.state.selectedDeck }
                enableJoin={ !this.state.disableJoinButton }
                setSelectedMatch={ this.setSelectedMatch }
                selectedMatch={ this.state.selectedMatch }/>);
        }
    },

    setSelectedMatch(match){
        this.setState({ selectedMatch: match });
    },

    _onChange() {
        this.setState(MatchStore.get());
    }
});