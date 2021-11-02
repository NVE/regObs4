import { upload, FileType, Lang } from './translations';

async function main() {
    console.log(process.argv);
    const fileType = process.argv[2]
    const lang = process.argv[3];
    const clean = process.argv[4] === "--clean"

    const correctLang = Object.values(Lang).includes(lang as Lang);
    const correctFileType = Object.values(FileType).includes(fileType as FileType);

    if (correctLang && correctFileType) {
        let cleanup_mode = clean;
        if (lang !== Lang.English && lang !== Lang.NorwegianBokmal) {
            // Do not allow cleanup mode for other languages
            console.error(`Cleanup mode not allowed for ${lang}`);
            return
        }

        console.log(`Will upload lang "${lang}", cleanup_mode=${cleanup_mode}`);
        await upload(fileType as FileType, lang as Lang, {
            cleanup_mode
        });
    } else {
        console.error('Invalid lang or fileType provided');
    }
}

main().then(() => console.log('Done'));
