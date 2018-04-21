# Fuel Cost Splitter

> A simple webapp to split the fuel cost with friends

Progressive Web App to split the trip fuel costs with friends by getting the distance between places automatically with Google Maps. Add the fuel price, vehicle consumption and the number of people to split the trip cost, then get how much each one should pay 

---

## Overview

* Created using [create-react-app](https://github.com/facebook/create-react-app).
* Uses [Places](https://developers.google.com/maps/documentation/javascript/places) and [Autocomplete for Addresses and Search Terms ](https://developers.google.com/maps/documentation/javascript/places-autocomplete) libraries from [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/).
* [Google Analytics](https://www.google.com/analytics/) supported.
* i18n (pt-br and en-us).
* Share the output via WhatsApp and Facebook Messenger.

## Development 
### Obtaining a Google API Key
* To obtain an API Key go to  [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/) and click in the **GET A KEY** button.

## Local environment

#### Install dependencies
```bash
npm install
```

#### Run local server
```bash
REACT_APP_API_KEY=<google_api_key> npm start
```

## Production Build
```bash
REACT_APP_API_KEY=<google_api_key> REACT_APP_ANALYTICS_ID=<code> PUBLIC_URL=<url> npm run build
```

