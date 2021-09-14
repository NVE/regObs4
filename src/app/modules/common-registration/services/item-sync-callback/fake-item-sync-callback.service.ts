import { ItemSyncCallbackService } from './item-sync-callback.service';
import { Injectable } from '@angular/core';
import { timer, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemSyncCompleteStatus } from '../../models/item-sync-complete-status.interface';
import { IRegistration } from '../../models/registration.interface';
@Injectable()
export class FakeItemSyncCallbackService implements ItemSyncCallbackService<IRegistration> {
  deleteItem(item: IRegistration): Observable<boolean> {
    if(!item) {
      return of(false);
    }
    return this.createRandomDelay().pipe(map(() => true));
  }
  syncItem(item: IRegistration): Observable<ItemSyncCompleteStatus<IRegistration>> {
    return this.createRandomDelay().pipe(map(() => ({ item, success: true })));
  }

  private createRandomDelay() {
    return timer(Math.floor(Math.random() * 10) * 1000);
  }
}
