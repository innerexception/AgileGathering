import React from 'react';
import AgileGatheringBoard from './AgileGatheringBoard.react.js';
import AgileGatheringBuilder from './AgileGatheringBuilder.react.js';
import AgileGatheringLobby from './AgileGatheringLobby.react.js';
import MatchStore from '../stores/AgileGatheringMatchStore.js';

export default React.createClass({

    componentWillMount() {
        MatchStore.addChangeListener(this._onChange);
    },

    componentDidMount(){
        let self=this;
        setTimeout(()=>{
            self.setState({ transitionIn: true});
        }, 500);
    },

    componentWillUnmount() {
        MatchStore.removeChangeListener(this._onChange);
    },

    getInitialState(){
        return MatchStore.get();
    },

    render() {
        if(!this.state.currentPlayerName){
            return (
                <div className={ this.state && this.state.transitionIn ? "deck-builder-transition jumbotron deck-builder-in" : "deck-builder-transition jumbotron" }>
                    <div className="atg-label">Your name, Sir?</div>
                    <input style={{marginLeft:"37%", width:"25%", fontFamily: "MAGIC", backgroundColor: "rgba(255, 228, 196, 0.78)", fontSize:"20px"}} type="text" />
                    <button onClick={ this.onNameChoose }>Next</button>
                </div>);
        }
        else if(!this.state.playerDeck){
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

    onNameChoose(event){
        MatchStore.setCurrentPlayerName(event.currentTarget.previousSibling.value);
        this.setState({currentPlayerName: event.currentTarget.previousSibling.value});
    },

    _onChange() {
        this.setState(MatchStore.get());
    }
});