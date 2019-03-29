import { Component, OnInit, NgZone, Renderer2, OnDestroy } from '@angular/core';
import { ModalController, IonInput, DomController } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable } from 'rxjs';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import 'hammerjs';
import * as L from 'leaflet';
import { NumberHelper } from '../../../../core/helpers/number-helper';

const SWIPE_BOUNDRY = 0.25; // More than 20% swipe to right will close modal

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
    this.modalPageWrapper = this.modalTop.getElementsByClassName('modal-wrapper')[0];

    const hammerManager = new Hammer.Manager(this.modalPageWrapper, {
      touchAction: 'auto',
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
      ]
    });
    hammerManager.on('panright', (event) => this.onPan(event));
    hammerManager.on('panend', () => this.onPanend());
  }

  ngOnDestroy(): void {
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

  async onPan(event: HammerInput) {
    const width = this.modalTop.offsetWidth;
    if (width > 0) {
      this.swipeOffset = Math.max(event.deltaX, 0);
      this.swipePercentage = this.swipeOffset / width;
      if (this.swipePercentage < SWIPE_BOUNDRY) {
        this.setPageSwipeAttributes();
      } else {
        this.closeModal();
      }
    }
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

  onPanend() {
    if (this.swipePercentage < SWIPE_BOUNDRY) {
      this.swipeOffset = 0;
      this.swipePercentage = 0;
      this.setPageSwipeAttributes();
    }
  }
}
