const moment = require('moment');

const filterIds = (outageData, siteInfo) => {
  if (!siteInfo) {
    return [];
  }

  const cutOffDate = moment('2022-01-01T00:00:00.000Z', moment.ISO_8601).format('X');

  const validIds = siteInfo.devices.map((device) => device.id);

  return outageData.filter((outage) => moment(outage.begin, moment.ISO_8601).format('X') >= cutOffDate
                && validIds.includes(outage.id));
};

module.exports = filterIds;
