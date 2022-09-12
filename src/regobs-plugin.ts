import { registerPlugin } from '@capacitor/core';

export interface Status {
  /** Between 0 and 1. 0 is not started, 1 is done. */
  progress: number;

  /** May be: SUCCESS, WORK_IN_PROGRESS, ERROR or CANCELLED */
  status: string;

  /** Ongoing (last started) task type */
  task: 'download'|'unzip';
}

export interface RegobsPlugin {

  downloadAndUnzip(options: {
    downloadUrl: string,
    destinationPath: string
  }): Promise<{ fileReference: number }>;

  cancel(options: { fileReference: number}): Promise<void>;

  getStatus(options: { fileReference: number}): Promise<Status>;
}

export const RegobsNative = registerPlugin<RegobsPlugin>('Regobs');
