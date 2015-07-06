import ActionTypes from '../Constants';
import Dispatcher from 'utils/Dispatcher';

import RealtimeAPI from '../apis/RealtimeAPI';

export default {
    chooseDeck(deck) {
        Dispatcher.handleViewAction({
            type: ActionTypes.CHOOSE_DECK,
            deck
        });
    },

    selectDeck(deck) {
        Dispatcher.handleViewAction({
            type: ActionTypes.SELECTED_DECK,
            deck
        });
    },

    deleteDeck(deck){
        Dispatcher.handleViewAction({
            type: ActionTypes.DELETE_DECK,
            deck
        });
    },

    createDeck() {
        Dispatcher.handleViewAction({
            type: ActionTypes.CREATE_DECK
        });
    },

    toggleCardInDeck(card, deck){
        Dispatcher.handleViewAction({
            type: ActionTypes.TOGGLE_CARD,
            deck,
            card
        });
    }
};