/**
 * Agent Smith Query Component
 * ============================
 *
 * Query textarea holding the current cypher query.
 */
var React = require('react'),
    ace = require('brace'),
    controller = require('../controller.js');

// Loading ace assets
require('../lib/mode-cypher.js');
require('brace/theme/dawn');

// TODO: cannot bind to app state so drastically
module.exports = React.createClass({
  componentDidMount: function() {
    var self = this;

    // Loading ace editor
    this.editor = ace.edit('query-editor');
    this.editor.getSession().setMode('ace/mode/cypher');
    this.editor.setTheme('ace/theme/dawn');

    // Configuration
    this.editor.setHighlightActiveLine(false)
    this.editor.renderer.setShowGutter(false);
    this.editor.renderer.setShowPrintMargin(false);

    // Update editor along with the app's state
    this.cursor = controller.select('query');
    this.listener = function() {
      self.editor.setValue(self.cursor.get());
      self.editor.clearSelection();
    };

    this.listener();

    this.cursor.on('update', this.listener);
  },
  handleKeyDown: function(e) {

    // Firing if ctrl+enter
    if (e.ctrlKey && e.which === 13)
      controller.emit('query', this.editor.getValue());
  },
  render: function() {
    return (
      <div className="grid">
        <div>
          <div id="query-editor"
               onKeyDown={this.handleKeyDown}
               placeholder="Neo4J query ...">
          </div>
        </div>
        <button ><i className="fa fa-save"></i></button>
        <button className="primary"><i className="fa fa-play"></i></button>
      </div>
    );
  },
  componentWillUnmount: function() {
    this.cursor.off('update', this.listener);
  }
});
