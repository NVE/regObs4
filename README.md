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
- This may be helpful for device connection problems: [More info](https://stackoverflow.com/questions/23081263/adb-android-device-unauthorized)

#### Error: package android.support.v4.content does not exist
[More info] https://github.com/ionic-team/capacitor/issues/2822

### Debugge på iPhone/iPad: XCode
```
npm run build (or ionic build)
npx cap sync ios
npx cap open ios
```
npx cap open ios vil åpne prosjektet i Xcode. Kjør appen fra XCode.

[Mer info](https://ionicframework.com/docs/developing/ios)
Ikke la Xcode signere provisioning profile automatisk, men last den ned fra developer.apple.com og bruk denne i XCode.
Du må først legge ditt utviklersertifikat inn i Provisioning profile på developer.apple.com.
Sjekk også at dingsen du skal teste på er registrert i profilen.

Det er bare debug-profil vi trenger i Xcode, fordi release bygges på byggeserver.
"Active scheme" skal være Varsom Regobs, ikke Cordova.
Hvis gamle ting henger igjen, kan du slette mappene platforms og plugins.

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

App-spesifikke tekster finnes i `./translations/app`. Disse tekstene
håndteres via *cordova-plugin-localization-strings*.

Web-tekster finnes i `./src/assets/i18n`. Omtrent all regobs-koden er web-kode
(det som ligger under `./src/`).

Alle tekstene håndteres med json-format.

## Oversettelsesverktøy

Vi bruker [Lokalise](https://lokalise.com/) til å håndtere oversettelser.

## NPM Script

Disse NPM-skriptene eksisterer som hjelp til å håndtere språkfiler:

Script | Beskrivelse
--- | ---
`npm run translations:sort` | Sorter nøklene i språkfilene som ligger lokalt fra a - å.
`npm run translations:upload` | Last opp språkfiler til Lokalise. Overskriver endringer i Lokalse.
`npm run translations:download` | Last ned språkfiler fra Lokalse. Overskriver lokale endringer.

> **Merk:** `translations:upload` overskriver eventuelle endringer som finnes kun i Lokalise. Det tas derfor en "snapshot" i Lokalse før opplastningen skjer, for at man skal ha muligheten til å reversere endringene. Det er også mulig å reversere endringer direkte på en språknøkkel i Lokalise ved å se på historikken der, om det bare er snakk om et par endrede nøkler. Det kan også skjer at Lokalise parser
språkfilene feil, og da bør man rulle tilbake og prøve manuell upload.

`translations:sort` sorterer språkfilene med samme algoritme som brukes når nye tekster
hentes fra Lokalise. Kan brukes hvis man har gjort endringer i språkfilene og
vil forsikre seg om at sorteringen er riktig.

For å bruke download / upload npm scripts må du lage fila 
`translations/lokalise-api-key.json` med innholdet:

```
{
    "apiKey": "<din-api-key>"
}
```

## Hvordan oppdatere / legge til / fjerne tekster og synkronisere med Lokalise

Når man henter ned tekster fra Lokalise kan det komme med endringer oversetterne
har gjort som ikke er relevante for PRen man jobber på. Det kan derfor være lurt
å legge til nye tekster i den engelske språkfila i PRen, og deretter ta en ny PR
etter at endringene er flettet inn i develop for å synkronisere språk.

Husk at rene endringer kan tas rett i Lokalise, også for engelsk språk,
for deretter å hente ned oppdaterte tekster via `lokalse:download`. Dette kan
være like kjapt som å gjøre endringene lokalt om det ikke er noe forskjel
mellom Lokalse og lokale språkfiler.

Dette er et forslag til en arbeidsflyt:

1. Oftest er det som en del av en større endring at man trenger å endre språk.
   I PRen som angår denne endringen kan man legge til / endre språk i 
   engelsk fil - `src/assets/i18n/en.json`.

   På dette stadiet kan man godt prøve å hente tekster fra lokalise med 
   `npm run translations:download` for å se om det finnes tekster som er 
   opptadert der. Er det ikke det står man fritt til å også endre andre 
   språkfiler lokalt og hoppe til steg 7 etter at PRen er
   merget inn.

2. Lag en ny branch for å synkronisere språk basert på develop, etter at PRen
   er merget inn. Dette er grunnlaget for en ny språk-sync-PR.

3. Sorter språkfilene som ligger lokalt i prosjektet med `npm run translations:sort`.

4. Last ned nye språkfiler fra Lokalse med `npm run translations:download`.

5. Se over språkfilene. 

   > **Merk!** Når språkfiler lastes ned fra Lokalise merges innholdet inn i de
   > eksisterende språkfilene. **Dette overskriver eventuelle endrede tekster.**
   > Du må derfor fikse eventuelle endringer som er overskrevet.

   Commit endringene.

6. Legg til eventuelle oversettelser for andre språk enn engelsk. Dette kan også
   gjøres i Lokalise etter steg 9., men da må du huske å laste ned og sjekke inn 
   endringene etterpå vha `npm run translations:download`.
   
7. Last opp oppdaterte tekster til Lokalise med `npm run translations:upload -- web <lang>`

8. Sjekk i Lokalise om oppdateringen ser riktig ut. Hvis ikke, bruk snapshot for
   å rulle tilbake.


## Rydde opp i Lokalise

For å laste opp språkfiler, og samtidig slette nøkler/tekster i Lokalise som ikke finnes
lenger, kan denne kommandoen brukes:

```
npm run translations:upload -- web <lang> --clean
```

Dette fungerer kun med `en` og `no` siden andre språk ofte er ufullstendige.
