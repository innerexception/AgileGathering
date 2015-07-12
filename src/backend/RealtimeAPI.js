var ENDPOINT = "ws://localhost:1337";

import ServerActionCreators from '../actions/ServerActionCreators';

export default {

  launch: function() {
    return new Promise((resolve, reject) => {
      this.websocket = new ReconnectingWebSocket(ENDPOINT);
      console.log('realtime: connecting');
      this.websocket.onopen = function() {
        console.log("realtime: connected");
        resolve(this);
      };
      this.websocket.onerror = function(e) {
        console.log('realtime: error', arguments);
        reject(this);
      };
      this.websocket.onmessage = (e) => {
        if(e){
          var data = JSON.parse(e.data);
          this.decodeMessage(data);
        }
      }
    });
  },

  disconnect: function(){
    clearInterval(this.matchReadyPingInterval);
    this.websocket.disconnect();
  },

  matchPing: function(match){
    this.publishMessage(this.getMessageToPublish({
      action: 'matchPing',
      match
    }));
  },

  startMatchReadyPing: function(match){
    var that = this;
    this.matchReadyPingInterval = setInterval(function(){that.matchPing(match)}, 2000);
  },

  stopMatchReadyPing: function(){
    clearInterval(this.matchReadyPingInterval);
  },

  sendJoinMessage: function(match, player){
    this.publishMessage(this.getMessageToPublish({
        action: 'joinMatch',
        match,
        player
    }));
  },

  createMatch: function(match){
    this.publishMessage(this.getMessageToPublish({
        action: 'matchCreate',
        match
    }));
  },

  startMatch: function(match){
    this.publishMessage(this.getMessageToPublish({
        action: 'matchStart',
        match: match
    }));
    this.stopMatchReadyPing();
  },

  endTurn: function(playerId){
    this.publishMessage(this.getMessageToPublish({
      action: 'endTurn',
      playerId
    }));
  },

  timerUpdate: function(matchId){
    this.publishMessage(this.getMessageToPublish({
      action: 'timerUpdate',
      matchId: matchId
    }));
  },

  cardMoved(cardId, targetArea, playerId){
    this.publishMessage(this.getMessageToPublish({
      action: 'cardMove',
      cardId,
      targetArea,
      playerId
    }));
  },

  playerWon(player){
    this.publishMessage(this.getMessageToPublish({
      action: 'playerWon',
      player
    }));
  },

  cardModified(targetCard, droppedCard, playerId){
    this.publishMessage(this.getMessageToPublish({
      action: 'cardModified',
      targetCard,
      droppedCard,
      playerId
    }));
  },

  drawCards(player, number){
    this.publishMessage(this.getMessageToPublish({
      action: 'drawCards',
      player,
      number
    }));
  },

  publishMessage: function(msg) {
    var message = this.getMessageToPublish(msg);
    if(message) {
        this.websocket.send(msg);
    }
  },

  decodeMessage: function(data) {
    if (!data ) {
      return null;
    }

    var payload = JSON.parse(data.data.utf8Data).data;

    switch(payload.action){
        case 'matchCreate':
            ServerActionCreators.createdMatch(payload.match);
            this.startMatchReadyPing(payload.match);
            break;
        case 'joinMatch':
            ServerActionCreators.joinedMatch(payload.match, payload.player);
            break;
        case 'matchReady':
            ServerActionCreators.matchReady();
            break;
        case 'matchStart':
            ServerActionCreators.startMatch(payload.match);
            break;
        case 'matchPing':
            ServerActionCreators.matchAvailable(payload.match);
            break;
        case 'timerUpdate':
            ServerActionCreators.timerUpdate(payload.matchId);
            break;
        case 'cardMove':
            ServerActionCreators.cardMoved(payload.cardId, payload.targetArea, payload.playerId);
            break;
        case 'cardModified':
            ServerActionCreators.cardModified(payload.targetCard, payload.droppedCard, payload.playerId);
            break;
        case 'drawCards':
            ServerActionCreators.drawCards(payload.player, payload.number);
            break;
        case 'endTurn':
            ServerActionCreators.endTurn(payload.playerId);
            break;
        case 'playerWon':
            ServerActionCreators.playerWon(payload.player);
            break;
    }
  },

  getMessageToPublish: function(msg){
    return JSON.stringify({
      data: msg
    });
  }
};


const ReconnectingWebSocket = function (url, protocols) {
  protocols = protocols || [];

  // These can be altered by calling code.
  this.debug = false;
  this.reconnectInterval = 2000;
  this.timeoutInterval = 5000;

  var self = this;
  var ws;
  var forcedClose = false;
  var timedOut = false;

  this.url = url;
  this.protocols = protocols;
  this.readyState = WebSocket.CONNECTING;
  this.URL = url; // Public API

  this.onopen = function (event) {
  };

  this.onclose = function (event) {
  };

  this.onconnecting = function (event) {
  };

  this.onmessage = function (event) {
  };

  this.onerror = function (event) {
  };

  function connect(reconnectAttempt) {
    ws = new WebSocket(url, protocols);

    self.onconnecting();

    var localWs = ws;
    var timeout = setTimeout(function () {
      timedOut = true;
      localWs.close();
      timedOut = false;
    }, self.timeoutInterval);

    ws.onopen = function (event) {
      clearTimeout(timeout);
      self.readyState = WebSocket.OPEN;
      reconnectAttempt = false;
      self.onopen(event);
    };

    ws.onclose = function (event) {
      clearTimeout(timeout);
      ws = null;
      if (forcedClose) {
        self.readyState = WebSocket.CLOSED;
        self.onclose(event);
      } else {
        self.readyState = WebSocket.CONNECTING;
        self.onconnecting();
        if (!reconnectAttempt && !timedOut) {
          self.onclose(event);
        }
        setTimeout(function () {
          connect(true);
        }, self.reconnectInterval);
      }
    };

    ws.onmessage = function (event) {
      self.onmessage(event);
    };

    ws.onerror = function (event) {
      self.onerror(event);
    };
  }

  connect(url);

  this.send = function (data) {
    if (ws) {
      return ws.send(data);
    } else {
      throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
    }
  };

  this.close = function () {
    forcedClose = true;
    if (ws) {
      ws.close();
    }
  };

  /**
   * Additional public API method to refresh the connection if still open (close, re-open).
   * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
   */
  this.refresh = function () {
    if (ws) {
      ws.close();
    }
  };
}