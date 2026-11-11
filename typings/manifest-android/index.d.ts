declare module 'manifest-android' {
  class AndroidManifest {
    get version(): { major: number; minor: number; patch: number; build: number };
    set version(value: string);

    load(
      options: { file?: string; content?: string },
      callback: (error: Error | null, manifest?: AndroidManifest) => void
    ): void;
    save(options: { file: string }, callback: (error: Error | null, manifest?: AndroidManifest) => void): void;
  }

  export = AndroidManifest;
}
