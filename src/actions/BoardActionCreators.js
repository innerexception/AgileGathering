import ActionTypes from '../Constants';
import Dispatcher from 'flux';
import RealtimeAPI from '../backend/RealtimeAPI';

export default {
    cardMove(card, targetArea){
        Dispatcher.dispatch({
            type: ActionTypes.CARD_MOVE,
            card,
            targetArea
        });
        RealtimeAPI.cardMoved(card.cardId, targetArea);
    },
    playerLost(playerId, message){
        Dispatcher.dispatch({
            type: ActionTypes.GAME_LOST,
            playerId,
            message
        });
        RealtimeAPI.gameLost(playerId, message);
    },
    applyCardToTarget(targetCard, droppedCard){
        //TODO this is what the store will do: targetCard.modifiers.push(droppedCard);
        Dispatcher.dispatch({
            type: ActionTypes.CARD_MODIFIED,
            targetCard,
            droppedCard
        });
        RealtimeAPI.cardModified(targetCard, droppedCard);
    }
};