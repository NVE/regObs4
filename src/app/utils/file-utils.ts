// Hjelpefunksjoner for filbehandling på telefon, bruker Capacitor Filesystem-plugin

import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoggingService } from '../modules/shared/services/logging/logging.service';
import { LogLevel } from '../modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'FileUtils';

/**
 * Gjør om angitt filsti til en URI som kan brukes i nettleser
 * @param path sti til fila, relativ til angitt rot-mappe
 * @param directory hvilken rot-mappe fila ligger i
 * @param logger send inn logger hvis du vil logge evt. feil
 * @returns URI som kan brukes i nettleser eller '' hvis det oppstod feil
 */
export const getUri = async (
  path: string,
  directory: Directory = Directory.Data,
  logger?: LoggingService
): Promise<string> => {
  try {
    const uriResult = await Filesystem.getUri({
      path: path,
      directory,
    });
    const uri = uriResult.uri;
    if (uri.endsWith('/')) {
      return uri.slice(0, -1);
    }
    return uri;
  } catch (err) {
    logger?.log(`Error getting URI for path ${path}`, err, LogLevel.Debug, DEBUG_TAG);
  }
  return '';
};

/**
 * Sjekker om angitt fil eller mappe finnes
 * @param path - full sti til fil eller mappe
 * @param logger send inn logger hvis du vil logge evt. feil
 * @returns true hvis angitt fil eller mappe finnes.
 */
export const doesFileOrDirectoryExist = async (path: string, logger?: LoggingService): Promise<boolean> => {
  const name = path.split('/').pop();
  const directory = path.split('/').slice(0, -1).join('/');
  try {
    const readDirResult = await Filesystem.readdir({
      path: directory,
    });
    if (readDirResult.files.filter((fileInfo) => fileInfo.name === name).length > 0) {
      return true;
    }
  } catch (err) {
    logger?.log(`Error checking if file or directory exists: ${path}`, err, LogLevel.Debug, DEBUG_TAG);
  }
  return false;
};

/**
 * Slett angitt fil
 * @param path - full sti til fil som skal slettes
 * @param logger send inn logger hvis du vil logge evt. feil
 */
export const deleteFile = async (path: string, logger?: LoggingService): Promise<void> => {
  if (await doesFileOrDirectoryExist(path, logger)) {
    try {
      await Filesystem.deleteFile({ path });
      logger?.debug(`Deleted file ${path}`, DEBUG_TAG);
    } catch (err) {
      logger?.log(`Error deleting file ${path}`, err, LogLevel.Debug, DEBUG_TAG);
    }
  } else {
    logger?.debug(`File ${path} does not exist, so cannot be deleted`, DEBUG_TAG);
  }
};
