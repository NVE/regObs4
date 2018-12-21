import { writeFileSync } from 'fs';
import { AppVersion } from './src/app/core/models/app-version.model';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function createVersionsFile(filename: string) {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();

  const version: AppVersion = {
    version: process.env.npm_package_version,
    revision,
    branch,
    date: new Date().toISOString(),
  };

  console.log(`version: '${version.version}', revision: '${version.revision}', branch: '${version.branch}'`);

  writeFileSync(filename, JSON.stringify(version), { encoding: 'utf8' });
}

createVersionsFile('src/environments/version.json');
