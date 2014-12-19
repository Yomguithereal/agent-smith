/**
 * Agent Smith Heuristics
 * =======================
 *
 * Basic heuristics aiming at finding default values.
 */
var helpers = require('./helpers.js');

const labelGuesses = [
  'title',
  'name',
  'text'
];

function label(data) {
  for (let i = 0, l = labelGuesses.length; i < l; i++) {
    let prop = labelGuesses[i];

    if (data.properties[prop])
      return helpers.truncate(data.properties[prop], 30);
  }
  return data.id;
}

module.exports = {
  label: label
};
