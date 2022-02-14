import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom, Observable, ReplaySubject } from 'rxjs';

/**
 * Common interface to our key-value database.
 * Use it to save data on the device
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements KeyValueStore {
  private database: Storage = null;
  private ready = new ReplaySubject<void>();

  /**
   * Listen to this to get notified when the database is ready to use
   */
  public readonly ready$: Observable<void>;

  constructor(private storage: Storage) {
    this.init();
    this.ready$ = this.ready.asObservable();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.database = storage;
    this.ready.next(); //notify clients that we are ready
  }

  /**
   * Set the value for the given key.
   * @param key the key to identify this value
   * @param value the value for this key
   * @returns Returns a promise that resolves when the key and value are set
   */
  public async set(key: string, value: any): Promise<void> {
    await firstValueFrom(this.ready$);
    return this.database.set(key, value);
  }

  /**
   * Get the value associated with the given key.
   * @param key the key to identify this value
   * @returns Returns a promise with the value of the given key
   */
  public async get(key: string): Promise<any> {
    await firstValueFrom(this.ready$);
    return this.database.get(key);
  }

  /**
   * Remove any value associated with this key.
   * @param key the key to identify this value
   * @returns Returns a promise that resolves when the value is removed
   */
  public async remove(key: string): Promise<void> {
    await firstValueFrom(this.ready$);
    return this.database.remove(key);
  }

  /**
    * Clear the entire key value store. WARNING: HOT!
    * @returns Returns a promise that resolves when the store is cleared
    */
  public async clear(): Promise<void> {
    await firstValueFrom(this.ready$);
    return this.database.clear();
  }
  /**
    * @returns Returns a promise that resolves with the number of keys stored.
    */
  async length(): Promise<number> {
    await firstValueFrom(this.ready$);
    return this.database.length();
  }

  /**
  * @returns Returns a promise that resolves with the keys in the store.
  */
  async keys(): Promise<string[]> {
    await firstValueFrom(this.ready$);
    return this.database.keys();
  }

  /**
  * Iterate through each key,value pair.
  * @param iteratorCallback a callback of the form (value, key, iterationNumber)
  * @returns Returns a promise that resolves when the iteration has finished.
  */
  //TODO: forEach(iteratorCallback: (value: any, key: string, iterationNumber: number) => any): Promise<void>;
}