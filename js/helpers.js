/**
 * Agent Smith Helpers
 * ====================
 *
 * Miscellenous helpers functions.
 */

// Simple text-truncating function
function truncate(s, nb) {
  if (s.length < nb)
    return s;
  return s.slice(0, nb) + '...';
}

// Pretty print a number
function nbpp(nb) {
  return nb ? (+nb).toLocaleString().replace(',', ' ') : undefined;
}

module.exports = {
  nbpp: nbpp,
  truncate: truncate
};
