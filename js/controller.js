/**
 * Agent Smith Controller
 * =======================
 *
 * Main controller holding the app's state.
 */
var domino = require('domino-js'),
    services = require('./services.js');

var controller = new domino({

  // Initial state
  state: {

    // Application configuration
    config: {
      host: 'localhost'
    },

    // Data
    data: {
      labels: []
    },

    // Misc
    query: null,
    graph: null
  },

  // Facets
  facets: {
    endpoint: function() {
      var config = this.get('config');

      return 'http://' + config.host + ':7474';
    }
  },

  // Etc.
  services: services,
  settings: {
    paramSolver: /:([^\/:]*)/g
  }
});

// Shortcuts
controller.cypher = function(query) {

  // Triggering request
  controller.request('cypher', {
    data: {
      statements: [
        {
          statement: query,
          resultDataContents: ['graph', 'row']
        }
      ]
    }
  });

  // Updating query
  controller.set('query', query);
};

// Events
controller.on({

  // Basic query
  'query': function(e) {
    this.cypher(e.data);
  },

  // Requesting sample data about a precise label
  'query:label': function(e) {
    this.cypher(
      'MATCH (n:`' + e.data + '`) WITH n LIMIT 100 MATCH (n)-[r]-(t) RETURN n,r,t;'
    );
  }
});

// Exporting
module.exports = controller;
