/* eslint-disable no-console */

import { TRANSLATIONS_FOLDER } from './settings';
import { JSONstringifyOrder, Translations, readTranslationFile, writeTranslationFile } from './common';

const nnPath = `${TRANSLATIONS_FOLDER}/nn.json`;
const nbPath = `${TRANSLATIONS_FOLDER}/nb.json`;

function addFallbackValues(origin: Translations, fallback: Translations, parent = '') {
  const fallbackEntries = Object.entries(fallback);

  const result = { ...origin };
  for (const [key, fallbackValue] of fallbackEntries) {
    const fullKey = `${parent}.${key}`;

    if (result[key] == null) {
      console.log(`Missing "${fullKey}"`);
      result[key] = fallbackValue;
      continue;
    }

    const originValue = result[key];
    const originType = typeof originValue;
    const fallbackType = typeof fallbackValue;
    if (originType !== fallbackType) {
      console.log(`New type "${fullKey}"`);
      result[key] = fallbackValue;
      continue;
    }

    if (originType === 'object') {
      result[key] = addFallbackValues(originValue as Translations, fallbackValue as unknown as Translations, key);
      continue;
    } else if (originType === 'string') {
      // string in origin and string in fallback => translation exists for both
      continue;
    }

    throw new Error(`Unsupported type of key ${fullKey}: ${originType}`);
  }

  return result;
}

async function main() {
  console.warn(
    'WARNING: This script should only be called in production pipelines. Do not commit the changed files.\n'
  );
  const nn = await readTranslationFile(nnPath);
  const nb = await readTranslationFile(nbPath);
  const nnWithFallback = addFallbackValues(nn, nb);
  const ordered = JSONstringifyOrder(nnWithFallback);
  await writeTranslationFile(nnPath, ordered);
  console.warn(
    '\nWARNING: This script should only be called in production pipelines. Do not commit the changed files.'
  );
}

main().catch((err) => console.error(err));
