import ActionTypes from '../Constants';
import Dispatcher from 'flux';

import RealtimeAPI from '../backend/RealtimeAPI';

export default {
    chooseDeck(deck) {
        Dispatcher.dispatch({
            type: ActionTypes.CHOOSE_DECK,
            deck
        });
    },

    selectDeck(deck) {
        Dispatcher.dispatch({
            type: ActionTypes.SELECTED_DECK,
            deck
        });
    },

    deleteDeck(deck){
        Dispatcher.dispatch({
            type: ActionTypes.DELETE_DECK,
            deck
        });
    },

    createDeck() {
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_DECK
        });
    },

    toggleCardInDeck(card, deck){
        Dispatcher.dispatch({
            type: ActionTypes.TOGGLE_CARD,
            deck,
            card
        });
    }
};