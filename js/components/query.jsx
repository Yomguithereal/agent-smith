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
  displayName: 'Query',
  mixins: [controller.mixin],
  componentDidMount: function() {
    var self = this;

    // Creating editor
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'cypher',
      theme: 'base16-light',
      placeholder: 'Neo4j query...'
    });

    // Adding Ctrl-Enter to keys
    this.editor.setOption('extraKeys', {
      'Ctrl-Enter': this.submit
    });

    // Update editor along with the app's state
    this.cursor = this.control.select('query');
    this.listener = function() {
      self.editor.doc.setValue(self.cursor.get());
    };

    // Firing for the first time and binding listener
    this.listener();
    this.cursor.on('update', this.listener);
  },
  submit: function() {
    this.control.emit('query', this.editor.doc.getValue());
    this.editor.getInputField().blur();
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
        <button className="primary" onClick={this.submit}>
          <i className="fa fa-play" />
        </button>
      </div>
    );
  },
  componentWillUnmount: function() {
    this.cursor.off('update', this.listener);
  }
});
