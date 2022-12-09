/* eslint-disable no-console */

import * as fs from 'fs/promises';
import { EOL } from 'os';
import { join } from 'path';

const TRANSLATIONS_FOLDER = './src/assets/i18n';

// To add indentation to translation files.
// Should be the same as what is used in src.
const JSON_SPACES = '  ';

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

async function sortLocalTranslations() {
  const files = await fs.readdir(TRANSLATIONS_FOLDER, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && file.name.indexOf('.json') > -1) {
      const filePath = join(TRANSLATIONS_FOLDER, file.name);
      console.log('Sorting translations', filePath);
      const content = await fs.readFile(filePath);
      const translations = JSON.parse(content.toString());
      const ordered = JSONstringifyOrder(translations, JSON_SPACES);
      await fs.writeFile(filePath, ordered + EOL);
    }
  }
}

sortLocalTranslations().then(() => console.log('Done'));
