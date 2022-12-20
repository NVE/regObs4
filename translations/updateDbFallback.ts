/* eslint-disable no-console */
/**
 * Script for downloading updated kdv and helptext fallback json files from the api.
 *
 * Usage: npm run translations:update-fallback
 */
import { LangKey } from '../src/app/modules/common-core/models';
import { settings } from '../src/settings';
import { get, RequestOptions } from 'https';
import { IncomingMessage } from 'http';
import * as path from 'path';
import { createWriteStream } from 'fs';

const opts: RequestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

function downloadJson(url: string, path: string): Promise<IncomingMessage> {
  const file = createWriteStream(path);

  return new Promise((resolve, reject) => {
    get(url, opts, (res: IncomingMessage) => {
      const { statusCode } = res;

      if (statusCode < 200 || statusCode >= 300) {
        reject(`Request failed. Url: ${url}`);
      }

      res.pipe(file);
      res.on('end', resolve);
      res.on('error', reject);
    });
  });
}

async function download(url: string, path: string) {
  await downloadJson(url, path);
  console.log(`${url} -> ${path}`);
}

const requests = [];
for (const { lang } of <{ lang: string }[]>settings.language.supportedLanguages) {
  const langKey = LangKey[lang];

  const kdvUrl = `${settings.services.regObs.apiUrl.PROD}/KdvElements?langkey=${langKey}&isActive=true&sortOrder=true`;
  const kdvPath = path.resolve(__dirname, '..', `src/assets/json/kdvelements.${lang.toLowerCase()}.json`);
  requests.push(download(kdvUrl, kdvPath));

  const helptextsUrl = `${settings.services.regObs.apiUrl.PROD}/HelpText?langKey=${langKey}`;
  const helptextsPath = path.resolve(__dirname, '..', `src/assets/json/helptexts.${lang.toLowerCase()}.json`);
  requests.push(download(helptextsUrl, helptextsPath));
}

Promise.all(requests).catch(console.error);
