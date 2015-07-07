import React from 'react';
import BoardActions from '../actions/BoardActionCreators.js';
import BoardStore from '../stores/AgileGatheringBoardStore.js';
import styles from 'AgileGatheringBoard.css';

export default React.createClass({

    propTypes: {
        match:  React.PropTypes.object.isRequired,
        currentPlayerId: React.PropTypes.string.isRequired
    },

    componentWillMount() {
        BoardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        BoardStore.removeChangeListener(this._onChange);
    },

    getInitialState(){
        return BoardStore.get(this.props.match, this.props.currentPlayerId);
    },

    render() {

        const match = this.state.match;

        const player = _.filter(match.players, function(player){
           return player.playerId === this.props.currentPlayerId;
        }, this)[0];

        if(player.playerHand.length < 7 && this.state.activePlayerId === this.props.currentPlayerId){
            this._drawCards(player, player.playerHand ? 7-player.playerHand.length : 7);
        }
        const playerHandEls = _.map(player.playerHand, function(card){
           return this._getCardEl(card, true, false, card.justDrawn ?  card.justDrawn = false && ' drawn-transition card' : 'card');
        }, this);

        const playerResourceEls = _.map(player.playerResources, function(card){
           return this._getCardEl(card, true, true);
        }, this);

        const playerStoryEls = _.map(player.playerStories, function(card){
           return this._getCardEl(card, false, true);
        }, this);

        const enemy = _.filter(match.players, function(player){
            return player.playerId !== this.props.currentPlayerId;
        }, this)[0];

        if(enemy.playerHand.length < 7 && this.state.activePlayerId !== this.props.currentPlayerId){
            this._drawCards(enemy, enemy.playerHand ? 7-enemy.playerHand.length : 7);
        }
        const enemyHandEls = _.map(enemy.playerHand, function(card){
            return this._getCardEl(card, true, false, card.justDrawn ? card.justDrawn = false && ' drawn-transition enemy-card' : 'enemy-card');
        }, this);

        const enemyResourceEls = _.map(enemy.playerResources, function(card){
            return this._getCardEl(card, true, true);
        }, this);

        const enemyStoryEls = _.map(enemy.playerStories, function(card){
            return this._getCardEl(card, false, true);
        }, this);

        return (
            <div>
                <div className='score-right'>
                    <span>{ match.playerName }, SP: { match.playerPoints } / 20</span>
                    <button onClick={ this._endTurn }>End Turn</button>
                </div>
                <div className="player-hand-frame">
                    <div className="player-hand">
                        { playerHandEls }
                    </div>
                </div>
                <div className="player-resources" onDrop={ this._onCardDroppedOnResources } onDragOver={ this._allowDrop }>
                    { playerResourceEls }
                </div>
                <div className="player-stories" onDrop={ this._onCardDroppedOnStories } onDragOver={ this._allowDrop }>
                    { playerStoryEls }
                </div>
                <div className="enemy-stories">
                    { enemyStoryEls }
                </div>
                <div className="enemy-resources">
                    { enemyResourceEls }
                </div>
                <div className="enemy-hand">
                    { enemyHandEls }
                </div>
            </div>
        );
    },

    _onCardDroppedOnStories(e){
        BoardActions.cardMove(this.state.dragPayload, 'playerStories', this.state.activePlayerId);
    },

    _onCardDroppedOnResources(e){
        BoardActions.cardMove(this.state.dragPayload, 'playerResources', this.state.activePlayerId);
    },

    _drawCards(player, number){
        if(player.playerDeck.cards.length >= number){
            _.times(number, function(){
                let cardId = player.playerDeck.cards.shift();
                let card = this._getCardById(cardId);
                card.justDrawn = true;
                player.playerHand.push(card);
            }, this);
        }
        else{
            BoardActions.playerLost(this.props.currentPlayerId, 'Ran out of cards!');
        }
    },

    _getCardById(cardId){
        return BoardStore.getCardById(cardId);
    },

    _getCardEl(card, draggable, isDropTarget, classes){

        //If in modifier cards collection we do not draw here.
        if(_.filter(this.state.match.modifierCards, function(cardItem){
            return card.cardId === cardItem.cardId;
            }).length > 0){
            return (<span></span>);
        }

        const modifierEls = _.map(card.modifiers, function(modifierCard){
            return (<div>{ modifierCard.name }</div>);
        });

        return (
            <div draggable={ draggable && this.state.activePlayerId === this.props.currentPlayerId ? "true" : "false"} onDrop={ isDropTarget && this._onCardDropped.bind(this, card) } onDragOver={ isDropTarget && this._allowDrop } className={ draggable ? "card card-draggable" : "card" + classes} onDragStart={ this._onCardDragStart.bind(this, card) }>
                <div className="card-title">{card.name}</div>
                <img className="card-picture" src={ card.imagePath }/>
                <div className="card-type">{card.type}</div>
                <div className="card-text">{card.text}</div>
                { modifierEls }
            </div>
        );
    },

    _onCardDragStart(context, event){
        this.state.dragPayload = context;
    },

    _onCardDropped(context, event){
        BoardActions.applyCardToTarget(context, this.state.dragPayload);
        delete this.state.dragPayload;
    },

    _allowDrop(e) {
        e.preventDefault();
    },

    _endTurn(e){
        //TODO
        //Check my stories on the board to see if done (including modifiers) and clear if so
        //See if any modifiers have expired or have no target
        //See if any resources are now freed
        //Set activePlayer to the next person
        //BoardActions.setActivePlayer(enemyPlayerId);
    },

    _onChange() {
        this.setState(BoardStore.get());
    }
});