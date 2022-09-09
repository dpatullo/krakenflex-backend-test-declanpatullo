const nameOutages = (outageData, siteInfo) => {
  if (!outageData) {
    return [];
  }

  return outageData.map((outage) => {
    const matchedDevice = siteInfo.devices.filter((device) => device.id === outage.id)[0];

    return ({ ...outage, name: matchedDevice.name });
  });
};

module.exports = nameOutages;
