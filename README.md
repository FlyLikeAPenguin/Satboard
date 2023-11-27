![Node CI](https://github.com/FlyLikeAPenguin/Satboard/workflows/Node%20CI/badge.svg)

Satellite orbit visualization and pass prediction.

![Screenshot](https://user-images.githubusercontent.com/1117666/47623704-f0c3e900-db14-11e8-9cf9-7bf13acb267c.png)

## Features
- Calculate position and orbit of satellites from TLE
- Set groundstation through geolocation or pick on map
- Calculate passes for a set groundstation
- Local browser notifications for passes
- Serverless architecture
- Works offline as Progressive Web App (PWA)

## Built With
- [CesiumJS](https://cesiumjs.org)
- [Satellite.js](https://github.com/shashwatak/satellite-js)
- [Vue.js](https://vuejs.org)
- [Workbox](https://developers.google.com/web/tools/workbox)

## Forked From
- [SatVis](https://github.com/Flowm/satvis)

## Development

### Setup
Initialize submodules and install npm build dependencies:
```
git submodule update --init
npm install
```

### Run
- `npm run start` for the dev server
- `npm run build` to build the application (output in `dist` folder)
- `npm run serve` to build the application and serve with static webserver
- `npm run update-tle` to retrieve the latest satellite TLEs from NORAD


<p align="center"><a href="https://apps.apple.com/app/satvis/id1441084766"><img src="src/assets/app-store-badge.svg" width="250" /></a></p>

## License
This project is licensed under the MIT License - see `LICENSE` file for details.
