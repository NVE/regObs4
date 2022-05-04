import { registerPlugin } from '@capacitor/core';

export interface RegobsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

export const RegobsNative = registerPlugin<RegobsPlugin>('Regobs');
