import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, Events, Input } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable, of } from 'rxjs';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { settings } from '../../../../../settings';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit {

  searchText: string;
  searchResult$: Observable<MapSearchResponse[]>;
  searchField: FormControl;
  loading: boolean;
  hasResults: boolean;
  searchHistory$: Observable<MapSearchResponse[]>;

  constructor(private modalController: ModalController,
    private mapSearchService: MapSearchService,
    private events: Events,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchHistory$ = this.mapSearchService.getSearchHistoryAsObservable().pipe(tap((val) => {
      console.log('New search history: ', val);
    }));
    this.searchResult$ = this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((val) => {
          this.ngZone.run(() => {
            this.loading = true;
            this.hasResults = false;
            this.searchText = val;
          });
        }),
        switchMap((searchValue: string) => {
          if (searchValue.length >= 2) {
            return this.mapSearchService.searchAll(searchValue);
          } else {
            return of([]);
          }
        }),
        tap((values) => {
          this.ngZone.run(() => {
            this.hasResults = values.length > 0;
            this.loading = false;
          });
        }),
      );
  }

  focusInput(event: Event) {
    const input: Input = <any>event.target;
    setTimeout(() => {
      (<any>input).setFocus();
    }, 500);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  searchItemClicked(item: MapSearchResponse) {
    this.events.publish(settings.events.mapSearchItemClicked, item);
    this.mapSearchService.saveSearchHistoryToDb(item);
    this.closeModal();
  }
}
