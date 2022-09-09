// isInteger.spec.js
const filterIds = require('../../data_processing/filterIds');

const testDataDates = require('./filterIdsDateData.json');
const testDataSiteInfo = require('./filterIdsSiteData.json');
const testDateOutagesWithIDs = require('./filterIdsOutagesData.json');

const resultsDataDates = require('./filterIdsDateResults.json');
const resultsDataIds = require('./filterIdsOutageSiteIdCheckResults.json');

describe('filterIds', () => {
  describe('should remove any outages older than 2022-01-01', () => {
    test('for an array with mixed dates, return only valid outages', () => {
      expect(filterIds(testDataDates.mixedDataOutages, testDataSiteInfo)).toStrictEqual(resultsDataDates.mixedDataOutages);
    });

    test('for an array with old dates, return no outages ', () => {
      expect(filterIds(testDataDates.allOldOutages, testDataSiteInfo)).toStrictEqual(resultsDataDates.allOldOutages);
    });

    test('for an array with all valid dates, return all outages ', () => {
      expect(filterIds(testDataDates.allOldOutages, testDataSiteInfo)).toStrictEqual(resultsDataDates.allOldOutages);
    });

    test('for an array with all dates that are 2022-01-01, return all outages ', () => {
      expect(filterIds(testDataDates.allValidOutagesExactDate, testDataSiteInfo)).toStrictEqual(resultsDataDates.allValidOutagesExactDate);
    });

    test('for an array with all dates that are a second before cutoff, return no outages ', () => {
      expect(filterIds(testDataDates.allInvalidOutagesSecondBeforeCutoff, testDataSiteInfo)).toStrictEqual(resultsDataDates.allInvalidOutagesSecondBeforeCutoff);
    });

    test('for an array with all dates that are a second after cutoff, return all outages ', () => {
      expect(filterIds(testDataDates.allValidOutagesSecondAfterCutoff, testDataSiteInfo)).toStrictEqual(resultsDataDates.allValidOutagesSecondAfterCutoff);
    });
  });

  describe('should return an array', () => {
    test('given a valid set of outages', () => {
      expect(Array.isArray(filterIds(testDataDates.mixedDataOutages, testDataSiteInfo))).toBe(true);
    });
  });

  describe('should remove any outages that do not match an ID in the siteInfo set', () => {
    test('for an array with mixed Ids, return only valid outages that match an ID', () => {
      expect(filterIds(testDateOutagesWithIDs.mixedOutages, testDataSiteInfo)).toStrictEqual(resultsDataIds.mixedOutages);
    });

    test('for an array with only one Ids, return all valid outages if the ID is matched', () => {
      expect(filterIds(testDateOutagesWithIDs.allValidOutagesSameId, testDataSiteInfo)).toStrictEqual(resultsDataIds.allValidOutagesSameId);
    });

    test('for an array with mixed Ids that are valid, return all outages', () => {
      expect(filterIds(testDateOutagesWithIDs.allValidOutagesMultipleId, testDataSiteInfo)).toStrictEqual(resultsDataIds.allValidOutagesMultipleId);
    });

    test('for an array with invalid Ids, return an empty array', () => {
      expect(filterIds(testDateOutagesWithIDs.allInvalidOutages, testDataSiteInfo)).toStrictEqual(resultsDataIds.allInvalidOutages);
    });

    test('for an array with mixed Ids and siteInfo being null, return an empty array', () => {
      expect(filterIds(testDateOutagesWithIDs.mixedOutages, null)).toStrictEqual([]);
    });
  });
});
