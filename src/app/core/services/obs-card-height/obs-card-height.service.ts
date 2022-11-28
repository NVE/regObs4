import { Injectable } from '@angular/core';
import { LRUCache } from 'lru-fast';

@Injectable({
  providedIn: 'root'
})
export class ObsCardHeightService {
  private sizeCache: LRUCache<number, number>;

  constructor() {
    this.sizeCache = new LRUCache<number, number>(5000);
  }

  getHeight(regId: number) {
    const height = this.sizeCache.get(regId);
    if (height) {
      return height;
    } else {
      const buffer = 100;
      return this.getAverageHeight() + buffer;
    }
  }

  setHeight(regId: number, height: number) {
    const oldHeight = this.sizeCache.get(regId);
    if (!oldHeight || height > oldHeight) {
      this.sizeCache.set(regId, height);
    }
  }

  getAverageHeight() {
    if (this.sizeCache.size > 0) {
      let sum = 0;
      this.sizeCache.forEach((val) => {
        sum += val;
      });
      return sum / this.sizeCache.size;
    } else {
      return 250;
    }
  }
}
