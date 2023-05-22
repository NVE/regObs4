import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable } from 'rxjs';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import * as L from 'leaflet';
import { NumberHelper } from '../../../../core/helpers/number-helper';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit {
  searchText: string;
  searchResult$: Observable<MapSearchResponse[]>;
  searchField: UntypedFormControl;
  loading: boolean;
  hasResults: boolean;
  searchHistory$: Observable<MapSearchResponse[]>;

  @ViewChild('searchInput') searchInput;
  constructor(
    private modalController: ModalController,
    private mapSearchService: MapSearchService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.searchField = new UntypedFormControl();
    this.searchHistory$ = this.mapSearchService.getSearchHistoryAsObservable();
    const searchTextObservable = this.searchField.valueChanges.pipe(debounceTime(400), distinctUntilChanged());

    this.searchResult$ = searchTextObservable.pipe(
      tap((val) => {
        this.ngZone.run(() => {
          this.loading = true;
          this.hasResults = false;
          this.searchText = val;
        });
      }),
      switchMap((searchValue: string) => this.mapSearchService.searchAll(searchValue)),
      tap((values) => {
        this.ngZone.run(() => {
          this.hasResults = values.length > 0;
          this.loading = false;
        });
      })
    );
  }

  // set autofocus on input field
  ngAfterViewInit(): void {
    setTimeout(() => {
      (this.searchInput.el.childNodes[0] as HTMLIonInputElement).focus();
    }, 100);
  }

  doSearch() {
    const validLatLng = this.isValidLatLng(this.searchText);
    if (validLatLng) {
      this.mapSearchService.mapSearchItemSelected = validLatLng;
      this.closeModal();
    }
  }

  isValidLatLng(searchValue: string) {
    if (searchValue && searchValue.length > 0) {
      const separators = [',', ' '];
      for (const sep of separators) {
        const isValidLatLng = this.isValidLatLngArray(searchValue.split(sep));
        if (isValidLatLng) {
          return isValidLatLng;
        }
      }
    }
    return null;
  }

  isValidLatLngArray(searchValue: string[]) {
    if (searchValue && searchValue.length === 2) {
      const trimmedLatString = ModalSearchPage.trimAndReplaceString(searchValue[0]);
      const trimmedLngString = ModalSearchPage.trimAndReplaceString(searchValue[1]);
      if (
        trimmedLatString &&
        trimmedLatString.length > 0 &&
        trimmedLngString &&
        trimmedLngString.length > 0 &&
        NumberHelper.isNumeric(trimmedLatString) &&
        NumberHelper.isNumeric(trimmedLngString)
      ) {
        const lat = parseFloat(trimmedLatString);
        const lng = parseFloat(trimmedLngString);
        if (lat > -90 && lat < 90 && lng > -180 && lng < 180) {
          return L.latLng(lat, lng);
        }
      }
    }
    return null;
  }

  private static trimAndReplaceString(input: string) {
    if (input === undefined || input === null) {
      return input;
    }
    return input.trim().replace(/,/g, '.');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  searchItemClicked(item: MapSearchResponse) {
    this.mapSearchService.mapSearchItemSelected = item;
    this.closeModal();
  }
}
