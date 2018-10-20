import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Events, Input } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable } from 'rxjs';
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

  constructor(private modalController: ModalController, private mapSearchService: MapSearchService, private events: Events) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchResult$ = this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((val) => {
          this.loading = true;
          this.hasResults = false;
          this.searchText = val;
        }),
        switchMap((searchValue: string) => {
          if (searchValue.length >= 2) {
            return this.mapSearchService.searchAll(searchValue);
          } else {
            return Observable.of([]);
          }
        }),
        tap((values) => {
          this.hasResults = values.length > 0;
          this.loading = false;
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
    this.closeModal();
  }
}
