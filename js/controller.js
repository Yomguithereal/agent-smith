/**
 * Agent Smith Controller
 * =======================
 *
 * Main controller holding the app's state.
 */
var domino = require('domino-js'),
    services = require('./services.js'),
    _ = require('lodash');

// Restating from localstorage
var localData = localStorage.getItem('agentsmith');

if (localData)
  localData = JSON.parse(localData);
else
  localData = {};

var controller = new domino({

  // Initial state
  state: {

    // Application configuration
    config: {
      host: 'localhost',
      port: 7474
    },

    // Data
    data: {
      labels: [],
      predicates: [],
      properties: []
    },

    // Panels state
    panels: localData.panels || {
      overview: {
        selected: null
      }
    },

    // Misc
    query: localData.query || null,
    graph: null
  },

  // Facets
  facets: {
    endpoint: function() {
      var config = this.get('config');

      return 'http://' + config.host + ':' + config.port;
    }
  },

  // Etc.
  services: services,
  settings: {
    paramSolver: /:([^\/:]*)/g
  }
});

// On state update, we record to the localstorage
// TODO: use cursor merger to optimize this part
controller.state.on('update', function() {
  var toSave = _.pick(controller.get(), ['query', 'panels']);

  localStorage.setItem('agentsmith', JSON.stringify(toSave));
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
    this.select('panels', 'overview', 'selected').edit(null);
  },

  // Requesting sample data about a precise label
  'query:label': function(e) {
    this.cypher(
      'MATCH (n:`' + e.data + '`) WITH n LIMIT 100 MATCH (n)-[r]-(t) RETURN n,r,t;'
    );

    this.select('panels', 'overview', 'selected').edit({type: 'label', name: e.data});
  },

  // Requesting sample data about a precise predicate
  'query:predicate': function(e) {
    this.cypher(
      'MATCH (n)-[r:`' + e.data + '`]-(t) RETURN n,r,t LIMIT 2000;'
    );

    this.select('panels', 'overview', 'selected').edit({type: 'predicate', name: e.data});
  }
});

// Exporting
module.exports = controller;
