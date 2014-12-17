/**
 * Agent Smith Heuristics
 * =======================
 *
 * Basic heuristics aiming at finding default values.
 */

const labelGuesses = [
  'title',
  'name',
  'text'
];

function label(data) {
  for (let i = 0, l = labelGuesses.length; i < l; i++) {
    let prop = labelGuesses[i];

    if (data[prop])
      return data[prop];
  }
  return data.id;
}

module.exports = {
  label: label
};
