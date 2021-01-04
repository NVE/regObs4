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

TIP! if you run into "ERROR maximum call stack size exceeded" it's most probably a circular module dependency.
If you build without aot, you might get a better error message:
```
ng build --aot=false
```

Create release branch:
Example: 
```
git flow release start v4.4.3 develop
```
Update version number in package.json
Push relase-branch

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

## Update counties and municipalities
Download new json from [https://api01.nve.no/hydrology/forecast/landslide/test/api/Region/]
Overwrite /assets/json/regions.json

## Update county boarders (fylkesgrenser)
The boarders are used to show warinings in current map view
Download "Administrative enheter fylker (gjeldende)" area from [https://kartkatalog.geonorge.no/nedlasting]
- Select "Hele landet"
- Projection "UTM sone 33"
- Format GEOJSON

The file need to be simplified and converted to wgs84:
- Download mapshaper: npm install -g mapshaper
- Edit json file and remove all features except Fylker
- Simplify: mapshaper Basisdata-fylker.json -simplify 15% -o Basisdata-fylker-simple.json
- Reproject: mapshaper Basisdata-fylker-simple.json -proj from=EPSG:25833 wgs84 -o regions-simple-polygons.json

The json file will now be around 700KB and in wgs84 projection.
Overwrite /assets/json/regions-simple-polygons.json
