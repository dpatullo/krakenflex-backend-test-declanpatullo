// isInteger.spec.js
const nameOutages = require('../../data_processing/nameOutages');

const outages = require('./outages.json');
const siteInfo = require('./siteInfo.json');

const matchedOutages = require('./matchedNamesAndOutages.json');

describe('nameOutages', () => {
  describe('should add the device name to the outages in the set', () => {
    test('for an array of mixed outages should add the relevant device name to each', () => {
      expect(nameOutages(outages.mixedOutages, siteInfo)).toStrictEqual(matchedOutages.mixedOutages);
    });

    test('for an empty array of outages should return an empty array', () => {
      expect(nameOutages([], siteInfo)).toStrictEqual([]);
    });
    

  });

  describe('should return an array', () => {
    test('given a valid set of outages and siteInfo', () => {
      expect(Array.isArray(nameOutages(outages.mixedOutages, siteInfo))).toBe(true);
    });
  });
});
