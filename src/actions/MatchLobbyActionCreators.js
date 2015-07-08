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

    createMatch(playerId, playerName, playerDeck) {
        let match ={
            matchId: Math.random() + '_match',
            ownerId: playerId,
            matchName: playerName + ' \'s game',
            modifierCards: [],
            players: [{
                playerName,
                playerId,
                playerDeck,
                playerHand: [],
                playerResources: [],
                playerStories: [],
                playerPoints: 0
            }]
        };
        RealtimeAPI.createMatch(match);
    },

    matchReady(matchId, playerId){
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.MATCH_READY,
            matchId: matchId,
            playerId: playerId
        });
    },

    joinMatch(match, player) {
        RealtimeAPI.sendJoinMessage(match, player);
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