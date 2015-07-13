import React from 'react';
import BoardActions from '../actions/BoardActionCreators.js';
import BoardStore from '../stores/AgileGatheringBoardStore.js';
import styles from './AgileGatheringBoard.css';
import { CardTypes } from '../Constants';

export default React.createClass({

    propTypes: {
        match:  React.PropTypes.object.isRequired,
        currentPlayerId: React.PropTypes.string.isRequired,
        activePlayerId: React.PropTypes.string.isRequired,
        cards: React.PropTypes.array.isRequired
    },

    componentDidMount(){
        let self=this;
        setTimeout(()=>{
            self.setState({ transitionIn: true});
        }, 500);
    },

    componentWillMount() {
        BoardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        BoardStore.removeChangeListener(this._onChange);
    },

    getInitialState(){
        return BoardStore.get(this.props.match, this.props.activePlayerId, this.props.currentPlayerId, this.props.cards);
    },

    render() {

        const match = this.state.match;

        const player = _.filter(match.players, function(player){
           return player.playerId === this.props.currentPlayerId;
        }, this)[0];

        if(player.playerHand.length < 7 && this.state.activePlayerId === this.props.currentPlayerId && this.state.hasNotDrawnThisTurn){
            this._drawCards(player, player.playerHand ? 7-player.playerHand.length : 7);
        }
        const playerHandEls = _.map(player.playerHand, function(card){
           return this._getCardEl(card, true, false, card.justDrawn ?  card.justDrawn = false && ' drawn-transition card ' : 'card', false, player.modifierCards);
        }, this);

        const playerResourceEls = _.map(player.playerResources, function(card){
           return this._getCardEl(card, true, true, null, false, player.modifierCards);
        }, this);

        const playerStoryEls = _.map(player.playerStories, function(card){
           return this._getCardEl(card, false, true, null, false, player.modifierCards);
        }, this);

        const enemy = _.filter(match.players, function(player){
            return player.playerId !== this.props.currentPlayerId;
        }, this)[0];

        if(enemy.playerHand.length < 7 && this.state.activePlayerId !== this.props.currentPlayerId){
            this._drawCards(enemy, enemy.playerHand ? 7-enemy.playerHand.length : 7);
        }
        const enemyHandEls = _.map(enemy.playerHand, function(card){
            return this._getCardEl(card, true, false, card.justDrawn ? card.justDrawn = false && ' drawn-transition enemy-card' : 'enemy-card', true, enemy.modifierCards);
        }, this);

        const enemyResourceEls = _.map(enemy.playerResources, function(card){
            return this._getCardEl(card, true, true, null, false, enemy.modifierCards);
        }, this);

        const enemyStoryEls = _.map(enemy.playerStories, function(card){
            return this._getCardEl(card, false, true, null, false, enemy.modifierCards);
        }, this);

        return this.state.victoryForPlayer ? (<div className="jumbotron atg-label victory">Victory to: { this.state.victoryForPlayer.playerName + " " + this.state.victoryForPlayer.victoryMessage }</div>) :
            (<div className={ this.state && this.state.transitionIn ? "deck-builder-transition jumbotron deck-builder-in" : "deck-builder-transition jumbotron" }>
                <div className='score-right'>
                    Resources:
                    <div className="player-resource-count-outer">
                        <div className="player-resource-count-inner">{ player.resourcePool }</div>
                    </div>
                    <span className="name-score-label">{ player.playerName },  SP: { player.playerPoints } / 20, Deck Remaining: { player.playerDeck.cardIds.length }</span>
                    <button disabled={ this.state.activePlayerId !== this.props.currentPlayerId } onClick={ this._endTurn }>{ this.state.activePlayerId !== this.props.currentPlayerId ? "Enemy Turn" : "End Turn"}</button>
                </div>
                <div className="player-hand-frame">
                    <div className="player-hand">
                        { playerHandEls }
                    </div>
                </div>
                <div>
                    <div className="you-label">You</div>
                    <div className="player-resources" onDrop={ this._onCardDroppedOnResources } onDragOver={ this._allowDropOnResources }>
                        <div className="resources-label">Resources</div>
                        { playerResourceEls }
                    </div>
                    <div className="player-stories" onDrop={ this._onCardDroppedOnStories } onDragOver={ this._allowDropOnStories }>
                        <div className="story-label">Stories</div>
                        { playerStoryEls }
                    </div>
                </div>
                <div>
                    <div className="enemy-label">Enemy</div>
                    <div className="enemy-stories">
                        { enemyStoryEls }
                    </div>
                    <div className="enemy-resources">
                        { enemyResourceEls }
                    </div>
                </div>
                <div className="enemy-hand">
                    { enemyHandEls }
                </div>
            </div>
        );
    },

    _onCardDroppedOnStories(e){
        if(this.state.dragPayload && this.state.dragPayload.type === 'story') BoardActions.cardMove(this.state.dragPayload, 'playerStories', this.state.activePlayerId);
        delete this.state.dragPayload;
    },

    _onCardDroppedOnResources(e){
        if(this.state.dragPayload && this.state.dragPayload.type === 'resource') BoardActions.cardMove(this.state.dragPayload, 'playerResources', this.state.activePlayerId);
        delete this.state.dragPayload;
    },

    _drawCards(player, number){
        BoardActions.drawCards(player, number);
    },

    _getCardEl(card, draggable, isDropTarget, classes, showCardBack, playerModifierCards){

        //If in modifier cards collection we do not draw here.
        if(_.filter(playerModifierCards, function(cardItem){
            return card.cardId === cardItem.cardId;
            }).length > 0){
            return (<span></span>);
        }

        if(showCardBack){
            return (
                <div className="card-back">
                    <div className="card-back-inner"></div>
                    <div className="card-back-title">Agile:</div>
                    <div className="card-back-subtitle">The Gathering</div>
                </div>
            );
        }

        const length = card.modifiers.length;
        const modifierEls = _.map(card.modifiers, function(modifierCard, i){
            return (
                <div className="card card-modifier" style={{marginTop:-25*(length-i), marginRight: "-120px", backgroundImage: "url(\""+CardTypes[card.type].imagePath+"\")"}}>
                    <div className="card-title">{modifierCard.name}</div>
                    <img className="card-picture" src={ modifierCard.imagePath }/>
                    <div className="card-type">{modifierCard.type}</div>
                    <div className="card-text">{modifierCard.text}</div>
                </div>
            );
        });

        let pptEl = card.ppt && (<div className="card-ppt-badge">{ card.ppt }</div>);
        let valueEl = card.value && (<div className="card-value-badge">{ card.value }</div>);
        let costEl = card.cost ? (<div className="card-cost-badge-fill">
            <div className="card-cost-badge">{ card.cost }</div>
        </div>) :
            (<div className="card-cost-badge-fill">
                <div className="card-cost-badge">0</div>
            </div>);

        return (
            <div className="card-stacks">
                { modifierEls }
                <div style={{ backgroundImage: "url(\""+CardTypes[card.type].imagePath+"\")"}} draggable={ draggable && this.state.activePlayerId === this.props.currentPlayerId ? true : false}
                    onDrop={ isDropTarget && this._onCardDropped.bind(this, card) }
                    onDragOver={ isDropTarget && this._allowDrop.bind(this, card) }
                    className={ (draggable ? "card card-draggable" : "card ") + classes + (" "+card.isCompleted && " card-complete ") + (card.isInPool && " card-pooled")}
                    onDragStart={ this._onCardDragStart.bind(this, card) }>
                    { costEl }
                    <div className="card-title">{card.name}</div>
                    <img className="card-picture" src={ card.imagePath }/>
                    <div className="card-type">{card.type}</div>
                    { valueEl}
                    <div className="card-text">{card.text + this._getPointsText(card) + this._getPptText(card)}</div>
                    { pptEl }
                </div>
            </div>
        );
    },

    _getPointsText(card) {
        return card.points ? (' ' + (card.points > 0 && card.type === 'story' ? '+' : '') + card.points + ' points to complete ' + (card.type !== 'story' ? ' on targeted card' : '')) : '';
    },

    _getPptText(card){
        return card.ppt ? (' +' +card.ppt+ ' points completed on \'stories\' per turn'):'';
    },

    _onCardDragStart(context, event){
        if(this._hasEnoughResources(context)){
            this.state.dragPayload = context;
        }
        else{
            //TODO flash resource meter
            //TODO add flaire
            //BoardActions.showFlaire('Not enough resources available!');
        }
    },

    _onCardDropped(context, event){
        if(this._isValidTarget(context, this.state.dragPayload)){
            BoardActions.applyCardToTarget(context, this.state.dragPayload, context.ownerId);
        }
        delete this.state.dragPayload;
    },

    _allowDrop(context, event) {
        if(this._isValidTarget(context, this.state.dragPayload)){
            event.preventDefault();
        }
    },

    _allowDropOnResources(e) {
        if(this.state.dragPayload && this.state.dragPayload.type === 'resource') e.preventDefault();
    },

    _allowDropOnStories(e) {
        if(this.state.dragPayload && this.state.dragPayload.type === 'story') e.preventDefault();
    },

    _endTurn(e){
        BoardActions.endTurn(this.props.currentPlayerId);
    },

    _isValidTarget(targetCard, droppedCard){
        switch(targetCard.type){
            case 'resource':
                if(droppedCard.type === 'delay' || droppedCard.type === 'boost') return true;
                break;
            case 'story':
                if(droppedCard.type !== 'story') return true;
                break;
        }
        //(Delays and boosts can't be drop targets.)
        return false;
    },

    _hasEnoughResources(card){
        if(!card.isPayedFor){
            let player = _.filter(this.state.match.players, function(player){
                return player.playerId === this.props.currentPlayerId;
            }, this)[0];

            if(!card.cost) card.cost = 0;
            return card.cost <= player.resourcePool;
        }
        else{
            return true;
        }

    },

    _onChange() {
        this.setState(BoardStore.get());
    }
});