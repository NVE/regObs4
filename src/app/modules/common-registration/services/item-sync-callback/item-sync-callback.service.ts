import { ItemSyncCompleteStatus } from '../../models/item-sync-complete-status.interface';
import { Observable } from 'rxjs';

export abstract class ItemSyncCallbackService<T> {
  abstract syncItem(item: T, ignoreVersionCheck: boolean): Observable<ItemSyncCompleteStatus<T>>;
  abstract deleteItem(item: T): Observable<boolean>;
}
