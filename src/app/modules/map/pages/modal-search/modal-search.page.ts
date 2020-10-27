import { Component, OnInit, NgZone, Renderer2, OnDestroy } from '@angular/core';
import { ModalController, IonInput, DomController } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable } from 'rxjs';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import * as L from 'leaflet';
import { NumberHelper } from '../../../../core/helpers/number-helper';
import { createGesture, GestureDetail, Gesture } from '@ionic/core';

const SWIPE_BOUNDRY = 0.30; // More than 30% swipe to right will close modal

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit, OnDestroy {

  searchText: string;
  searchResult$: Observable<MapSearchResponse[]>;
  searchField: FormControl;
  loading: boolean;
  hasResults: boolean;
  searchHistory$: Observable<MapSearchResponse[]>;

  private modalPageWrapper: Element;
  private modalTop: HTMLIonModalElement;
  private swipeOffset = 0;
  private swipePercentage = 0;
  private gesture: Gesture;

  constructor(private modalController: ModalController,
    private mapSearchService: MapSearchService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  ngOnInit() {
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

    this.createGesture();
  }

  doSearch() {
    const validLatLng = this.isValidLatLng(this.searchText);
    if (validLatLng) {
      this.mapSearchService.mapSearchItemSelected = validLatLng;
      this.closeModal();
    }
  }

  private async createGesture() {
    this.modalTop = await this.modalController.getTop();
    this.gesture = createGesture({
      el: this.modalTop,
      gestureName: 'swipe-to-close',
      direction: 'x',
      disableScroll: true,
      onMove: (ev) => this.onMoveHandler(ev),
      onEnd: (ev) => this.onPanend(),
    });

    this.gesture.enable();
  }

  ngOnDestroy(): void {
    this.gesture.destroy();
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
      const trimmedLatString = this.trimAndReplaceString(searchValue[0]);
      const trimmedLngString = this.trimAndReplaceString(searchValue[1]);
      if (trimmedLatString && trimmedLatString.length > 0 && trimmedLngString && trimmedLngString.length > 0
        && NumberHelper.isNumeric(trimmedLatString) && NumberHelper.isNumeric(trimmedLngString)) {
        const lat = parseFloat(trimmedLatString);
        const lng = parseFloat(trimmedLngString);
        if (lat > -90 && lat < 90 && lng > -180 && lng < 180) {
          return L.latLng(lat, lng);
        }
      }
    }
    return null;
  }

  private trimAndReplaceString(input: string) {
    if (input === undefined || input === null) {
      return input;
    }
    return input.trim().replace(/,/g, '.');
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

  onMoveHandler(ev: GestureDetail): boolean | void {
    const width = this.modalTop.offsetWidth;
    if (width > 0) {
      this.swipeOffset = Math.max(ev.deltaX, 0);
      this.swipePercentage = this.swipeOffset / width;
      if (this.swipePercentage < SWIPE_BOUNDRY) {
        this.setPageSwipeAttributes();
      } else {
        this.closeModal();
      }
    }
  }

  setPageSwipeAttributes() {
    if (this.modalTop) {
      this.domCtrl.write(() => {
        const opacity = (1.0 - this.swipePercentage);
        this.renderer.setAttribute(this.modalTop, 'data-offset-x', this.swipeOffset.toString());
        this.renderer.setAttribute(this.modalTop, 'data-opacity', `${opacity}`);
        this.renderer.setStyle(this.modalTop, 'transform', `translateX(${this.swipeOffset}px)`);
        this.renderer.setStyle(this.modalTop, 'opacity', `${opacity}`);
      });
    }
  }

  onPanend() {
    if (this.swipePercentage < SWIPE_BOUNDRY) {
      this.swipeOffset = 0;
      this.swipePercentage = 0;
      this.setPageSwipeAttributes();
    }
  }
}
