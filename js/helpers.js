/**
 * Agent Smith Helpers
 * ====================
 *
 * Miscellenous helpers functions.
 */

// Simple text-truncating function
function truncate(s, nb) {
  return s.slice(0, nb);
}

module.exports = {
  truncate: truncate
};
