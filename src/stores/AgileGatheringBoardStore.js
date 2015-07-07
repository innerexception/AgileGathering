import _ from '../vendor/lodash.min.js';

import Dispatcher from '../backend/AgileGatheringDispatcher';
import StoreCreator from '../backend/StoreCreator';
import { ActionTypes, Cards } from '../Constants';

let activePlayerId, match;

const getCardByOwner = (card, ownerId) => {
    let owner = _.filter(match.players, function(player){
        return player.playerId === ownerId;
    });
    return _.filter(owner.playerDeck, function(cardItem){
        return cardItem.cardId === card.cardId;
    });
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
            });
            player[action.targetArea].push(action.card);
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
            });
            match.modifierCards = _.filter(match.modifierCards, function(card){
                return card.cardId !== action.droppedCard.cardId;
            });
            changed = true;
            break;
    }

    if(changed) AgileGatheringBoardStore.emitChange();
});

export default AgileGatheringBoardStore;
