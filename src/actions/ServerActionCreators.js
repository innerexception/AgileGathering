import ActionTypes from '../Constants';
import Dispatcher from 'flux';

export default {

  createdMatch(matchId, ownerId, matchName) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CREATED_MATCH,
      matchId: matchId,
      ownerId: ownerId,
      matchName: matchName
    });
  },

  joinedMatch(match, playerId, playerName) {
    Dispatcher.handleViewAction({
      type: ActionTypes.JOINED_MATCH,
      match: match,
      playerId: playerId,
      playerName: playerName
    });
  },

  startMatch(match){
    Dispatcher.handleViewAction({
      type: ActionTypes.MATCH_START,
      match: match
    });
  },

  matchAvailable(matchId, ownerId, matchName, players){
    Dispatcher.handleViewAction({
      type: ActionTypes.MATCH_AVAILABLE,
      matchId: matchId,
      ownerId: ownerId,
      matchName: matchName,
      players: players
    });
  },

  timerUpdate(matchId){
    Dispatcher.handleViewAction({
      type: ActionTypes.TIMER_UPDATE,
      matchId: matchId
    });
  }
};