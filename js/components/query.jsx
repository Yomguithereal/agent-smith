/**
 * Agent Smith Query Component
 * ============================
 *
 * Query textarea holding the current cypher query.
 */
var React = require('react'),
    controller = require('../controller.js');

// TODO: cannot bind to app state so drastically
module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['query'],
  handleChange: function(e) {

    // TODO: cannot commit asynchronously here
    this.cursor.edit(e.target.value).commit();
  },
  handleKeyPress: function(e) {
    if (e.which !== 13)
      return;

    e.preventDefault();

    controller.emit('query', e.target.value);
  },
  render: function() {
    return (
      <div className="grid">
        <div>
          <textarea rows="1"
                    spellCheck={false}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    value={this.cursor.get()}
                    placeholder="Neo4J query ..." />
        </div>
        <button ><i className="fa fa-save"></i></button>
        <button className="primary"><i className="fa fa-play"></i></button>
      </div>
    );
  }
});
