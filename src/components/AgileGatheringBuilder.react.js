import React from 'react';
import _ from '../vendor/lodash.min.js';
import DeckActions from '../actions/DeckBuilderActionCreators.js';
import css from './AgileGatheringBuilder.css';

let AgileGatheringBuilder = React.createClass({

    propTypes: {
        decks:  React.PropTypes.array.isRequired,
        selectedDeck: React.PropTypes.object,
        allCards: React.PropTypes.array.isRequired
    },

    componentDidMount(){
        let self=this;
        setTimeout(()=>{
            self.setState({ transitionIn: true});
        }, 500);
    },

    render() {
        const deckEls = _.map(this.props.decks, function(deck){
            return (<button className={ this.props.selectedDeck && this.props.selectedDeck.deckId === deck.deckId ? "deck deck-selected deck-face" : "deck deck-face" }
                          onClick={ this.onDeckSelected.bind(this, deck) }>
                            <div>{deck.name}</div>
                            <img src={deck.imagePath}/>
                    </button>);
        }, this);

        let allCardEls = this._getAllCardEls(this.props.allCards, this.props.selectedDeck);

        return (
            <div className={ this.state && this.state.transitionIn ? "deck-builder deck-builder-transition jumbotron deck-builder-in" : "deck-builder deck-builder-transition jumbotron" }>
                <div>Choose a Deck:</div>
                <div className="deck-list">{ deckEls }</div>
                <button disabled={ !!!this.props.selectedDeck } onClick={ this.onDeckChoose }>Choose</button>
                <div>Cards</div>
                <div className="card-list">{ this.props.selectedDeck && allCardEls }</div>
            </div>
        )
    },

    onDeckChoose(){
        //Should set state of playerDeck for parent
        DeckActions.chooseDeck(this.props.selectedDeck);
    },

    onDeckSelected(context, event){
        DeckActions.selectDeck(context);
    },

    onCardSelected(context, event){
        DeckActions.toggleCardInDeck(context, this.props.selectedDeck);
    },

    _getAllCardEls(cardArray, selectedDeck){
        return _.map(cardArray, function(card){
            return (
                <div className={ selectedDeck && this._containsCard(selectedDeck.cards, card) ? 'card card-selected' : 'card' } onClick={ this.onCardSelected.bind(this, card) }>
                    <div className="card-title">{card.name}</div>
                    <img className="card-picture" src={ card.imagePath }/>
                    <div className="card-type">{card.type}</div>
                    <div className="card-text">{card.text}</div>
                </div>
            );
        }, this);
    },

    _containsCard(cards, cardToFind){
        return _.filter(cards, function(cardId){
            return cardToFind.cardId === cardId;
        }).length > 0;
    }
});

export default AgileGatheringBuilder;