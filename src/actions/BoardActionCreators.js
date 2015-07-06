import ActionTypes from '../Constants';
import Dispatcher from 'flux';
import RealtimeAPI from '../backend/RealtimeAPI';

export default {
    cardMove(card, targetArea, playerId){
        Dispatcher.dispatch({
            type: ActionTypes.CARD_MOVE,
            card,
            targetArea,
            playerId
        });
        RealtimeAPI.cardMoved(card.cardId, targetArea, playerId);
    },
    playerLost(playerId, message){
        Dispatcher.dispatch({
            type: ActionTypes.GAME_LOST,
            playerId,
            message
        });
        RealtimeAPI.gameLost(playerId, message);
    },
    applyCardToTarget(targetCard, droppedCard, playerId){
        Dispatcher.dispatch({
            type: ActionTypes.CARD_MODIFIED,
            targetCard,
            droppedCard,
            playerId
        });
        RealtimeAPI.cardModified(targetCard, droppedCard, playerId);
    }
};