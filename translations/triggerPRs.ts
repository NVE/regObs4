/* eslint-disable no-console */

import { DownloadFileParams, LokaliseApi } from '@lokalise/node-api';
import { apiKey } from './lokalise-api-key.json';

const USAGE = `
Usage:

npm run translations:pr [configKey] [configKey] ...

eg: npm run translations:pr ios
eg: npm run translations:pr ios web
`;
const project_id = '419823565e6f3f0e272628.64744704';
const api = new LokaliseApi({ apiKey });
const langsToExport = ['nn', 'sv', 'da', 'fr', 'sl', 'de', 'it'];

async function trigger(params: DownloadFileParams) {
  console.log('Trigger download using params', params);
  const result = await api.files().download(project_id, params);
  console.log('Result', result);
}

// See https://developers.lokalise.com/reference/download-files
const CONFIG: { [key: string]: DownloadFileParams } = {
  ios: {
    format: 'strings',
    original_filenames: true,
    directory_prefix: '',
    triggers: ['github'],
    filter_langs: [...langsToExport],
    filter_filenames: ['ios/App/App/%LANG_ISO%.lproj/InfoPlist.strings'],
    add_newline_eof: true,
    export_sort: 'a_z',
    export_empty_as: 'skip',
    replace_breaks: true,
  },
  web: {
    format: 'json',
    original_filenames: true,
    directory_prefix: '',
    triggers: ['github'],
    filter_langs: [...langsToExport],
    filter_filenames: ['src/assets/i18n/%LANG_ISO%.json'],
    add_newline_eof: true,
    export_sort: 'a_z',
    export_empty_as: 'skip',
    replace_breaks: false,
    indentation: '2sp',
    json_unescaped_slashes: true,
  },
};

async function main() {
  const configsToTriggerDownloadFor = process.argv.slice(2);

  if (
    configsToTriggerDownloadFor.length === 0 ||
    configsToTriggerDownloadFor.indexOf('help') > -1 ||
    configsToTriggerDownloadFor.indexOf('--help') > -1
  ) {
    console.log(USAGE);
  }

  for (const configKey of configsToTriggerDownloadFor) {
    if (CONFIG[configKey] == null) {
      throw new Error(`Invalid config key: "${configKey}"`);
    }
  }

  for (const configKey of configsToTriggerDownloadFor) {
    await trigger(CONFIG[configKey]);
  }

  console.log('Done');
}

main().catch(console.error);
