import _ from '../vendor/lodash.min.js';

import Dispatcher from '../backend/AgileGatheringDispatcher';
import StoreCreator from '../backend/StoreCreator';
import { ActionTypes } from '../Constants';

let cards, activePlayerId, match, hasNotDrawnThisTurn = true, currentplayerId, victoryForPlayer;

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
};

const setModifiedCardStats = (card, newModCard)=>{
    if(newModCard.type === 'delay' || newModCard.type === 'boost'){
        card.points += newModCard.points;
    }
};

const checkAllPlayerCardStats = (player, newCard)=>{
    if(newCard.pptBonus){
        _.each(player.playerResources, function(card){
            if(card.ppt) card.ppt += newCard.pptBonus;
        });
    }
};

var AgileGatheringBoardStore = StoreCreator.create({
    get: (matchProp, activePlayerIdProp, cardsProp) => {
        if(matchProp) match = matchProp;
        if(cardsProp) cards = cardsProp;
        if(activePlayerIdProp){
            activePlayerId = activePlayerIdProp;
            currentplayerId = activePlayerIdProp;
        }
        return {
            match,
            activePlayerId,
            hasNotDrawnThisTurn,
            victoryForPlayer
        };
    }
});

AgileGatheringBoardStore.dispatchToken = Dispatcher.register((payload) => {
    const action = payload;

    let changed = false;

    switch(action.type) {
        case ActionTypes.CARD_MOVED:

            let player = getPlayer(action.playerId);
            let card = getCardByOwner(action.cardId, action.playerId);
            player[action.targetArea].push(card);

            var cardIndex=-1;
            _.each(player.playerHand, function(card, i){
                if(card.cardId === action.cardId) cardIndex=i;
            });
            if(cardIndex > -1) player.playerHand.splice(cardIndex, 1);

            if(!card.isPayedFor && action.playerId === currentplayerId){

                let paid =0;
                let removeIndexes = [];
                _.each(player.resourceCardPool, function(resourceCard, i){
                   if(paid < card.cost){
                       card.modifierCards.push(resourceCard);
                       paid += resourceCard.value;
                       removeIndexes.push(i);
                   }
                });
                _.each(removeIndexes, function(index){
                   player.resourceCardPool.splice(index, 1);
                });

                card.isPayedFor = true;
            }

            checkAllPlayerCardStats(player,card);

            changed = true;
            break;
        case ActionTypes.CARD_MODIFIED:

            let otherRemotePlayer = getPlayer(action.playerId);
            let modifiedCard = getCardByOwner(action.targetCard, action.playerId);
            modifiedCard.modifiers.push(action.droppedCard);

            if(!action.droppedCard.isPayedFor && action.playerId === currentplayerId){
                let paid =0;
                let removeIndexes = [];
                _.each(otherRemotePlayer.resourceCardPool, function(resourceCard, i){
                    if(paid < card.cost){
                        card.modifierCards.push(resourceCard);
                        paid += resourceCard.value;
                        removeIndexes.push(i);
                    }
                });
                _.each(removeIndexes, function(index){
                    otherRemotePlayer.resourceCardPool.splice(index, 1);
                });

                action.droppedCard.isPayedFor = true;
            }

            setModifiedCardStats(modifiedCard, action.droppedCard);

            if(!otherRemotePlayer.modifierCards) otherRemotePlayer.modifierCards = [];
            otherRemotePlayer.modifierCards.push(action.droppedCard);
            changed = true;
            break;
        case ActionTypes.CARD_UNMODIFIED:
            let unmodifyCard = getCardByOwner(action.targetCard, action.playerId);
            unmodifyCard.modifiers = _.filter(unmodifyCard.modifiers, function(modifier){
                return modifier.cardId !== action.droppedCard.cardId;
            })[0];

            otherOtherRemotePlayer.modifierCards = _.filter(otherOtherRemotePlayer.modifierCards, function(card){
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
                            justDrawn: true,
                            upkeep: card.upkeep,
                            value: card.value,
                            pptBonus: card.pptBonus,
                            ppt: card.ppt,
                            cost: card.cost
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
            let playerTurnOver = getPlayer(action.playerId);
            _.each(playerTurnOver.playerStories, function(storyCard){
                _.each(storyCard.modifiers, function(modifierCard){
                    if(modifierCard.type === 'resource'){
                        if(modifierCard.ppt){
                            storyCard.points -= modifierCard.ppt;
                            playerTurnOver.playerPoints += modifierCard.ppt;
                            if(playerTurnOver.playerPoints >= 20){
                                victoryForPlayer = playerTurnOver;
                            }
                            if(storyCard.points <= 0){
                                let freedResources = _.filter(storyCard.modifierCards, function(card){
                                    return card.type === 'resource';
                                });
                                playerTurnOver.playerResources = playerTurnOver.playerResources.concat(freedResources);

                                storyCard.modifierCards = _.filter(storyCard.modifierCards, function(card){
                                    return card.type !== 'resource';
                                });
                                playerTurnOver.modifierCards = _.filter(playerTurnOver.modifierCards, function(card){
                                    return card.cardId !== storyCard.cardId;
                                });
                                storyCard.isCompleted = true;
                            }
                        }
                    }
                })
            });

            //Set activePlayer to the next person
            const enemy = _.filter(match.players, function(player){
                return player.playerId !== playerTurnOver.playerId;
            })[0];
            activePlayerId = enemy.playerId;

            changed = true;
            break;
    }

    if(changed) AgileGatheringBoardStore.emitChange();
});

export default AgileGatheringBoardStore;
