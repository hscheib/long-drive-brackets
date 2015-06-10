var React = require('react');

var GroupRow = React.createClass({
    render: function() {
        var player = this.props.player;
        return (
            <tr>
                <td className="groupNameWidth">{player.name}</td>
                <td>{player.distance}</td>
                <td>300</td>
            </tr>
        );
    }
});

module.exports = GroupRow;