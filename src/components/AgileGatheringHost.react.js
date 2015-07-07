import React from 'react';
import AgileGatheringBoard from './AgileGatheringBoard.react.js';
import AgileGatheringBuilder from './AgileGatheringBuilder.react.js';
import AgileGatheringLobby from './AgileGatheringLobby.react.js';
import MatchStore from '../stores/AgileGatheringMatchStore.js';
import styles from './AgileGatheringHost.css';

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
            return (<AgileGatheringBoard className="board" match={ this.state.selectedMatch } />);
        }
        else{
            return (<AgileGatheringLobby className="lobby" matches={ this.state.matches }
                playerName={ this.state.currentPlayerName }
                playerId={ this.state.currentPlayerName }
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