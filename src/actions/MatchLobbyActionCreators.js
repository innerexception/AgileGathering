import ActionTypes from '../Constants';
import Dispatcher from 'flux';

import RealtimeAPI from '../backend/RealtimeAPI';

export default {
    selectMatch(matchId) {
        Dispatcher.dispatch({
            type: ActionTypes.SELECTED_MATCH,
            matchId: matchId
        });
    },

    createMatch(playerId, playerName) {
        RealtimeAPI.createMatch(playerId, playerName);
    },

    matchReady(matchId, playerId){
        Dispatcher.dispatch({
            type: ActionTypes.MATCH_READY,
            matchId: matchId,
            playerId: playerId
        });
    },

    joinMatch(match, playerId, playerName) {
        RealtimeAPI.sendJoinMessage(match, playerId, playerName);
        Dispatcher.dispatch({
            type: ActionTypes.DISABLE_JOIN_BUTTON
        });
    },

    startMatch(match, playerId){
        match.currentPlayerId = playerId;
        Dispatcher.dispatch({
            type: ActionTypes.MATCH_START,
            match: match
        });
        RealtimeAPI.startMatch(match);
    }
};