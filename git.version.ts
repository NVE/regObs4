import { writeFileSync, readFileSync } from 'fs';
import { AppVersion } from './src/app/core/models/app-version.model';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const prettifyXml = require('prettify-xml');
import * as cordovaSetVersion from 'cordova-set-version';

async function getVersion(): Promise<AppVersion> {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();
  const buildNumber = parseInt((await exec('git rev-list --count HEAD')).stdout.toString().trim(), 10);
  const date = new Date();

  // NOTE: Since we build the app two times, one for iOS and one for Android, the build number will differ and might confuse
  // developers. Also, I think build number never can be less than another build, so be sure that this is the format we want.
  // And what happends after 9 years? The year will start at 0 again and be less than previos builds.
  //
  // const y = date.getFullYear().toString()[3];
  // const mm = date.getMonth().toLocaleString('no', { minimumIntegerDigits: 2 });
  // const dd = date.getDate().toLocaleString('no', { minimumIntegerDigits: 2 });
  // const time = Math.floor((date.getHours() * 60 + date.getMinutes()) / 2).toLocaleString('no', { minimumIntegerDigits: 3 });
  // const buildNumber = parseInt(y + mm + dd + time, 10);

  return {
    version: process.env.npm_package_version,
    revision,
    buildNumber,
    branch,
    date: date.toISOString(),
  };
}

function prettify(filePath: string) {
  const options = { indent: 2, newline: '\n' };
  const result = prettifyXml(readFileSync(filePath, { encoding: 'utf8' }), options);
  writeFileSync(filePath, result, { encoding: 'utf8' });
}

async function updateVersion() {
  const version = await getVersion();

  console.log(`version: '${version.version}',
    revision: '${version.revision}',
    buildNumber: ${version.buildNumber},
    branch: '${version.branch}'`);

  writeFileSync('src/environments/version.json', JSON.stringify(version), { encoding: 'utf8' });
  const configPath = './config.xml';
  try {
    await cordovaSetVersion({ configPath: configPath, version: version.version, buildNumber: version.buildNumber });
  } catch (err) {
    console.error('Could not update config.xml version number', err);
  }
  prettify(configPath);
}

updateVersion();
