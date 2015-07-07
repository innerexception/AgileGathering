import _ from '../vendor/lodash.min.js';

import Dispatcher from '../backend/AgileGatheringDispatcher';
import StoreCreator from '../backend/StoreCreator';
import { Decks, Cards, FileServerIP, ActionTypes, Cards } from '../Constants';

//import buzz from '../vendor/buzz.min.js';
//
//const lobbySounds = {
//    startMatch: new buzz.sound("http://"+FileServerIP+":7777/matchMusic.mp3"),
//    joinMatch: new buzz.sound("http://"+FileServerIP+":7777/joinMatch.mp3"),
//    lobbyMusic: new buzz.sound("http://"+FileServerIP+":7777/lobbyMusic.mp3")
//};

function getMatchByOwner(ownerId){
    return _.find(matches, function(match){
        return match.ownerId === ownerId;
    });
}

function getMatchById(matchId){
    return _.find(matches, function(match){
        return match.matchId === matchId;
    });
}

//available matches
var matches = [];
var selectedMatch = null;
var started = false;
let decks = Decks;
let selectedDeck = null;
let playerDeck = null;
let cards = Cards;
var catUrls = [
    'http://www.sbs.com.au/news/sites/sbs.com.au.news/files/Grumpy%20Cat.jpg',
    'http://cdn.cutestpaw.com/wp-content/uploads/2013/12/Most-Famous-Felines-001.jpg',
    'http://i.ytimg.com/vi/4eGQ5VFt7P4/0.jpg',
    'http://i1.kym-cdn.com/entries/icons/original/000/000/888/VanillaHappyCat.jpg',
    'http://fc02.deviantart.net/fs70/f/2013/309/4/1/business_cat_by_wytrab8-d6t5znh.jpg'
];

const currentPlayerId = Math.random() + '_player';
const currentPlayerName = 'Player';

var disableJoinButton = false;

var AgileGatheringMatchStore = StoreCreator.create({
    get: () => {
        return {
            matches,
            currentPlayerId,
            currentPlayerName,
            selectedMatch,
            selectedDeck,
            started,
            catUrls,
            disableJoinButton,
            decks,
            playerDeck,
            cards
        };
    }
});

AgileGatheringMatchStore.Deck = function(deckName){
    this.cards = [];
    this.name = deckName;
    this.deckId = Math.random() + '_deck';
};

AgileGatheringMatchStore.dispatchToken = Dispatcher.register((payload) => {
    var action = payload;

    var changed = false;

    switch(action.type) {
        case ActionTypes.CREATED_MATCH:
            if(action.ownerId === currentPlayerId && !getMatchByOwner(action.ownerId)){
                matches.push({
                    matchId: action.matchId,
                    ownerId: action.ownerId,
                    matchName: action.matchName,
                    modifierCards: []
                });
                selectedMatch = getMatchByOwner(action.ownerId);
                selectedMatch.players = [];
                selectedMatch.players.push({
                    playerName: currentPlayerName,
                    matchId: action.matchId,
                    playerId: currentPlayerId,
                    playerDeck,
                    playerHand: [],
                    playerResources: [],
                    playerStories: [],
                    playerPoints: 0
                });
                //lobbySounds.joinMatch.play();
                disableJoinButton = true;
                changed = true;
            }
            break;
        case ActionTypes.JOINED_MATCH:
            var match = getMatchById(action.match.matchId);
            match.players.push({
                playerId: action.playerId,
                playerName: action.playerName,
                playerDeck,
                playerHand: [],
                playerResources: [],
                playerStories: [],
                playerPoints: 0
            });
            //lobbySounds.joinMatch.play();
            changed = true;
            break;
        case ActionTypes.DELETE_MATCH:
            //removeDeletedMatch(action.matchId);
            changed = true;
            break;
        case ActionTypes.SELECTED_MATCH:
            selectedMatch = getMatchById(action.matchId);
            selectedMatch.ownerId === currentPlayerId ? disableJoinButton = true : disableJoinButton = false;
            changed = true;
            break;
        case ActionTypes.MATCH_AVAILABLE:
            if(!getMatchByOwner(action.ownerId)){
                matches.push({
                    matchId: action.matchId,
                    ownerId: action.ownerId,
                    matchName: action.matchName,
                    players: action.players,
                    modifierCards: []
                });
                changed = true;
            }
            break;
        case ActionTypes.MATCH_READY:
            if(selectedMatch.Id === action.matchId){
                var player = _.find(players, function(player){
                    return player.Id === action.playerId
                });
                player.ready = true;
            }
            if(_.all(players, function(player){
                  return player.ready;
              })){
                Dispatcher.handleViewAction({
                    type: ActionTypes.MATCH_START,
                    matchId: action.matchId
                });
            }
            changed = true;
            break;
        case ActionTypes.MATCH_START:
            started = true;
            changed = true;
            //lobbySounds.startMatch.play();
            //lobbySounds.lobbyMusic.stop();
            break;
        case ActionTypes.DISABLE_JOIN_BUTTON:
            disableJoinButton = true;
            changed = true;
            break;
        case ActionTypes.CHOOSE_DECK:
            playerDeck = action.deck;
            changed = true;
            break;
        case ActionTypes.SELECTED_DECK:
            selectedDeck = action.deck;
            changed = true;
            break;
        case ActionTypes.DELETE_DECK:
            decks = _.filter(decks, function(deck){
                return deck.deckId !== action.deck.deckId;
            });
            changed = true;
            break;
        case ActionTypes.CREATE_DECK:
            decks.push(new AgileGatheringMatchStore.Deck('Custom Deck'));
            changed = true;
            break;
        case ActionTypes.TOGGLE_CARD:
            let found = false;
            _.each(action.deck.cards, function(cardId){
                if(cardId === action.card.cardId){
                    found = true;
                }
            });
            if(!found){
                action.deck.cards.push(action.card.cardId);
            }
            else{
                action.deck.cards = _.filter(action.deck.cards, function(cardId){
                    return cardId !== action.card.cardId;
                })
            }
            changed = true;
            break;
    }

    if(changed) AgileGatheringMatchStore.emitChange();
});

//lobbySounds.lobbyMusic.setVolume(100).play().loop();

export default AgileGatheringMatchStore;
