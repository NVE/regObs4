import { createExportBundle, downloadBundle } from './lokalise';

async function main() {
    const url = await createExportBundle();
    await downloadBundle(url);
}

main().then(() => console.log('Done'));
