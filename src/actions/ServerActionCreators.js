import ActionTypes from '../Constants';
import Dispatcher from 'flux';

export default {

  createdMatch(matchId, ownerId, matchName) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATED_MATCH,
      matchId,
      ownerId,
      matchName
    });
  },

  joinedMatch(match, playerId, playerName) {
    Dispatcher.dispatch({
      type: ActionTypes.JOINED_MATCH,
      match,
      playerId,
      playerName
    });
  },

  startMatch(match){
    Dispatcher.dispatch({
      type: ActionTypes.MATCH_START,
      match
    });
  },

  matchAvailable(matchId, ownerId, matchName, players){
    Dispatcher.dispatch({
      type: ActionTypes.MATCH_AVAILABLE,
      matchId,
      ownerId,
      matchName,
      players
    });
  },

  timerUpdate(matchId){
    Dispatcher.dispatch({
      type: ActionTypes.TIMER_UPDATE,
      matchId
    });
  },

  cardMoved(cardId, targetArea){
    Dispatcher.dispatch({
      type: ActionTypes.CARD_MOVED,
      cardId,
      targetArea
    });
  }
};