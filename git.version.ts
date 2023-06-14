/* eslint-disable no-console */

import { writeFileSync, readFileSync } from 'fs';
import { AppVersion } from './src/app/core/models/app-version.model';
import * as AndroidManifest from 'manifest-android';
import * as plist from 'plist';
import { execSync } from 'child_process';

const IOS_PLIST_PATH = 'ios/App/App/Info.plist';

async function getVersion(): Promise<AppVersion> {
  const revision = execSync('git rev-parse --short HEAD').toString().trim();
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  const date = new Date();
  const y = date.getFullYear().toString().substring(2);
  const mm = (date.getMonth() + 1).toLocaleString('no', { minimumIntegerDigits: 2 });
  const dd = date.getDate().toLocaleString('no', { minimumIntegerDigits: 2 });
  const time = Math.floor((date.getHours() * 60 + date.getMinutes()) / 2).toLocaleString('no', {
    minimumIntegerDigits: 3,
  });
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
    if (err) {
      console.error(err);
      return;
    }
    androidManifest.version = `${appVersion.version}.${appVersion.buildNumber}`;
    androidManifest.save({ file: path }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

function updateIosVersion(version: AppVersion) {
  const plistJson = plist.parse(readFileSync(IOS_PLIST_PATH, 'utf8')) as plist.PlistObject;

  // plist data can be string | number | boolean | Date | Buffer | PlistObject | PlistArray;
  if (
    typeof plistJson === 'string' ||
    plistJson instanceof String ||
    typeof plistJson === 'number' ||
    typeof plistJson === 'boolean' ||
    plistJson instanceof Date ||
    Buffer.isBuffer(plistJson) ||
    Array.isArray(plistJson)
  ) {
    throw new Error('plist data has invalid type');
  }

  const newPlist = { ...plistJson };
  newPlist.CFBundleVersion = version.buildNumber.toString();
  newPlist.CFBundleShortVersionString = version.version.toString();
  writeFileSync(IOS_PLIST_PATH, plist.build(newPlist));
}

async function updateVersion() {
  const version = await getVersion();

  console.log(`version: '${version.version}',
    revision: '${version.revision}',
    buildNumber: ${version.buildNumber},
    branch: '${version.branch}'`);

  writeFileSync('src/environments/version.json', JSON.stringify(version), { encoding: 'utf8' });
  updateAndroidManifest(version);
  updateIosVersion(version);
}

updateVersion();
