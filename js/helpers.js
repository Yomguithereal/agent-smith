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

module.exports = {
  truncate: truncate
};
