/**
 * Agent Smith Query Component
 * ============================
 *
 * Query textarea holding the current cypher query.
 */
var React = require('react'),
    CodeMirror = require('codemirror'),
    placeholderAddon = require('../lib/codemirror-placeholder.js'),
    controller = require('../controller.js');

// Loading CodeMirror assets
require('codemirror/mode/cypher/cypher');
placeholderAddon(CodeMirror);

module.exports = React.createClass({
  componentDidMount: function() {
    var self = this;

    // Creating editor
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      value: 'var test = "test";',
      mode: 'cypher',
      theme: 'base16-light',
      placeholder: 'Neo4j query...'
    });

    // Update editor along with the app's state
    this.cursor = controller.select('query');
    this.listener = function() {
      self.editor.doc.setValue(self.cursor.get());
    };

    // Firing for the first time and binding listener
    this.listener();
    this.cursor.on('update', this.listener);
  },
  render: function() {
    return (
      <div className="grid">
        <div>
          <textarea ref="editor" />
        </div>
        <button >
          <i className="fa fa-save" />
        </button>
        <button className="primary">
          <i className="fa fa-play" />
        </button>
      </div>
    );
  },
  componentWillUnmount: function() {
    this.cursor.off('update', this.listener);
  }
});
