// isInteger.spec.js
const matchIds = require('../data_processing/matchIds');

const testData = require('./matchIdsData.json')
const resultsData = require('./matchIdsResults.json')

describe('matchIds', () => {

    describe('should remove any outages older than 2022-01-01', () => {

        test('for an array with mixed dates, return only valid outages', () => {
            expect(matchIds(testData.mixedDataOutages, null)).toStrictEqual(resultsData.mixedDataOutages);
        });

        
        test('for an array with old dates, return no outages ', () => {
            expect(matchIds(testData.allOldOutages, null)).toStrictEqual(resultsData.allOldOutages);
        });

        test('for an array with all valid dates, return all outages ', () => {
            expect(matchIds(testData.allOldOutages, null)).toStrictEqual(resultsData.allOldOutages);
        });

        test('for an array with all dates that are 2022-01-01, return all outages ', () => {
            expect(matchIds(testData.allValidOutagesExactDate, null)).toStrictEqual(resultsData.allValidOutagesExactDate);
        });

        test('for an array with all dates that are a second before cutoff, return no outages ', () => {
            expect(matchIds(testData.allInvalidOutagesSecondBeforeCutoff, null)).toStrictEqual(resultsData.allInvalidOutagesSecondBeforeCutoff);
        });

        test('for an array with all dates that are a second after cutoff, return all outages ', () => {
            expect(matchIds(testData.allValidOutagesSecondAfterCutoff, null)).toStrictEqual(resultsData.allValidOutagesSecondAfterCutoff);
        });
        
    })

    describe('should return an array', () => {
        
        test('given a valid set of outages', () => {
            expect(Array.isArray(matchIds(testData.mixedDataOutages, null))).toBe(true);
        });
        
    })
});
