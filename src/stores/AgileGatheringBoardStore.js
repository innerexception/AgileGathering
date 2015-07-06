import _ from '../vendor/lodash.min.js';

import Dispatcher from 'flux';
import StoreCreator from '../backend/StoreCreator';
import ActionTypes from '../Constants';

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
        return {
            match: matchProp ? matchProp : match,
            activePlayerId: activePlayerIdProp ? activePlayerIdProp : activePlayerId
        };
    }
});

AgileGatheringBoardStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload;

    switch(action.type) {
        case ActionTypes.CARD_MOVED:
            let player = _.filter(match.players, function(player){
                return player.playerId === action.playerId;
            });
            player[action.targetArea].push(action.card);
            break;
        case ActionTypes.CARD_MODIFIED:
            let card = getCardByOwner(action.targetCard, action.playerId);
            card.modifiers.push(action.droppedCard);
            match.modifierCards.push(action.droppedCard);
            break;
        case ActionTypes.CARD_UNMODIFIED:
            let card = getCardByOwner(action.targetCard, action.playerId);
            card.modifiers = _.filter(card.modifiers, function(modifier){
                return modifier.cardId !== action.droppedCard.cardId;
            });
            match.modifierCards = _.filter(match.modifierCards, function(card){
                return card.cardId !== action.droppedCard.cardId;
            });
            break;
    }

    AgileGatheringBoardStore.emitChange();
});

export default AgileGatheringBoardStore;
