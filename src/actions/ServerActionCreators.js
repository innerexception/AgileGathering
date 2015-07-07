import { ActionTypes } from '../Constants';
import AgileGatheringDispatcher from '../backend/AgileGatheringDispatcher';

export default {

  createdMatch(matchId, ownerId, matchName) {
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.CREATED_MATCH,
      matchId,
      ownerId,
      matchName
    });
  },

  joinedMatch(match, playerId, playerName) {
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.JOINED_MATCH,
      match,
      playerId,
      playerName
    });
  },

  startMatch(match){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.MATCH_START,
      match
    });
  },

  matchAvailable(matchId, ownerId, matchName, players){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.MATCH_AVAILABLE,
      matchId,
      ownerId,
      matchName,
      players
    });
  },

  timerUpdate(matchId){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.TIMER_UPDATE,
      matchId
    });
  },

  cardMoved(cardId, targetArea){
    AgileGatheringDispatcher.dispatch({
      type: ActionTypes.CARD_MOVED,
      cardId,
      targetArea
    });
  }
};