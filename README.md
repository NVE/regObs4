# Varsom RegObs app v4

This is the Varsom RegObs app version 4. It is based on code from version 3 but rewritten to Ionic 6.

## Installation

1. Installer node v20.19.x (.msi-fil for
   Windows) **
   Ikke nyere eller
   eldre versjon**
2. Sjekk at `npm --version` viser v10 **Ikke nyere eller eldre versjon**
3. [Installer git](https://git-scm.com/download/win)
4. Clone repo (`git clone https://github.com/NVE/regObs4.git`)
5. Install packages (`npm install`)
6. Lag versjonsfil (`npm run create-version-file`)

## Debug and test on device

Run app in browser:

```
npm run start
```

[More info](https://ionicframework.com/docs/building/running)

### Installere og debugge appen på en Android-enhet

```
npm run build
npx cap sync --inline android
npx cap run android (eller start appen fra Android Studio)
```

[Mer info](https://capacitorjs.com/docs/android#running-your-app)

Vi bruker Capacitor for å bygge den "native" appen.
Her er noen tips for oppsett av utviklingsmiljø på Windows:

Android SDK og Gradle-cache kan gi tilgangsproblemer hvis de er installert under brukerprofilen din. Installer heller disse under `c:\nve\prosjektmappe`.
JDK og Gradle er inkludert med Android Studio, men du må sette JDK_HOME til plasseringen av JDK-mappen.
Et eksempel på nødvendige miljøvariabler:

```
ANDROID_SDK_ROOT=C:\NVE\Prosjektmappe\bin\android-sdk
JAVA_HOME=C:\NVE\Prosjektmappe\bin\android-studio\jbr
JDK_HOME=C:\NVE\Prosjektmappe\bin\android-studio\jbr
GRADLE_USER_HOME=C:\NVE\Prosjektmappe\bin\gradle-user-home
```

Android Studio tar ikke hensyn til GRADLE_USER_HOME, så sett dette manuelt i Android Studio under `File > Settings > Build, Execution, Deployment > Build Tools > Gradle`, hvis du bruker Android Studio.

- Et eksempel på søkesti som kan funke:

```
%JAVA_HOME%\bin
%ANDROID_SDK_ROOT%\tools\bin
%ANDROID_SDK_ROOT%\platform-tools
%ANDROID_SDK_ROOT%\emulator
```

Du må avinstallere den vanlige RegObs-appen fra telefonen din for å kunne feilsøke.
Se her hvis du har sliter med å få kontakt med telefonen fra Android Studio eller under `npx cap run android`: [mer info](https://stackoverflow.com/questions/23081263/adb-android-device-unauthorized)

Bruk `chrome://inspect/#devices` i Chrome på pc for å debugge appen etter at du har startet den på telefonen.

#### Får ikke debugget i Chrome Webtools pga. manglende sourcemaps?

Prøv å legge til `--inline` i `npx cap sync --inline android`. [Mer info] https://capacitorjs.com/docs/cli/commands/sync

#### Error: package android.support.v4.content does not exist

[More info] https://github.com/ionic-team/capacitor/issues/2822

### Debugge / kjøre på iPhone/iPad: XCode

#### Ved første gangs oppstart eller ved oppdateringer av native kode:

Hvis du bruker mac med M\*-prosessor (arm64), kjør dette manuelt inne i ios/App-mappa hvis det har vært endringer på
plugins eller oppdatering av Capacitor:

```
arch -x86_64 pod install
```

> På ett eller annet tidspunkt trenger vi sikkert ikke spesifisere arkitektur, prøv gjerne uten å spesifisere først

Hvis du får feil under `pod install` eller `npx cap sync ios`, prøv å oppdatere cocoapods:

```
brew install cocoapods
```

Og eventuelt lag symlink av ny cocoapods hvis det ikke skjer automatisk, eller du ikke har gjort det før:

```
brew link --overwrite cocoapods
```

#### Ved vanlig kjøring / debugging

```
npm run build   # eller ionic build, eventuelt npm run build:prod for å teste prod-bygg
npx cap sync ios
npx cap open ios  # For å åpne prosjektet i xcode
```

Kjør appen fra XCode.

> Ved vanlig bygg og kjøring via xcode slettes ikke brukerinstillinger, kartpakker og lignende fra telefonen. Husk det når du tester. Det kan være lurt å teste med gamle innstillinger osv først, og prøve en helt fersk installasjon etterpå (ved å slette appen før installasjon).

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

## Fornye sertifikater og provisioning profiles

Du trenger sertifikater for å bygge og publisere apper.

### Fornye sertifikater og provisioning profiles for Apple / App Store

Apple-sertifikatene varer bare ett år av gangen.

[Offisiell dok](https://learn.microsoft.com/en-us/azure/devops/pipelines/apps/mobile/app-signing?view=azure-devops&tabs=apple-install-during-build)

[Mer info om å lage Apple-sertifikater](https://medium.com/mobile-devops-ci-cd-ct/steps-to-create-ios-developer-and-distribution-certificates-with-and-without-a-mac-8449b973ef9d)

[Tips om å lage .p12 file](https://github.com/phonegap/phonegap-docs/blob/master/docs/4-phonegap-build/3-signing/2-ios.html.md)

Det er enklere å gjøre dette med en Mac, men det er også mulig å gjøre i Windows vha. openssl. Mer om dette under.

#### Generere sertifikater og provisioning profiles for Apple / App Store på en Windows-maskin

Vi har prøvd to måter å gjøre dette på:

- Om du har WSL, kan du bruke f.eks. Ubuntu-konsollet.
- Hvis ikke, bruk openssl som følger med Git for Windows.
  Det funket bra å kjøre openssl-kommandoene i bash-konsollet, som følger med Git. Bash ligger gjerne i mappa bin der du har installert Git. F.eks. `C:\Program Files\Git\bin`.
  Gå til en en mappe du vil ha sertifikatene i og start bash fra kommandolinja: `C:\Program Files\Git\bin\bash`. Kjør resten av openssl-kommandoene i bash-konsollet.

Slik gjør du det:

1. Generer privat nøkkel: `openssl genrsa -out apple-distribution-2024-11-27.key 2048`
1. Generer sertifikatforespørsel: `openssl req -new -key apple-distribution-2024-11-27.key -out apple-distribution-2024-11-27.csr`
1. Logg deg inn på https://developer.apple.com/account, gå til sertifikater og last opp sertifikatforespørsel. Last deretter ned sertifikatet. Jeg gjorde om navnet på sertifikatet til `apple-distribution-2024-11-27.cer` etter at jeg lastet det ned.
1. Mens du er inne på utvikler-sidene til Apple, lag også en distribusjonsprofil basert på sertifikatet og last den ned.
1. Lag en pem-fil av sertifikatet: `openssl x509 -in apple-distribution-2024-11-27.cer -inform DER -out apple-distribution-2024-11-27.pem -outform PEM`
1. Konverter pem-fil til p12.fil: `openssl pkcs12 -legacy -export -inkey apple-distribution-2024-11-27.key -in apple-distribution-2024-11-27.pem -out apple-distribution-2024-11-27.p12`
   (legg inn et passord når du blir spurt)

#### Last opp sertifikater til Azure Devops

1. Last opp p12-fila og distribusjonsprofilen til Azure Devops, under Library / Secure Files.
1. Lag en variabel som inneholder passordet til p12-fila under Library / Variable Groups

Navnet på de to filene endrer du på disse stedene i azure-pipelines-release.yml:

| Fil                         | Variabel                |
| --------------------------- | ----------------------- |
| azure-pipelines-release.yml | certSecureFile          |
| azure-pipelines-release.yml | provisioningProfileName |
| azure-pipelines-release.yml | provProfileSecureFile   |

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

# How to update models and services from Regobs API

Check the api endpoint named "swagger" in ng-swagger-gen.json is the endpoint you like to base the models on. If you want to update based on changes on localhost you
should change "swagger" property in ng-swagger-gen.json file

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

# Sikkerhet

Vi bruker anbefalt oppsett av headerne som står i [nve-wiki.nve.no](https://nve-wiki.nve.no/spaces/UTV/pages/257295077/Frontend+sikkerhet), men med noen justeringer for regobs.no.
Siden appen kjører i forskjellige miljøer, må vi ha disse headerne i tre forskjellige konfigurasjonsfiler:

- `web.config` for IIS-serveren
- `staticwebapp.config.json` for Azure Static Website som kjører PR-bygg
- `index.html` for native applikasjoner

**Ikke endre `Content-Security-Policy` og `Permissions-Policy` manuelt i disse filene.**
Endre heller `headers-update-scripts/contentSecurityPolicy.config.ts` og `headers-update-scripts/permissionsPolicy.config.ts`, og kjør deretter `npm run update-headers`. Dette scriptet oppdaterer alle tre filene.

Scriptet er ikke inkludert i det automatiske byggeprosessen fordi headerne ikke oppdateres ofte.
