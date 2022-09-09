const moment = require ('moment')

const matchIds = (outageData, siteInfo) => {

    const cutOffDate = moment('2022-01-01T00:00:00.000Z', moment.ISO_8601).format('X')

    return outageData.filter(outage => moment(outage.begin, moment.ISO_8601).format('X') >= cutOffDate)};

module.exports = matchIds;
