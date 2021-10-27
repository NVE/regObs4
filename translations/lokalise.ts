import * as https from 'https';
import * as fs from 'fs/promises';
import { basename, join } from 'path';
import { LokaliseApi, UploadFileParams } from '@lokalise/node-api';
import { apiKey } from './lokalise-api-key.json';
import * as JSZip from 'JSZip';

const project_id = '419823565e6f3f0e272628.64744704';
const api = new LokaliseApi({ apiKey });

export enum FileType {
  App = "app",
  Web = "web"
}

const lokaliseLangIso = '%LANG_ISO%';
const filenames = {
  lokalise: {
    // These filenames follows the folder structure in Varsom-Regobs-Translations,
    // where the translation files used to live.
    [FileType.App]: `app/native-dialogs/${lokaliseLangIso}.json`,
    [FileType.Web]: `app/i18n/${lokaliseLangIso}.json`
  },
  regex: {
    [FileType.App]: /app\/native-dialogs/,
    [FileType.Web]: /app\/i18n/
  },
  local: {
    [FileType.App]: './translations/app',
    [FileType.Web]: './src/assets/i18n'
  }
};

export async function createExportBundle(): Promise<string> {
  // See https://app.lokalise.com/api2docs/curl/#transition-download-files-post
  const response = await api.files().download(project_id, {
    format: 'json',
    directory_prefix: '',
    original_filenames: true,
    filter_filenames: Object.values(filenames.lokalise),
    // filter_data: ['translated'],
    export_empty_as: 'skip',
    add_newline_eof: true,
    export_sort: 'a_z',
    indentation: '2sp',
    replace_breaks: false,
    json_unescaped_slashes: true
    // disable_references
  });

  console.log(`Bundle url: ${response.bundle_url}`);
  return response.bundle_url;
}

export function downloadBundle(url: string) {
  const data = [];

  return new Promise<void>((resolve, reject) => {
    console.log('Downloading bundle');
    https.get(url, (res) => {
      console.log('Status code:', res.statusCode);
      console.log('Headers:', res.headers);
  
      res.on('data', (chunk) => {
        data.push(chunk);
      });
  
      res.on('end', async () => {
        const buffer = Buffer.concat(data);
        const zip = await JSZip.loadAsync(buffer) as JSZip;
        await extract(zip);
        resolve();
      });
  
    }).on('error', (e) => {
      reject(e);
    });
  });
}

async function extract(zip: JSZip) {
  for (const fileType of ['app', 'web']) {
    console.log(`Extracting ${fileType} files`);

    for (const file of zip.file(<RegExp>filenames.regex[fileType])) {
      await extractFile(file, filenames.local[fileType]);
    }
  }
}

async function extractFile(file: JSZip.JSZipObject, dir: string) {
  const path = join(dir, basename(file.name));
  console.log(`Unzip ${file.name} -> ${path}`);
  const content = await file.async('string');
  await fs.writeFile(path, content);
}

export enum Lang {
  English = 'en',
  Finnish = 'fi',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  NorwegianBokmal = 'nb',
  NorwegianNynorsk = 'nn',
  Slovenian = 'sl',
  Swedish = 'sv'
}

export async function upload(fileType: FileType, lang: Lang, params: Partial<UploadFileParams> = {}) {
  const path = join(filenames.local[fileType], `${lang}.json`);
  let data: string;
  try {
    data = await fs.readFile(path, { encoding: 'base64' });
  } catch (error) {
    console.log(`Did not upload ${lang}: ${(error as Error).message}`);
    return
  }
  console.log(`Uploading ${path}`);
  const upload = await api.files().upload(project_id, {
    data,
    filename: filenames.lokalise[fileType],
    lang_iso: lang,
    tags: ['app'],
    tag_inserted_keys: true,
    tag_updated_keys: true,
    cleanup_mode: false,
    slashn_to_linebreak: true,
    replace_modified: true,
    ...params
  });

  console.log('File import queued');
  console.log(`Process id: ${upload.process_id}`);
  console.log(`Type: ${upload.type}`);
  console.log(`Status: ${upload.status}`);
  console.log(`Message: ${upload.message}`);
  console.log(`Created by: ${upload.created_by} - ${upload.created_by_email}`);
  console.log(`Created at: ${upload.created_at}`);
}
