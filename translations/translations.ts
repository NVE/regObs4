import * as https from 'https';
import * as fs from 'fs/promises';
import { basename, join } from 'path';
import { LokaliseApi, UploadFileParams } from '@lokalise/node-api';
import { apiKey } from './lokalise-api-key.json';
import * as JSZip from 'JSZip';
import { EOL } from 'os';

const project_id = '419823565e6f3f0e272628.64744704';
const api = new LokaliseApi({ apiKey });

// To add indentation to translation files.
// Should be the same as what is used in src.
const jsonSpaces = '  ';

export enum FileType {
  App = 'app',
  Web = 'web'
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
      await extractAndMergeFile(file, filenames.local[fileType]);
    }
  }
}

function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

// Edited version of this SO answer: https://stackoverflow.com/a/34749873 
// created by "Salakar" and edited by "Rubens Mariuzzo".
// License: https://creativecommons.org/licenses/by-sa/3.0/.
function mergeDeep(target: any, source: any) {
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) {
        Object.assign(target, { [key]: {} });
      }
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
}

// Edited version of this SO answer: https://stackoverflow.com/a/53593328
// created by "Jor" and edited by "Michael Geary".
// License: https://creativecommons.org/licenses/by-sa/4.0/.
function JSONstringifyOrder(obj: any, space: string) {
    const allKeys = [];
    const seen = {};
    JSON.stringify(obj, (key, value) => {
        if (!(key in seen)) {
            allKeys.push(key);
            seen[key] = null;
        }
        return value;
    });
    allKeys.sort();
    return JSON.stringify(obj, allKeys, space);
}

export async function sortLocalTranslations() {
  for (const translationFolder of Object.values(filenames.local)) {
    const files = await fs.readdir(translationFolder, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && file.name.indexOf('.json') > -1) {
        const filePath = join(translationFolder, file.name);
        console.log('Sorting translations', filePath);
        const content = await fs.readFile(filePath);
        const translations = JSON.parse(content.toString());
        const ordered = JSONstringifyOrder(translations, jsonSpaces);
        await fs.writeFile(filePath, ordered + EOL);
      }
    }
  }
}

async function extractAndMergeFile(file: JSZip.JSZipObject, dir: string) {
  // Extract new translation file
  const path = join(dir, basename(file.name));
  console.log(`Unzip ${file.name} -> ${path}`);
  const newTranslations = JSON.parse(await file.async('string'));

  // Read old translations
  let translations: any;
  try {
    const oldContentBuffer = await fs.readFile(path);
    translations = JSON.parse(oldContentBuffer.toString());
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Probably "old" file does not exist
      console.warn(`Failed to read old content from ${path}, assuming file did not exist.`);
      translations = {}
    } else {
      throw error;
    }
  }

  // Merge new content with old content
  mergeDeep(translations, newTranslations);

  // Sort translations
  const sortedTranslationContent = JSONstringifyOrder(translations, jsonSpaces);

  // Write new translation file
  await fs.writeFile(path, sortedTranslationContent + EOL);
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

function flatten(o: object) {
  const result = {};

  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (let i=0, l=cur.length; i<l; i++) {
        recurse(cur[i], prop + "::" + i);
      }
    } else {
      const notOnlyNumbers = Object.keys(cur).map(i => parseInt(i, 10)).some(isNaN);
      if (notOnlyNumbers) {
        for (let p in cur) {
          recurse(cur[p], prop ? prop+"::"+p : p);
        }
      } else {
        for (let p in cur) {
          recurse(cur[p], prop ? prop+":::"+p : p);
        }
      }
    }
  }

  recurse(o, "");
  return result;
}

export async function upload(fileType: FileType, lang: Lang, params: Partial<UploadFileParams> = {}) {
  const path = join(filenames.local[fileType], `${lang}.json`);
  let data: string;
  try {
    // const s = await fs.readFile(path, { encoding: 'utf-8' });
    // const nestedJson = JSON.parse(s);
    // const flatJson = flatten(nestedJson);
    // data = Buffer.from(JSON.stringify(flatJson)).toString("base64");
    data = await fs.readFile(path, { encoding: 'base64' });
  } catch (error) {
    console.log(`Did not upload ${lang}: ${(error as Error).message}`);
    return
  }
  
  const snapshot = await api.snapshots().create({
    title: 'NPM Script Upload'
  }, { project_id });
  console.log(`Created snapshot ${snapshot.snapshot_id}`)

  console.log(`Uploading ${path}`);
  const upload = await api.files().upload(project_id, {
    data,
    filename: filenames.lokalise[fileType].replace(lokaliseLangIso, lang),
    lang_iso: lang,
    distinguish_by_file: true,
    apply_tm: false,
    // use_automations: false,
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
