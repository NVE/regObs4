import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { MapSearchService } from '../../core/services/map-search/map-search.service';
import { Observable } from 'rxjs';
import { MapSearchResponse } from '../../core/services/map-search/map-search-response.model';
import { settings } from '../../../settings';
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
        tap(() => {
          this.loading = true;
          this.hasResults = false;
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

  closeModal() {
    this.modalController.dismiss();
  }

  // async search() {
  //   if (this.searchText.length >= 2) {
  //     this.searchResult$ = await this.mapSearchService.searchAll(this.searchText);
  //   }
  // }

  searchItemClicked(item: MapSearchResponse) {
    this.events.publish(settings.events.mapSearchItemClicked, item);
    this.closeModal();
  }
}
