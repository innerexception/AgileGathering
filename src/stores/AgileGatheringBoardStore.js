import _ from '../vendor/lodash.min.js';

import Dispatcher from '../backend/AgileGatheringDispatcher';
import StoreCreator from '../backend/StoreCreator';
import { ActionTypes } from '../Constants';

let cards, activePlayerId, match, hasNotDrawnThisTurn = true;

const getCardByOwner = (card, ownerId) => {

    if(typeof card !== 'object'){
        card = getCardById(card);
    }

    let owner = _.filter(match.players, function(player){
        return player.playerId === ownerId;
    })[0];
    //TODO need to return new instance potentially if found in deck
    let deckIdMatches = _.filter(owner.playerDeck.cardIds, function(cardId){
        return cardId === card.cardId;
    })[0];

    if(deckIdMatches){
        return getCardById(deckIdMatches);
    }

    let resourceMatches = _.filter(owner.playerResources, function(cardItem){
        return card.cardId === cardItem.cardId;
    })[0];

    if(resourceMatches) return resourceMatches;

    let storyMatches = _.filter(owner.playerStories, function(cardItem){
        return card.cardId === cardItem.cardId;
    })[0];

    if(storyMatches) return storyMatches;

    let handMatches = _.filter(owner.playerHand, function(cardItem){
        return card.cardId === cardItem.cardId;
    })[0];

    if(handMatches) return handMatches;

    else return {error: 'getCardByOwner: Card was not found!'};
};

const getCardById = (cardId)=>{
    return _.filter(cards, function(card){
        return cardId === card.cardId;
    })[0];
};

const getPlayer = (playerId) =>{
    return _.filter(match.players, function(player){
        return player.playerId === playerId;
    })[0];
}

var AgileGatheringBoardStore = StoreCreator.create({
    get: (matchProp, activePlayerIdProp, cardsProp) => {
        if(matchProp) match = matchProp;
        if(cardsProp) cards = cardsProp;
        if(activePlayerIdProp) activePlayerId = activePlayerIdProp;
        return {
            match,
            activePlayerId,
            hasNotDrawnThisTurn
        };
    }
});

AgileGatheringBoardStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload;

    let changed = false;

    switch(action.type) {
        case ActionTypes.CARD_MOVED:
            let player = getPlayer(action.playerId);
            player[action.targetArea].push(getCardByOwner(action.cardId, action.playerId));
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
            let otherRemotePlayer = getPlayer(action.playerId);
            if(!otherRemotePlayer.modifierCards) otherRemotePlayer.modifierCards = [];
            otherRemotePlayer.modifierCards.push(action.droppedCard);
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

            let remotePlayer = getPlayer(action.player.playerId);

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

                        remotePlayer.playerHand.push({
                            cardId: card.cardId,
                            modifiers: [],
                            name: card.name,
                            text: card.text,
                            imagePath: card.imagePath,
                            type: card.type,
                            points: card.points,
                            justDrawn: true
                        });
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
