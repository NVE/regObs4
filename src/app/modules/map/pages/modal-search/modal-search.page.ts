import { Component, inject, viewChild, computed, Signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonToolbar,
  ModalController,
  ViewDidEnter,
} from '@ionic/angular/standalone';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import L from 'leaflet';
import { NumberHelper } from '../../../../core/helpers/number-helper';
import { NgIf, NgFor } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { StartsWithHighlightPipe } from '../../pipes/starts-with-highlight.pipe';
import { addIcons } from 'ionicons';
import { search, close, time } from 'ionicons/icons';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonText,
    IonToolbar,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    StartsWithHighlightPipe,
    TranslatePipe,
  ],
})
export class ModalSearchPage implements ViewDidEnter {
  private modalController = inject(ModalController);
  private mapSearchService = inject(MapSearchService);

  searchField = new UntypedFormControl();
  searchHistory = toSignal(this.mapSearchService.getSearchHistoryAsObservable(), { initialValue: [] });
  private searchText$ = this.searchField.valueChanges.pipe(debounceTime(400), distinctUntilChanged());
  searchText: Signal<string> = toSignal(this.searchText$, { initialValue: '' });
  private mapSearch = rxResource({
    request: () => this.searchText(),
    loader: ({ request: searchText }) => this.mapSearchService.searchAll(searchText),
  });

  searchResults = computed(() => this.mapSearch.value() || []);
  showHistory = computed(
    () => this.searchResults().length == 0 && !this.mapSearch.isLoading() && this.searchHistory().length > 0
  );
  readonly searchInput = viewChild.required(IonInput);

  constructor() {
    addIcons({ search, close, time });
  }

  ionViewDidEnter(): void {
    this.searchInput().setFocus();
  }

  doSearch() {
    const validLatLng = this.isValidLatLng(this.searchText());
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
