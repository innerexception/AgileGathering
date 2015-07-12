import { ActionTypes } from '../Constants';
import AgileGatheringDispatcher from '../backend/AgileGatheringDispatcher';

export default {

  createdMatch(match) {
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.CREATED_MATCH,
      match
    });
  },

  joinedMatch(match, player) {
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.JOINED_MATCH,
      match,
      player
    });
  },

  startMatch(match){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.MATCH_START,
      match
    });
  },

  matchAvailable(match){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.MATCH_AVAILABLE,
      match
    });
  },

  timerUpdate(matchId){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.TIMER_UPDATE,
      matchId
    });
  },

  cardMoved(cardId, targetArea, playerId){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.CARD_MOVED,
      cardId,
      targetArea,
      playerId
    });
  },

  cardModified(targetCard, droppedCard, playerId){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.CARD_MODIFIED,
      targetCard,
      droppedCard,
      playerId
    });
  },

  drawCards(player, number){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.DRAW_CARDS,
      player,
      number
    });
  },

  setActivePlayer(playerId){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.SET_ACTIVE_PLAYER,
      playerId
    });
  },

  endTurn(playerId){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.END_TURN,
      playerId
    });
  },

  playerWon(player){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.PLAYER_WON,
      player
    });
  }
};