# RegObs app v4 (Ionic 5)

This is the regObs app versoin 4. It is based on code from app v3, but rewritten to Ionic 4/5.
Ionic 5 uses Angular 9+ and TypeScript, so all pages and components have been rewritten.

## Installation

1. Clone repo
2. Install packages
   ```
   npm install 
   ```
*Hvis du har npm versjon 7 eller nyere, må du bruke:* 
```
npm install --legacy-peer-deps
```
## Debug and test on device

Run app in browser:

```
ionic serve
```

[More info](https://ionicframework.com/docs/building/running)

### To debug app on Android device

```
ionic cordova run android
```

[More info](https://ionicframework.com/docs/building/android)
A few tips on development environment setup on Windows:

- Android SDK and Gradle cache may give you authorization trouble if installed in your user profile folder.
- JDK is included with Android Studio, but you need to set JDK_HOME to the JDK folder location.
- An example of environment variables you need:

```
ANDROID_SDK_ROOT=C:\android\sdk
JDK_HOME=C:\Program Files\Android\Android Studio\jre
GRADLE_USER_HOME=C:\gradle\cache
```

- An example of search path that may work:

```
C:\android\sdk\tools\bin
C:\android\sdk\platform-tools
C:\android\sdk\emulator
C:\Program Files\Android\Android Studio\jre\bin
C:\gradle\gradle-6.7.1\bin
```

- You have to uninstall the regular RegObs app from your phone in order to debug
- This may be helpful for device connection problmems: [More info](https://stackoverflow.com/questions/23081263/adb-android-device-unauthorized)

### Debugge på iPhone/iPad: XCode
[Mer info](https://ionicframework.com/docs/developing/ios)
Ikke la Xcode signere provisioning profile automatisk, men last den ned fra developer.apple.com og bruk denne i XCode.
Du må først legge ditt utviklersertifikat inn i Provisioning profile på developer.apple.com.
Sjekk også at dingsen du skal teste på er registrert i profilen.

Det er bare debug-profil vi trenger i Xcode, fordi release bygges på byggeserver.
"Active scheme" skal være Varsom Regobs, ikke Cordova.
Hvis gamle ting henger igjen, kan du slette mappene platforms og plugins.

##### Mac med M1-CPU

M1 er såpass ny at bygging ikke er helt strømlinjeformet ennå.

Fikk trøbbel med npm install: Installering av sharp feila. Fiksa det med å installere vips manuelt:
```brew install vips```
[Mer info](https://github.com/lovell/sharp/issues 2460#issuecomment-751491241)

Med webserver-plugin fikk jeg også problemer med pods: 
Dette fungerte:
```
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```
[Mer info](https://github.com/CocoaPods/CocoaPods/issues/10220)

Deretter fikk jeg denne feilmeldinga: 'GCDWebServer.h' file not found.
Hjalp å åpne workspace-fila i stedet for prosjektfila i Xcode.
[Mer info](https://github.com/bykof/cordova-plugin-webserver/issues/49)

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
App blir automatisk publisert til intern testing når man pusher til ny release-branch.

## Beta-testing
Vi har et åpent beta-test-program hvor eksterne testere kan melde seg inn ved å følge en link.

### Starte beta-testing i Google Play
- For å rulle videre fra intern testing til beta, logg på https://play.google.com/console/
- Siste versjon av appen finner du under "Tester/Intern testing"
- Registrere release notes. Dette kan vi automatisere på sikt.
- Velg "Kopier utganven til et annet spor"
- Velg spor "Åpen testing" 
- Gå gjennom evt. advarsler (da vi publiserte 4.4.6 var det 3 advarsler som vi ignorerte)
- Fullfør publisering

### Starte beta-testing på Apple App Store
- For å rulle videre fra intern testing til beta, logg på https://appstoreconnect.apple.com/
- Velg Varsom Regobs under My Apps
- Velg TestFlight
- Under "Test information", legg inn release notes på begge språk
- Velg External Groups / Beta Testers
- Trykk på + under Builds, velg riktig versjon/build og Next
- Velg Submit for Review

## Produksjonssetting

Appene må produksjonssettes manuelt i i App Store og i Google Play

### Produksjonssette på Apple App Store

- Gå til https://appstoreconnect.apple.com/
- Bruk + øverst til venstre for "Opprett ny utgave". Det kan ta et par dager før du får godkjent den nye versjonen.
- Når versjonen er godkjent, kan du sende den til produksjon

### Produksjonssette på Google Play

- For å rulle videre fra beta til produksjon, logg på https://play.google.com/console/
- Siste versjon av appen finner du under "Tester/Åpen testing"
- Velg "Kopier utgaven til et annet spor"
- Pass på at 100% av brukerne får tilgang. Mulig du må endre andelen fra 20 til 100% etterpå.

### Flette inn release-greina

Etter produksjonssetting, må release-greina flettes inn:
```
git flow release finish 'release/vX.Y.Z'
git push origin --tags
git push develop
git push master
```

## Plugins and other custom features

# How to run lint and format on save using vscode

Guide taken from: https://dev.to/dreiv/using-eslint-and-prettier-with-vscode-in-an-angular-project-42ib

Install the following Visual Studio Code extensions:

```
- dbaeumer.vscode-eslint
- esbenp.prettier-vscode
```

Vs code settings is checked in to source control:
.vscode/settings.json

To run lint manually and autofix, run:

```
npm run lint:fix
```

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

To update Angular, use ng update to better migrate code changes:
Follow this guide: https://update.angular.io/
```
ng update
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
