import { writeFileSync, readFileSync } from 'fs';
import { AppVersion } from './src/app/core/models/app-version.model';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const AndroidManifest = require('manifest-android');

async function getVersion(): Promise<AppVersion> {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();
  const date = new Date();
  const y = date.getFullYear().toString().substr(2);
  const mm = (date.getMonth()+1).toLocaleString('no', { minimumIntegerDigits: 2 });
  const dd = date.getDate().toLocaleString('no', { minimumIntegerDigits: 2 });
  const time = Math.floor((date.getHours() * 60 + date.getMinutes()) / 2).toLocaleString('no', { minimumIntegerDigits: 3 });
  const buildNumber = parseInt(y + mm + dd + time, 10);

  return {
    version: process.env.npm_package_version,
    revision,
    buildNumber,
    branch,
    date: date.toISOString(),
  };
}

function updateAndroidManifest(appVersion: AppVersion) {
  const path = './android/app/src/main/AndroidManifest.xml';
  const androidManifest = new AndroidManifest();
  androidManifest.load({ file: path }, (err) => {
    if(err) {
      console.error(err);
      return;
    }
    androidManifest.version = `${appVersion.version}.${appVersion.buildNumber}`;
    androidManifest.save({ file: path }, (err) => {
      if(err) {
        console.error(err);
      }
    })
  });
}

async function updateVersion() {
  const version = await getVersion();

  console.log(`version: '${version.version}',
    revision: '${version.revision}',
    buildNumber: ${version.buildNumber},
    branch: '${version.branch}'`);

  writeFileSync('src/environments/version.json', JSON.stringify(version), { encoding: 'utf8' });
  updateAndroidManifest(version);
}

updateVersion();
