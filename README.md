# Varsom RegObs app v4

This is the Varsom RegObs app version 4. It is based on code from version 3 but rewritten to Ionic 6.

## Installation

1. Installer node v14 [Installer node v14.x.x](https://nodejs.org/download/release/latest-v14.x/) (.msi-fil for
   Windows) **
   Ikke nyere eller
   eldre versjon**
2. Sjekk at `npm --version` viser v6.x.x. **Ikke nyere eller eldre versjon**
3. [Installer git](https://git-scm.com/download/win)
4. Clone repo (`git clone https://github.com/NVE/regObs4.git`)
5. Install packages (`npm install`)

## Debug and test on device

Run app in browser:

```
npm run start
```

[More info](https://ionicframework.com/docs/building/running)

### To debug app on Android device

```
npm run build (or ionic build)
npx cap sync android
npx cap run android
```

[More info](https://ionicframework.com/docs/building/android)
We use Capacitor (and not Cordova) to build the native app.
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
- This may be helpful for device connection
  problems: [More info](https://stackoverflow.com/questions/23081263/adb-android-device-unauthorized)

#### Error: package android.support.v4.content does not exist

[More info] https://github.com/ionic-team/capacitor/issues/2822

### Debugge på iPhone/iPad: XCode

```
npm run build (or ionic build)
npx cap sync ios
npx cap open ios
```

npx cap open ios vil åpne prosjektet i Xcode. Kjør appen fra XCode.

[Mer info om ionic utvikling for ios.](https://ionicframework.com/docs/developing/ios)

## Build and release

### 1. Use npm to make a release build:

```bash
npm run build --production --device
```

TIP! if you run into "ERROR maximum call stack size exceeded" it's most probably a circular module dependency.
If you build without aot, you might get a better error message:

```bash
ng build --aot=false
```

### 2. Create release branch

1. For a release to trigger, the branch has to follow the naming convention `release/vx.x.x`. For
   example `release/v4.0.0`.
   Switch 4.0.0 with the version number you want to release.

```bash
git switch develop
git pull
git switch -c release/v4.0.0
```

2. Commit changed files and push relase-branch.

```bash
git add .
git commit -m "Release v4.0.0"
git push release/v4.0.0
```

The build will be published to internal testers in Testflight and Google Play automatically.

You need to add release notes / what to test manually in Appstore connect and Google Play console after the build is
published.

### 3. Update version number

After the release is published, you need to update the version number in `package.json` and `package-lock.json` to the
next version, and merge the release branch to develop.

```bash
git switch develop
git pull
git merge release/v4.0.0
git switch -c task/update-version-to-4.0.1
npm run create-version-file
git add .
git commit -m "Update version to 4.0.1"
git push
```

## Renew certificates and provisioning profiles

You need certificates to build and publish apps. The Apple certificates last only a year. More info:

[Official doc](https://learn.microsoft.com/en-us/azure/devops/pipelines/apps/mobile/app-signing?view=azure-devops&tabs=apple-install-during-build)

[Detail info about creating Apple certificates](https://medium.com/mobile-devops-ci-cd-ct/steps-to-create-ios-developer-and-distribution-certificates-with-and-without-a-mac-8449b973ef9d)

[Tips on how to create a .p12 file](https://github.com/phonegap/phonegap-docs/blob/master/docs/4-phonegap-build/3-signing/2-ios.html.md)

When you renew an Apple distribution certificate; you need to create a new provisioning profile containing the
distribution certificate. You also need to make these changes in build/project files:

| File                        | Setting                        |
| --------------------------- | ------------------------------ |
| azure-pipelines-release.yml | certSecureFile                 |
| azure-pipelines-release.yml | provisioningProfileName        |
| azure-pipelines-release.yml | provProfileSecureFile          |
| project.pbxproj             | PROVISIONING_PROFILE_SPECIFIER |

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
- Velg Varsom under My Apps
- Velg TestFlight
- Under "Test information", legg inn release notes på begge språk
- Velg External Groups / Beta Testers
- Trykk på + under Builds, velg riktig versjon/build og Next
- Velg Submit for Review

## Produksjonssetting

Appene må produksjonssettes manuelt i i App Store og i Google Play

### Produksjonssette på Apple App Store

- Gå til https://appstoreconnect.apple.com/
- Bruk + øverst til venstre for "Opprett ny utgave". Pass på at du faktisk sender den til gjennomgang, det skal stå "
  waiting for review" i statusfeltet. Det kan ta et par dager før du får godkjent den nye versjonen.
- Oppdater versjonsnotater - engelsk og norsk
- Velg riktig bygg
- Når versjonen er godkjent, kan du sende den til produksjon

### Produksjonssette på Google Play

- For å rulle videre fra beta til produksjon, logg på https://play.google.com/console/
- Siste versjon av appen finner du under "Tester/Åpen testing"
- Velg "Kopier utgaven til et annet spor"
- Oppdater versjonsnotater hvis nødvendig - engelsk og norsk
- Pass på at 100% av brukerne får tilgang. Mulig du må endre andelen fra 20 til 100% etterpå.

### Flette inn release-greina

Etter produksjonssetting, må release-greina flettes inn:

```
git flow release finish 'vX.Y.Z'
git push origin --tags
git push develop
git push master
```

# Linting and formatting

We use eslint for linting and formatting. Rules are specified in .eslintrc.js.

To run lint manually and autofix, run:

```
npm run lint:fix
```

# Hvordan oppdatere alle npm-pakker

## 1. Sjekk hvilke pakker som trenger oppdatering

Installer npm-check-updates globalt og sjekk packages.json:

```
npm i -g npm-check-updates
ncu
```

## 2. Sjekk release notes for pakker med store endringer og oppdater disse først

## 3. Oppgrader plugins

NB! Cordova plugins må oppdateres ved å først slette dem og legge dem til på nytt:

```
ionic cordova plugin rm cordova-plugin-name
ionic cordova plugin add cordova-plugin-name
```

## 4. Oppgrader Angular, hvis det trengs

Bruk ng update for enklere migrering, se https://update.angular.io/

```
ng update
```

## 5. Oppgrader resten av pakkene

```
ncu -u
```

# How to update models from Regobs API

Check the api endpoint named "swagger" in ng-swagger-gen.json is the endpoint you like to base the models on.

```
npm run generate-swagger-api-module
```

Revert changes in regobs-api.module.ts

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

# Translations

> NB! Vi oversetter / oppdaterer norsk bokmål og engelsk direkte i dette prosjektet, mens alle andre språk hentes fra Lokalise og tas inn via Pull Requester

For hver commit til develop-branchen skal Lokalise automatisk hente endringer fra github. Hvis ikke dette fungerer kan en "pull" til
Lokalise fra Github trigges manuelt fra Lokalise.

For å bruke script som går mot Lokalise trengs en api-key som kan opprettes under din bruker i Lokalise. Legg den i `translations\lokalise-api-key.json` med innhold 

```
{"apiKey": "..."}
```

For å lage en PR med endringer fra lokalise bruk

```
npm run translations:pr <translationKey>
```

der `translationKey` er enten `ios` eller `web`.

## Native-oversettelser for iOS

> NB! For å legge til et nytt språk, bruk dialog i xCode under App / Localizations.

Oversettelsene ligger under ios / App / App.

## Oversettelser for web-koden

Oversettelsene ligger under src / assets / i18n.

## Oppdatere fallback data for databasen

I `src/assets/json` ligger det fallback-data for nedtrekksmenyer og hjelpetekster. Disse kan oppdateres med
`npm run translations:update-fallback`. Skriptet laster ned nye filer fra apiet.
