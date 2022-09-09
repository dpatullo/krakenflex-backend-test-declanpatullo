const express = require('express');
const axios = require('axios');
const filterIds = require('../data_processing/filterIds')

const router = express.Router();

const KRAKEN_FLEX_URL = "https://api.krakenflex.systems/interview-tests-mock-api/v1"
const SITE_NAME = "norwich-pear-tree"

/* GET users listing. */
router.get('/', (req, res, next) => {

  const outagesConfig = {
    method: 'get',
    url: `${KRAKEN_FLEX_URL}/outages`,
    headers: { 'x-api-key' : process.env.KRAKEN_FLEX_API_KEY}
  }

  const siteInfoConfig = {
    method: 'get',
    url: `${KRAKEN_FLEX_URL}/site-info/${SITE_NAME}`,
    headers: { 'x-api-key' : process.env.KRAKEN_FLEX_API_KEY}
  }

  const getOutages = axios(outagesConfig)

  const getSiteInfo = axios(siteInfoConfig)

  Promise.all([getOutages,getSiteInfo])
  .then(
    response => {
      filterIds(response[0].data, response[1].data)
    }
  )
  .catch()

  //res.send('respond with a resource');
});

module.exports = router;
