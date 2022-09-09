// isInteger.spec.js
const filterIds = require('../data_processing/filterIds');

const testDataDates = require('./filterIdsDateData.json')
const resultsDataDates = require('./filterIdsDateResults.json')

describe('filterIds', () => {

    describe('should remove any outages older than 2022-01-01', () => {

        test('for an array with mixed dates, return only valid outages', () => {
            expect(filterIds(testDataDates.mixedDataOutages, null)).toStrictEqual(resultsDataDates.mixedDataOutages);
        });

        
        test('for an array with old dates, return no outages ', () => {
            expect(filterIds(testDataDates.allOldOutages, null)).toStrictEqual(resultsDataDates.allOldOutages);
        });

        test('for an array with all valid dates, return all outages ', () => {
            expect(filterIds(testDataDates.allOldOutages, null)).toStrictEqual(resultsDataDates.allOldOutages);
        });

        test('for an array with all dates that are 2022-01-01, return all outages ', () => {
            expect(filterIds(testDataDates.allValidOutagesExactDate, null)).toStrictEqual(resultsDataDates.allValidOutagesExactDate);
        });

        test('for an array with all dates that are a second before cutoff, return no outages ', () => {
            expect(filterIds(testDataDates.allInvalidOutagesSecondBeforeCutoff, null)).toStrictEqual(resultsDataDates.allInvalidOutagesSecondBeforeCutoff);
        });

        test('for an array with all dates that are a second after cutoff, return all outages ', () => {
            expect(filterIds(testDataDates.allValidOutagesSecondAfterCutoff, null)).toStrictEqual(resultsDataDates.allValidOutagesSecondAfterCutoff);
        });
        
    })

    describe('should return an array', () => {
        
        test('given a valid set of outages', () => {
            expect(Array.isArray(filterIds(testDataDates.mixedDataOutages, null))).toBe(true);
        });
        
    })
});
