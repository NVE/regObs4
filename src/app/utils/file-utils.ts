// Hjelpefunksjoner for filbehandling

import { Directory, Filesystem } from '@capacitor/filesystem';

createDirectoryIfNotExist = async (path: string, directory: Directory, ): Promise<boolean> => {
  try {
    // const readDirResult = await Filesystem.readdir({
    //   path: path,
    //   directory: directory,
    // });
    // const name = path.split('/').pop();
    // if (readDirResult.files.filter((fileInfo) => fileInfo.name === name).length === 0) {
    //   //fant ikke mappa, da lager vi den
      await Filesystem.mkdir({
        path: path,
        directory: directory,
        recursive: true,
      });
    }
  }
};
