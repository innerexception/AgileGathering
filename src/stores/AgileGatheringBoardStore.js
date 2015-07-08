import _ from '../vendor/lodash.min.js';

import Dispatcher from '../backend/AgileGatheringDispatcher';
import StoreCreator from '../backend/StoreCreator';
import { ActionTypes, Cards } from '../Constants';

let activePlayerId, match, hasNotDrawnThisTurn = true;

const getCardByOwner = (card, ownerId) => {
    let owner = _.filter(match.players, function(player){
        return player.playerId === ownerId;
    })[0];
    let deckIdMatches = _.filter(owner.playerDeck.cardIds, function(cardId){
        return cardId === card.cardId;
    })[0];

    if(deckIdMatches){
        return getCardById(deckIdMatches);
    }

    return _.filter(owner.playerHand, function(cardItem){
        return card.cardId === cardItem.cardId;
    })[0];
};

const getCardById = (cardId)=>{
    return _.filter(Cards, function(card){
        return cardId === card.cardId;
    })[0];
};

const getCardByOwnerAndId = (cardId, ownerId) => {
    let owner = _.filter(match.players, function(player){
        return player.playerId === ownerId;
    })[0];
    let deckIdMatches = _.filter(owner.playerDeck.cardIds, function(cardItem){
        return cardItem === cardId;
    })[0];

    if(deckIdMatches){
        return getCardById(deckIdMatches);
    }

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
            activePlayerId,
            hasNotDrawnThisTurn
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
            var cardIndex=0;
            _.each(player.playerHand, function(card, i){
                if(card.cardId === action.cardId) cardIndex=i;
            });
            player.playerHand.splice(cardIndex, 1);

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
        case ActionTypes.DRAW_CARDS:

            let remotePlayer = _.filter(match.players, function(player){
                return player.playerId === action.player.playerId;
            })[0];

            if(remotePlayer.playerId === activePlayerId){
                if(!hasNotDrawnThisTurn){
                    return;
                }
                hasNotDrawnThisTurn = false;
            }

            if(remotePlayer.playerDeck.cardIds.length >= action.number){
                if(remotePlayer.playerHand.length < 7){
                    for(var i = 0; i < action.number; i++) {
                        let cardId = remotePlayer.playerDeck.cardIds.shift();
                        let card = getCardById(cardId);
                        card.justDrawn = true;
                        remotePlayer.playerHand.push(card);
                    }
                }
            }
            else{
                remotePlayer.playerDeck.cardIds = [];
                remotePlayer.playerHand = [];
            }
            changed = true;
            break;
        case ActionTypes.END_TURN:
            hasNotDrawnThisTurn = true;
            changed = true;
            break;
    }

    if(changed) AgileGatheringBoardStore.emitChange();
});

export default AgileGatheringBoardStore;
