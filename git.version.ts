import { writeFileSync } from 'fs';
import { AppVersion } from './src/app/core/models/app-version.model';
const cordovaSetVersion = require('cordova-set-version');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getVersion(): Promise<AppVersion> {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();
  const buildNumber = parseInt((await exec('git rev-list --count HEAD')).stdout.toString().trim(), 10);

  return {
    version: process.env.npm_package_version,
    revision,
    buildNumber,
    branch,
    date: new Date().toISOString(),
  };
}

async function updateVersion() {
  const version = await getVersion();

  console.log(`version: '${version.version}',
    revision: '${version.revision}',
    buildNumber: ${version.buildNumber},
    branch: '${version.branch}'`);

  writeFileSync('src/environments/version.json', JSON.stringify(version), { encoding: 'utf8' });
  cordovaSetVersion('./config.xml', version.version, version.buildNumber);
}

updateVersion();
