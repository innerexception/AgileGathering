import RealtimeAPI from '../backend/RealtimeAPI';
import Dispatcher from '../backend/AgileGatheringDispatcher';
import { ActionTypes } from '../Constants';

export default {
    cardMove(card, targetArea, playerId){
        RealtimeAPI.cardMoved(card.cardId, targetArea, playerId);
    },
    applyCardToTarget(targetCard, droppedCard, playerId){
        RealtimeAPI.cardModified(targetCard, droppedCard, playerId);
    },
    drawCards(player, number){
        RealtimeAPI.drawCards(player, number);
    },
    showFlaire(message, color){
        Dispatcher.dispatch({
            type: ActionTypes.SHOW_FLAIRE,
            message,
            color
        });

        setTimeout(()=>{
            Dispatcher.dispatch({
                type: ActionTypes.SHOW_FLAIRE,
                message: ""
            });
        }, 3500);
    },
    endTurn(playerId){
        RealtimeAPI.endTurn(playerId);
    }
};