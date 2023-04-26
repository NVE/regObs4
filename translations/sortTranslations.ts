/* eslint-disable no-console */

import * as fs from 'fs/promises';

import { join } from 'path';
import { TRANSLATIONS_FOLDER } from './settings';
import { JSONstringifyOrder, readTranslationFile, writeTranslationFile } from './common';

async function sortLocalTranslations() {
  const files = await fs.readdir(TRANSLATIONS_FOLDER, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && file.name.indexOf('.json') > -1) {
      const filePath = join(TRANSLATIONS_FOLDER, file.name);
      console.log('Sorting translations', filePath);
      const translations = await readTranslationFile(filePath);
      const ordered = JSONstringifyOrder(translations);
      await writeTranslationFile(filePath, ordered);
    }
  }
}

sortLocalTranslations().then(() => console.log('Done'));
