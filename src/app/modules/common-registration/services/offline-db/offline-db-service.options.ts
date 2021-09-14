import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class OfflineDbServiceOptions {
    public adapter = 'idb';
}
