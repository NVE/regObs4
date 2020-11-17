export class CancelPromiseTimer extends Promise<void> {
  static createCancelPromiseTimer(timeoutMs: number) {
    return new Promise<void>((resolve) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        resolve();
      }, timeoutMs);
    });
  }
}
