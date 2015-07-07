import { ActionTypes } from '../Constants';
import AgileGatheringDispatcher from '../backend/AgileGatheringDispatcher';

import RealtimeAPI from '../backend/RealtimeAPI';

export default {
    chooseDeck(deck) {
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.CHOOSE_DECK,
            deck
        });
    },

    selectDeck(deck) {
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.SELECTED_DECK,
            deck
        });
    },

    deleteDeck(deck){
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.DELETE_DECK,
            deck
        });
    },

    createDeck() {
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.CREATE_DECK
        });
    },

    toggleCardInDeck(card, deck){
        AgileGatheringDispatcher.dispatch({
            type: ActionTypes.TOGGLE_CARD,
            deck,
            card
        });
    }
};