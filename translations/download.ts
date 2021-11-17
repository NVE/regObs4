import { createExportBundle, downloadBundle } from './translations';

async function main() {
    const url = await createExportBundle();
    await downloadBundle(url);
}

main()
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
