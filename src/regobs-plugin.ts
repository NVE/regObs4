import { registerPlugin } from '@capacitor/core';

export interface Status {
  progress: number;
  status: string;
}

export interface RegobsPlugin {
  echo(options: {
    downloadUrl: string,
   destinationPath: string}): Promise<{ value: string }>;

  downloadAndUnzip(options: {
    downloadUrl: string,
    destinationPath: string
  }): Promise<{ fileReference: number }>;

  cancel(options: { fileReference: number}): Promise<void>;

  getStatus(options: { fileReference: number}): Promise<Status>;
}

export const RegobsNative = registerPlugin<RegobsPlugin>('Regobs');
