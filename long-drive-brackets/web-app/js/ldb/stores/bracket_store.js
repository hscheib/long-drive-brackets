var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants');
var Store = require('./store');
var _ = require('lodash');

var _bracket = null;
var _players = null;
var _message = null;

var _is_loading = false;
var _error = null;

var setBracket = function(bracket) {
  _bracket = bracket;
};

var setPlayers = function(players) {
  _players = players;
};

var setMessage = function(message) {
    _message = message;
};

var setError = function(error) {
    // Look at this page to figure out what should happen.
    // http://visionmedia.github.io/superagent/#error-handling
    _error = error.message;
}

var BracketStore = _.assign({}, Store, {
    getBracket: function() {

        // Get bracket object.
        return _bracket;
    },
    getPlayers: function() {
        return _players;
    },
    getMessage: function() {
        return _message;
    }
});

BracketStore.dispatchToken = Dispatcher.register(function(payload) {
    var action = payload.action;
    var bracket = payload.bracket;
    var players= payload.players;
    var message = payload.message;

    var error = payload.error;

    switch(action) {
        case Constants.LOAD_BRACKET:
            _is_loading = true;
            BracketStore.emitChange();
            break;
        case Constants.LOAD_BRACKET_SUCCESS:
            _error = null;
            setBracket(bracket);
            setPlayers(players);
            setMessage(message);
            BracketStore.emitChange();
            break;
        case Constants.LOAD_BRACKET_FAILED:
            setError(error);
            BracketStore.emitChange();
            break;
    }
});

module.exports = BracketStore;
