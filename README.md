# RegObs app v4 (Ionic 4)
This is the regObs app versoin 4. It is based on code from app v3, but rewritten to Ionic 4.
Ionic 4 uses Angular 8 and TypeScript, so all pages and components have been rewritten.

## Installation
1. Clone repo
2. Install packages
   ```
   npm install
   ```

## Debugging
Run app in browser:
```
ionic serve
```
[More info](https://ionicframework.com/docs/building/running)

To debug app on device:
```
ionic cordova run android
```
[More info](https://ionicframework.com/docs/building/android)

## Build and release
Use npm to make a release build:

```
npm run build --production --device
```

NOTE! Continous build is set up in Azure.
Creates release builds and uploads .ipa to TestFlight when code are committed to /release branch.
Upload .apk to Google Play store manually. The .apk is in build output resources.

## Plugins and other custom features

# How to update all npm packages

Install npm-check-updates globally and check packages.json:
```
npm i -g npm-check-updates
ncu -u
npm install
```

NOTE! Cordova plugins must be updated by removing and re-adding plugin:
```
ionic cordova plugin rm cordova-plugin-name
ionic cordova plugin add cordova-plugin-name
```

# How to update models from Regobs API
Models are automatically updated on build.
To test models from test API, change api endpoint in ng-swagger-gen.json
npm script generate-swagger-api-module is called from build script.
```
npm run build
```

# How to update regions and polygons

## Update Avalanche Warning Regions
Download new regions from [https://nedlasting.nve.no/gis/#].
- Select "Varslingsområder" -> "Snøskred"
- Format: GeoJson
- Coordinates: Geographic WGS84 (lat, lng)
- Area: "Landsdekkende"

Overwrite /assets/json/varslingsomraader.json