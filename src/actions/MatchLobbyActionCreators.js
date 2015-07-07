import { ActionTypes } from '../Constants';
import AgileGatheringDispatcher from '../backend/AgileGatheringDispatcher';

import RealtimeAPI from '../backend/RealtimeAPI';
RealtimeAPI.launch();

export default {
    selectMatch(matchId) {
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.SELECTED_MATCH,
            matchId: matchId
        });
    },

    createMatch(playerId, playerName) {
        RealtimeAPI.createMatch(playerId, playerName);
    },

    matchReady(matchId, playerId){
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.MATCH_READY,
            matchId: matchId,
            playerId: playerId
        });
    },

    joinMatch(match, playerId, playerName) {
        RealtimeAPI.sendJoinMessage(match, playerId, playerName);
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.DISABLE_JOIN_BUTTON
        });
    },

    startMatch(match, playerId){
        match.currentPlayerId = playerId;
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.MATCH_START,
            match: match
        });
        RealtimeAPI.startMatch(match);
    }
};