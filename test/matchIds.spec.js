// isInteger.spec.js
const matchIds = require('../data_processing/matchIds');

describe('matchIds', () => {
  test('should return true with no input', () => {
    expect(matchIds()).toBe(true);
  });
});
