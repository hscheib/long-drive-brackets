var React = require('react');
var NavBar = require('./navbar.jsx');
var Round = require('./round.jsx');
var FinalsRound = require('./finalsRound.jsx');
var AdminButton = require('./adminButton.jsx');
var BracketStore = require('../stores/bracket_store');
var BracketActions = require('../actions/bracket_actions.js');


var getStateFromStores = function() {
    return {
        bracket: BracketStore.getBracket(),
        players: BracketStore.getPlayers(),
        message: BracketStore.getMessage()
    }
};

var Bracket = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        BracketActions.loadBracket();
        BracketStore.addChangeListener(this._onChange);
    },

    componentWillUnMount: function() {
        BracketStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    render: function() {
      var bracket = this.state.bracket;
      var players = this.state.players;
      var message = this.state.message;

      var rows = [];
      if(bracket) {
        for(s in bracket.rounds) {
          rows.push(<Round round={bracket.rounds[s]} players={players}/>);
        }
          rows.push(<FinalsRound finals={bracket.finals} players={players}/>);
      }
        return (
            <div>
                <NavBar/>
                <h5 className="center-align">Bluff City Shootout 2015</h5>
                  <ul className="tabs">
                    <li className="tab col s3"><a id="tab1" className="active" href="#round1">Round 1</a></li>
                    <li className="tab col s3"><a href="#round2">Round 2</a></li>
                    <li className="tab col s3"><a href="#round3">Round 3</a></li>
                    <li className="tab col s3"><a href="#finals">Finals</a></li>
                  </ul>
                  <div className="section no-pad-bot" id="index-banner">
                    <div className="container">
                {rows}
              </div>
            </div>
            </div>
        );
    }
});

module.exports = Bracket;
