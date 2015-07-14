import React from 'react';
import _ from '../vendor/lodash.min.js';
import DeckActions from '../actions/DeckBuilderActionCreators';
import css from './AgileGatheringBuilder.css';
import { CardTypes } from '../Constants';

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
            return (<div className={ this.props.selectedDeck && this.props.selectedDeck.deckId === deck.deckId ? "deck deck-selected card-back" : "deck card-back" }
                          onClick={ this.onDeckSelected.bind(this, deck) }>
                            <div className="card-back-inner"></div>
                            <div className="card-back-title">Agile:</div>
                            <div className="card-back-subtitle">The Gathering</div>
                            <div className="deck-name">{deck.name}</div>
                            <img src={deck.imagePath}/>
                    </div>);
        }, this);

        let allCardEls = this._getAllCardEls(this.props.allCards, this.props.selectedDeck);

        return (
            <div className={ this.state && this.state.transitionIn ? "deck-builder deck-builder-transition jumbotron deck-builder-in" : "deck-builder deck-builder-transition jumbotron" }>
                <div className="atg-label">CHOOSE:</div>
                <div className="deck-list">{ deckEls }</div>
                <div className="atg-label">{ this.props.selectedDeck ? ("Deck Size: " +this.props.selectedDeck.cardIds.length) + " (30 Recommended)" : "" }</div>
                <button className={ !!!this.props.selectedDeck ? "button-next button-disabled" : "button-next"} disabled={ !!!this.props.selectedDeck } onClick={ this.onDeckChoose }>Next</button>
                <div className="card-list">{ this.props.selectedDeck ? allCardEls : <div className="atg-label">Click a deck to see cards</div> }</div>
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
            let pptEl = card.ppt && (<div className="card-ppt-badge">{ card.ppt }</div>);
            let valueEl = card.value && (<div className="card-value-badge">{ card.value }</div>);
            let costEl = card.cost ? (<div className="card-cost-badge-fill">
                                        <div className="card-cost-badge">{ card.cost }</div>
                                      </div>) :
                                     (<div className="card-cost-badge-fill">
                                         <div className="card-cost-badge">0</div>
                                      </div>);
            return (
                <div style={{ backgroundImage: "url(\""+CardTypes[card.type].imagePath+"\")"}} className={ selectedDeck && this._containsCard(selectedDeck.cardIds, card) ? 'card card-selected' : 'card card-unselected' } onClick={ this.onCardSelected.bind(this, card) }>
                    { costEl }
                    <div className="card-title">{card.name}</div>
                    <img className="card-picture" src={ card.imagePath }/>
                    <div className="card-type">{card.type}</div>
                    { valueEl}
                    <div className="card-text">{card.text + this._getPointsText(card) + this._getPptText(card)}</div>
                    { pptEl }
                </div>
            );
        }, this);
    },

    _getPointsText(card) {
        return card.points ? (' ' + (card.points > 0 ? '+' : '') + card.points + ' points to complete ' + (card.type !== 'story' ? ' on targeted card' : '')) : '';
    },

    _getPptText(card){
        return card.ppt ? (' +' +card.ppt+ ' points completed on \'stories\' per turn'):'';
    },

    _containsCard(cards, cardToFind){
        return _.filter(cards, function(cardId){
            return cardToFind.cardId === cardId;
        }).length > 0;
    }
});

export default AgileGatheringBuilder;