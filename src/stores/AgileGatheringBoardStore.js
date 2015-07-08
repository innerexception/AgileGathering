import _ from '../vendor/lodash.min.js';

import Dispatcher from '../backend/AgileGatheringDispatcher';
import StoreCreator from '../backend/StoreCreator';
import { ActionTypes, Cards } from '../Constants';

let activePlayerId, match;

const getCardByOwner = (card, ownerId) => {
    let owner = _.filter(match.players, function(player){
        return player.playerId === ownerId;
    })[0];
    let deckMatches = _.filter(owner.playerDeck, function(cardId){
        return cardId === card.cardId;
    })[0];
    if(deckMatches) return deckMatches;

    return _.filter(owner.playerHand, function(cardItem){
        return card.cardId === cardItem.cardId;
    })[0];
};

const getCardByOwnerAndId = (cardId, ownerId) => {
    let owner = _.filter(match.players, function(player){
        return player.playerId === ownerId;
    })[0];
    let deckMatches = _.filter(owner.playerDeck.cards, function(cardItem){
        return cardItem === cardId;
    })[0];
    if(deckMatches) return deckMatches;

    return _.filter(owner.playerHand, function(card){
        return card.cardId === cardId;
    })[0];
};

var AgileGatheringBoardStore = StoreCreator.create({
    get: (matchProp, activePlayerIdProp) => {
        if(matchProp) match = matchProp;
        if(activePlayerIdProp) activePlayerId = activePlayerIdProp;
        return {
            match,
            activePlayerId
        };
    }
});

AgileGatheringBoardStore.getCardById = (cardId)=>{
    return _.filter(Cards, function(card){
        return card.cardId === cardId;
    })[0];
};

AgileGatheringBoardStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload;

    let changed = false;

    switch(action.type) {
        case ActionTypes.CARD_MOVED:
            let player = _.filter(match.players, function(player){
                return player.playerId === action.playerId;
            })[0];
            player[action.targetArea].push(getCardByOwnerAndId(action.cardId, action.playerId));
            changed = true;
            break;
        case ActionTypes.CARD_MODIFIED:
            let card = getCardByOwner(action.targetCard, action.playerId);
            card.modifiers.push(action.droppedCard);
            match.modifierCards.push(action.droppedCard);
            changed = true;
            break;
        case ActionTypes.CARD_UNMODIFIED:
            let unmodifyCard = getCardByOwner(action.targetCard, action.playerId);
            unmodifyCard.modifiers = _.filter(unmodifyCard.modifiers, function(modifier){
                return modifier.cardId !== action.droppedCard.cardId;
            })[0];
            match.modifierCards = _.filter(match.modifierCards, function(card){
                return card.cardId !== action.droppedCard.cardId;
            })[0];
            changed = true;
            break;
    }

    if(changed) AgileGatheringBoardStore.emitChange();
});

export default AgileGatheringBoardStore;
