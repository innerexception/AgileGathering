import ActionTypes from '../Constants';
import Dispatcher from 'utils/Dispatcher';

import RealtimeAPI from '../apis/RealtimeAPI';

export default {
    selectMatch(matchId) {
        Dispatcher.handleViewAction({
            type: ActionTypes.SELECTED_MATCH,
            matchId: matchId
        });
    },

    createMatch(playerId, playerName) {
        RealtimeAPI.createMatch(playerId, playerName);
    },

    matchReady(matchId, playerId){
        Dispatcher.handleViewAction({
            type: ActionTypes.MATCH_READY,
            matchId: matchId,
            playerId: playerId
        });
    },

    joinMatch(match, playerId, playerName) {
        RealtimeAPI.sendJoinMessage(match, playerId, playerName);
        Dispatcher.handleViewAction({
            type: ActionTypes.DISABLE_JOIN_BUTTON
        });
    },

    startMatch(match){
        Dispatcher.handleViewAction({
            type: ActionTypes.MATCH_START,
            match: match
        });
        RealtimeAPI.startMatch(match);
    }
};