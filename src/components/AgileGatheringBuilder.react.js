import React from 'react';
import Actions from '../actions/DeckBuilderActionCreators.js';

let AgileGatheringBuilder = React.createClass({

    propTypes: {
        decks:  React.PropTypes.array.isRequired,
        selectedDeck: React.PropTypes.object,
        allCards: React.PropTypes.array.isRequired
    },

    render() {
        const deckEls = _.map(this.props.decks, function(deck){
            return (<span onClick={ this.onDeckSelected.bind(deck) }>
                        <span>{deck.name}</span>
                    </span>);
        });

        let deckCardEls;
        if(this.props.selectedDeck){
            deckCardEls = this._getCardEls(this.props.selectedDeck.cards);
        }
        let allCardEls = this._getAllCardEls(this.props.allCards, this.props.selectedDeck);

        return (
            <div>
                <div>Decks</div>
                <div>{ deckEls }</div>
                <button onClick={ this.onDeckCreate }>Create</button>
                <button enabled={ this.props.selectedDeck } onClick={ this.onDeckDeleted }>Delete</button>
                <div>{ deckCardEls }</div>
                <div>All Cards</div>
                <div>{ allCardEls }</div>
            </div>
        )
    },

    onDeckSelected(){
        Actions.selectDeck(this);
    },

    onDeckDeleted(){
        Actions.deleteDeck(this.props.selectedDeck);
    },

    onDeckCreate(){
        Actions.createDeck();
    },

    onCardSelected(){
        Actions.toggleCardInDeck(this, this.props.selectedDeck);
    },

    _getCardEls(cardArray){
        return _.map(cardArray, function(card){
            return (
                <span>
                    <div>{card.name}</div>
                    <img src={ card.imagePath }/>
                </span>
            );
        });
    },

    _getAllCardEls(cardArray, selectedDeck){
        return _.map(cardArray, function(card){
            return (
                <span className={ selectedDeck.cards.contains(card) ? 'card-selected' : 'card' } onClick={ this.onCardSelected.bind(card) }>
                    <div>{card.name}</div>
                    <img src={ card.imagePath }/>
                </span>
            );
        });
    }
});

export default AgileGatheringBuilder;