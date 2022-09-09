# Kraken Flex Backend Test

An short example program using Node.JS, Express.JS, Jest and eslint that is designed to interact with data from https://api.krakenflex.systems/interview-tests-mock-api/v1:

1. Retrieves all outages from the `GET /outages` endpoint ""
2. Retrieves information from the `GET /site-info/{siteId}` endpoint for the site with the ID `norwich-pear-tree`
3. Filters out any outages that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of
   devices in the site information
4. For the remaining outages, it should attach the display name of the device in the site information to each appropriate outage
5. Sends this list of outages to `POST /site-outages/{siteId}` for the site with the ID `norwich-pear-tree`

## Dependencies

* [npm version 5+](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)
* [node version 6+](https://nodejs.org/en/download/)


### 1. Run the App

#### Windows (Using Node < v16)

```
:$ npm install
:$ npm run start
```

Service should now be running on

* [http://localhost:3000/](http://localhost:3000/)

### 2. Run the unit tests

```
:$ npm test
```

### 3. Run linter (eslint using the AirBnB ruleset)
```
:$ npm lint
```

Script added to automatically fix violaitons if possible.
```
:$ npm lint:fix 
```

### 4. Sending request to update the outage list (with service running)

* [http://localhost:3000/outages](http://localhost:3000/outages)

This request will retrieve the list of available outages from the API, remove any outages before the cut off date, match outage/devices IDs, and attached the relevant name to the outages. The page should display JSON of that data that has been updated.


In the event that the system fails to updates the list or the data cannot be pulled form the API then the error message from the API should be displayed.

### 5. Package Vulnerabilities

Current install shows "Packages have 5 vulnerabilities" 
Recommend running an npm audit to try to clear any critical issues

```
:$ npm audit fix
```

### 6. Data

Data is being retrieved from https://api.krakenflex.systems/interview-tests-mock-api/v1.
Swagger documentation can be found in /Docs


### 7. Known Issues

-

### 8. Acknowledgements And Additional Packages Used

Initial app setup done via "express-generator"
Linting rules used are "eslint-config-airbnb-base"
