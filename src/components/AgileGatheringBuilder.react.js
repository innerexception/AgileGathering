import React from 'react';
import _ from '../vendor/lodash.min.js';
import DeckActions from '../actions/DeckBuilderActionCreators.js';

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
            deckCardEls = this._getAllCardEls(this.props.selectedDeck.cards);
        }
        let allCardEls = this._getAllCardEls(this.props.allCards, this.props.selectedDeck);

        return (
            <div>
                <div>Decks</div>
                <div>{ deckEls }</div>
                <button onClick={ this.onDeckChoose }>Choose</button>
                <button onClick={ this.onDeckCreate }>Create</button>
                <button enabled={ this.props.selectedDeck } onClick={ this.onDeckDeleted }>Delete</button>
                <div>{ deckCardEls }</div>
                <div>All Cards</div>
                <div>{ allCardEls }</div>
            </div>
        )
    },

    onDeckChoose(){
        //Should set state of playerDeck for parent
        DeckActions.chooseDeck(this.props.selectedDeck);
    },

    onDeckSelected(){
        DeckActions.selectDeck(this);
    },

    onDeckDeleted(){
        DeckActions.deleteDeck(this.props.selectedDeck);
    },

    onDeckCreate(){
        DeckActions.createDeck();
    },

    onCardSelected(){
        DeckActions.toggleCardInDeck(this, this.props.selectedDeck);
    },

    _getAllCardEls(cardArray, selectedDeck){
        return _.map(cardArray, function(card){
            return (
                <span className={ selectedDeck && this._containsCard(selectedDeck.cards, card) ? 'card-selected' : 'card' } onClick={ this.onCardSelected.bind(card) }>
                    <div>{card.name}</div>
                    <img src={ card.imagePath }/>
                    <div>{card.text}</div>
                </span>
            );
        });
    },

    _containsCard(cards, cardToFind){
        return _.filter(cards, function(card){
            return cardToFind.cardId === card.cardId;
        }).length > 0;
    }
});

export default AgileGatheringBuilder;