const express = require('express');
const axios = require('axios');
const filterIds = require('../data_processing/filterIds');
const nameOutages = require('../data_processing/nameOutages');

const router = express.Router();

const KRAKEN_FLEX_URL = 'https://api.krakenflex.systems/interview-tests-mock-api/v1';
const SITE_NAME = 'norwich-pear-tree';

/* GET users listing. */
router.get('/', (req, res, next) => {
  const outagesConfig = {
    method: 'get',
    url: `${KRAKEN_FLEX_URL}/outages`,
    headers: { 'x-api-key': process.env.KRAKEN_FLEX_API_KEY },
  };

  const siteInfoConfig = {
    method: 'get',
    url: `${KRAKEN_FLEX_URL}/site-info/${SITE_NAME}`,
    headers: { 'x-api-key': process.env.KRAKEN_FLEX_API_KEY },
  };

  const getOutages = axios(outagesConfig);

  const getSiteInfo = axios(siteInfoConfig);

  Promise.all([getOutages, getSiteInfo])
    .then(
      (response) => {
        const filteredOutages = filterIds(response[0].data, response[1].data);
        return matchedOutagesWithNames = nameOutages(filteredOutages, response[1].data);
      },
    )
    .then((matchedOutages) => {
      const siteOutageUpdateConfig = {
        method: 'post',
        url: `${KRAKEN_FLEX_URL}/site-outages/${SITE_NAME}`,
        headers: { 'x-api-key': process.env.KRAKEN_FLEX_API_KEY },
        data: matchedOutages,
      };

      return axios(siteOutageUpdateConfig);
    })
    .then((siteUpdateResults) => {
      res.send(`Successfuly updated outage list. New list has been updated with this data ${siteUpdateResults.config.data}`);
    })
    .catch((error) => {
      if (error.response) {
        res.status(400).send(`Unable to update outages list ${JSON.stringify(error.response.data)}`);
      } else {
        res.status(400).send('Unable to update outages list');
      }
    });
});

module.exports = router;
