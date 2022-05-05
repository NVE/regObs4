import { registerPlugin } from '@capacitor/core';


export interface RegobsPlugin {
  echo(options: {
    downloadUrl: string,
   destinationPath: string}): Promise<{ value: string }>;
}

export const RegobsNative = registerPlugin<RegobsPlugin>('Regobs');
