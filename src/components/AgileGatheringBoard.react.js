import React from 'react';
import BoardActions from '../actions/BoardActionCreators.js';
import BoardStore from '../stores/AgileGatheringBoardStore.js';

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

    //getInitialState(){
    //    return BoardStore.get();
    //},

    getInitialState(){
        return {
            match: this.props.match,
            activePlayerId: this.props.currentPlayerId
        }
    },

    render() {

        const match = this.state.match;

        const player = _.filter(match.players, function(player){
           return player.playerId === this.props.currentPlayerId;
        });

        if(player.playerHand.length < 7 && this.state.activePlayerId === this.props.currentPlayerId){
            this._drawCards(player, player.playerHand ? 7-player.playerHand.length : 7);
        }
        const playerHandEls = _.map(player.playerHand, function(card){
           return this._getCardEl(card, true, false, card.justDrawn ? ' drawn-transition' : '');
        });

        const playerResourceEls = _.map(player.playerResources, function(card){
           return this._getCardEl(card, true, true);
        });

        const playerStoryEls = _.map(player.playerStories, function(card){
           return this._getCardEl(card, false, true);
        });

        const enemy = _.filter(match.players, function(player){
            return player.playerId !== this.props.currentPlayerId;
        });

        if(enemy.playerHand.length < 7 && this.state.activePlayerId !== this.props.currentPlayerId){
            this._drawCards(enemy, enemy.playerHand ? 7-enemy.playerHand.length : 7);
        }
        const enemyHandEls = _.map(enemy.playerHand, function(card){
            return this._getCardEl(card, true, false, card.justDrawn ? ' drawn-transition enemy-card' : 'enemy-card');
        });

        const enemyResourceEls = _.map(enemy.playerResources, function(card){
            return this._getCardEl(card, true, true);
        });

        const enemyStoryEls = _.map(enemy.playerStories, function(card){
            return this._getCardEl(card, false, true);
        });

        return (
            <div>
                <div className='score-right'>
                    <span>{ match.playerName }, SP: { match.playerPoints } / 20</span>
                    <button onClick={ this._endTurn }>End Turn</button>
                </div>
                <div>
                    { playerHandEls }
                </div>
                <div onDrop={ this._onCardDroppedOnResources } onDragOver={ this._allowDrop }>
                    { playerResourceEls }
                </div>
                <div onDrop={ this._onCardDroppedOnStories } onDragOver={ this._allowDrop }>
                    { playerStoryEls }
                </div>
                <div onDrop={ this._onCardDroppedOnEnemyStory } onDragOver={ this._allowDrop }>
                    { enemyStoryEls }
                </div>
                <div onDrop={ this._onCardDroppedOnEnemyResource } onDragOver={ this._allowDrop }>
                    { enemyResourceEls }
                </div>
                <div>
                    { enemyHandEls }
                </div>
            </div>
        );
    },

    _drawCards(player, number){
        if(player.playerDeck.cards.length >= number){
            _.times(number, function(){
                let card = player.playerDeck.cards.shift();
                card.justDrawn = true;
                player.playerHand.push(card);
            });
        }
        else{
            BoardActions.playerLost(this.props.currentPlayerId, 'Ran out of cards!');
        }
    },

    _getCardEl(card, draggable, isDropTarget, classes){
        //TODO draw indication for any modifiers of this card
        return (
            <span draggable={ draggable && this.state.activePlayerId === this.props.currentPlayerId ? "true" : "false"} onDrop={ isDropTarget && this._onCardDropped } onDragOver={ isDropTarget && this._allowDrop } className={ draggable ? "card-draggable" : "card" + classes} onDragStart={ this._onCardDragStart }>
                <div>{card.name}</div>
                <img src={ card.imagePath }/>
                <div>{card.text}</div>
            </span>
        );
    },

    _onCardDragStart(e, target){
        this.state.dragPayload = target;
    },

    _onCardDropped(e, target){
        BoardActions.applyCardToTarget(target, this.state.dragPayload);
        delete this.state.dragPayload;
    },

    _allowDrop(e) {
        e.original.preventDefault();
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