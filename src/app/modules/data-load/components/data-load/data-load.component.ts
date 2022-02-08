import {
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { IDataLoad } from '../../models/data-load.interface';
import { combineLatest, Subscription } from 'rxjs';
import { DataLoadService } from '../../services/data-load.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.scss']
})
export class DataLoadComponent implements OnDestroy, OnChanges {
  dataLoad: IDataLoad[] = [];
  subscription: Subscription;
  get isLoading() {
    return this.dataLoad.length > 0;
  }
  @Input()
  ids: string[];
  @Input()
  simple: boolean;
  constructor(
    private dataLoadService: DataLoadService,
    private ngZone: NgZone
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const ids = changes.ids.currentValue as string[];
    if (ids && ids.length > 0) {
      this.subscription = combineLatest(
        ids.map((id) => this.dataLoadService.getStateAsObservable(id))
      )
        .pipe(map((val) => val.filter((item) => item.isLoading)))
        .subscribe((val) => {
          this.ngZone.run(() => {
            this.dataLoad = val;
          });
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
