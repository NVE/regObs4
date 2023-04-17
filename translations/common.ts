import * as fs from 'fs/promises';
import { EOL } from 'os';
import { JSON_SPACES } from './settings';

export type Translations = { [key: string]: string | Translations };

export async function readTranslationFile(path: string): Promise<Translations> {
  const content = await fs.readFile(path);
  const translations = JSON.parse(content.toString());
  return translations;
}

export async function writeTranslationFile(path: string, translations: string) {
  const translationsWithEol = translations.endsWith(EOL) ? translations : translations + EOL;
  await fs.writeFile(path, translationsWithEol);
}

// Edited version of this SO answer: https://stackoverflow.com/a/53593328
// created by "Jor" and edited by "Michael Geary".
// License: https://creativecommons.org/licenses/by-sa/4.0/.
export function JSONstringifyOrder(obj: Translations) {
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
  return JSON.stringify(obj, allKeys, JSON_SPACES);
}
