import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import { ModalController, IonInput, DomController } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable, of, Subscription } from 'rxjs';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import 'hammerjs';
import * as L from 'leaflet';
import { NumberHelper } from '../../../../core/helpers/number-helper';

const SWIPE_BOUNDRY = 0.20; // More than 20% swipe to right will close modal

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
  modalPageWrapper: Element;
  swipeOffset = 0;
  swipePercentage = 0;
  subscription: Subscription;

  constructor(private modalController: ModalController,
    private mapSearchService: MapSearchService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  async ngOnInit() {
    this.searchField = new FormControl();
    this.searchHistory$ = this.mapSearchService.getSearchHistoryAsObservable();
    const searchTextObservable = this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged());

    this.searchResult$ = searchTextObservable
      .pipe(
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
        }),
      );

    this.subscription = searchTextObservable.subscribe((searchValue) => {
      const validLatLng = this.isValidLatLng(searchValue);
      if (validLatLng) {
        this.mapSearchService.mapSearchItemSelected = validLatLng;
        this.closeModal();
      }
    });
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
      const trimmedLatString = searchValue[0] ? searchValue[0].trim() : searchValue[0];
      const trimmedLngString = searchValue[1] ? searchValue[1].trim() : searchValue[1];
      if (trimmedLatString && trimmedLatString.length > 0 && trimmedLngString && trimmedLngString.length > 0) {
        const trimmedAndReplacedLatString = trimmedLatString.replace(/,/g, '.');
        const trimmedAndReplacedLngString = trimmedLngString.replace(/,/g, '.');
        if (NumberHelper.isNumeric(trimmedAndReplacedLatString) && NumberHelper.isNumeric(trimmedAndReplacedLngString)) {
          const lat = parseFloat(trimmedAndReplacedLatString);
          const lng = parseFloat(trimmedAndReplacedLngString);
          if (lat > -90 && lat < 90 && lng > -180 && lng < 180) {
            return L.latLng(lat, lng);
          }
        }
      }
    }
    return null;
  }

  async getWidth() {
    const modalTop = await this.modalController.getTop();
    this.modalPageWrapper = modalTop.getElementsByClassName('modal-wrapper')[0];
    return modalTop.offsetWidth;
  }

  focusInput(event: Event) {
    const input: IonInput = <any>event.target;
    setTimeout(() => {
      (<any>input).setFocus();
    }, 1000);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  searchItemClicked(item: MapSearchResponse) {
    this.mapSearchService.mapSearchItemSelected = item;
    this.closeModal();
  }

  // TODO: Create swipe-out component and wrap title and content?
  async onPan(event: HammerInput) {
    const width = await this.getWidth();
    if (width > 0) {
      this.swipeOffset = Math.max(event.deltaX, 0);
      this.swipePercentage = this.swipeOffset / width;
      if (this.swipePercentage < SWIPE_BOUNDRY) {
        this.setPageSwipeAttributes();
      } else {
        this.closeModal();
      }
    }
    event.preventDefault();
  }

  setPageSwipeAttributes() {
    if (this.modalPageWrapper) {
      this.domCtrl.write(() => {
        this.renderer.setAttribute(this.modalPageWrapper, 'data-offset-x', this.swipeOffset.toString());
        this.renderer.setAttribute(this.modalPageWrapper, 'data-opacity', `${1.0 - this.swipePercentage}`);
        this.renderer.setStyle(this.modalPageWrapper, 'transform', `translateX(${this.swipeOffset}px)`);
        this.renderer.setStyle(this.modalPageWrapper, 'opacity', `${1.0 - this.swipePercentage}`);
      });
    }
  }

  onPanend(event: HammerInput) {
    if (this.swipePercentage < SWIPE_BOUNDRY) {
      this.swipeOffset = 0;
      this.swipePercentage = 0;
      this.setPageSwipeAttributes();
    }
  }
}
