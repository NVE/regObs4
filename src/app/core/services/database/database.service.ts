import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * Common interface to our key-value database.
 * Use it to save data on the device
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: Storage = null;
  private ready = new ReplaySubject<void>();

  /**
   * Listen to this to get notified when the database is ready to use
   */
  public readonly ready$: Observable<void>;

  constructor(private storage: Storage) {
    this.init();
    this.ready$ = this.ready.asObservable();
    this.ready.next(); //notify clients that we are ready
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.database = storage;
  }

  /**
   * Set the value for the given key.
   * @param key the key to identify this value
   * @param value the value for this key
   * @returns Returns a promise that resolves when the key and value are set
   */
  public set(key: string, value: any): Promise<void> {
    if (this.database === null) {
      throw Error('Database not ready');
    }
    return this.database.set(key, value);
  }

  /**
   * Get the value associated with the given key.
   * @param key the key to identify this value
   * @returns Returns a promise with the value of the given key
   */
  public get(key: string): Promise<any> {
    if (this.database === null) {
      throw Error('Database not ready');
    }
    return this.database.get(key);
  }

  /**
   * Remove any value associated with this key.
   * @param key the key to identify this value
   * @returns Returns a promise that resolves when the value is removed
   */
  public remove(key: string): Promise<void> {
    return this.database.remove(key);
  }

  /**
    * Clear the entire key value store. WARNING: HOT!
    * @returns Returns a promise that resolves when the store is cleared
    */
  public clear(): Promise<void> {
    return this.database.clear();

  }
  /**
    * @returns Returns a promise that resolves with the number of keys stored.
    */
  length(): Promise<number> {
    return this.database.length();
  }

  /**
  * @returns Returns a promise that resolves with the keys in the store.
  */
  keys(): Promise<string[]> {
    return this.database.keys();
  }

  /**
  * Iterate through each key,value pair.
  * @param iteratorCallback a callback of the form (value, key, iterationNumber)
  * @returns Returns a promise that resolves when the iteration has finished.
  */
  //TODO: forEach(iteratorCallback: (value: any, key: string, iterationNumber: number) => any): Promise<void>;
}