import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { IDataLoad } from '../../models/data-load.interface';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { DataLoadService } from '../../services/data-load.service';
import { map, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.scss']
})
export class DataLoadComponent implements OnInit, OnDestroy {
  dataLoad: IDataLoad[];
  subscription: Subscription;
  get hasData() {
    return this.dataLoad && this.dataLoad.length > 0;
  }
  firstRun: boolean;

  @Input() ids: string[];
  @Input() simple: boolean;
  constructor(private dataLoadService: DataLoadService, private zone: NgZone) {
    this.firstRun = true;
  }

  ngOnInit() {
    if (this.ids && this.ids.length > 0) {
      this.subscription = combineLatest(this.ids.map((id) => this.dataLoadService.getStateAsObservable(id)))
        .pipe(map((val) => val.filter((item) => item.isLoading))).subscribe((val) => {
          this.zone.run(() => {
            if (this.dataLoad) {
              this.firstRun = false;
            }
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
