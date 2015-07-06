import _ from '../vendor/lodash.min.js';

import Dispatcher from 'flux';
import StoreCreator from '../backend/StoreCreator';
import ActionTypes from '../Constants';

var AgileGatheringBoardStore = StoreCreator.create({
    get: () => {
        return {
            matches,
            currentPlayerId,
            currentPlayerName,
            selectedMatch,
            started,
            catUrls,
            disableJoinButton,
            decks,
            playerDeck,
            cards
        };
    }
});

AgileGatheringBoardStore.dispatchToken = Dispatcher.register((payload) => {
    var action = payload;

    var changed = false;

    switch(action.type) {
        case ActionTypes.CARD_MOVED:
            //Just add to collection of proper type and it will get rendered in the correct row
            break;
        case ActionTypes.CARD_MODIFIED:
            //Just add to modifier collection of card and it will get drawn next to it
            break;
    }

    if(changed) AgileGatheringBoardStore.emitChange();
});

lobbySounds.lobbyMusic.setVolume(100).play().loop();

export default AgileGatheringBoardStore;
