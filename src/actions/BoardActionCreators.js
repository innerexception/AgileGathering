import RealtimeAPI from '../backend/RealtimeAPI';

export default {
    cardMove(card, targetArea, playerId){
        RealtimeAPI.cardMoved(card.cardId, targetArea, playerId);
    },
    playerLost(playerId, message){
        RealtimeAPI.gameLost(playerId, message);
    },
    applyCardToTarget(targetCard, droppedCard, playerId){
        RealtimeAPI.cardModified(targetCard, droppedCard, playerId);
    }
};