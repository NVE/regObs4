import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { Observable, of } from 'rxjs';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import 'hammerjs';

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
  width = 0;
  swipePercentage = 0;

  constructor(private modalController: ModalController,
    private mapSearchService: MapSearchService,
    private ngZone: NgZone,
  ) { }

  async ngOnInit() {
    this.searchField = new FormControl();
    this.searchHistory$ = this.mapSearchService.getSearchHistoryAsObservable();
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
    const modalTop = await this.modalController.getTop();
    this.modalPageWrapper = modalTop.getElementsByClassName('modal-wrapper')[0];
    this.width = modalTop.offsetWidth;
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

  // TODO: Create swipe-out component and wrap title and content
  onPan(event: HammerInput) {
    this.swipeOffset = Math.max(event.deltaX, 0);
    this.swipePercentage = this.swipeOffset / this.width;
    if (this.swipePercentage < SWIPE_BOUNDRY) {
      this.setPageSwipeAttributes();
    } else {
      this.closeModal();
    }
  }

  setPageSwipeAttributes() {
    if (this.modalPageWrapper) {
      const tranform = `transform: translateX(${this.swipeOffset}px)`;
      const opacity = `opacity: ${1.0 - this.swipePercentage}`;
      this.modalPageWrapper.setAttribute('data-offset-x', this.swipeOffset.toString());
      this.modalPageWrapper.setAttribute('data-opacity', `${1.0 - this.swipePercentage}`);
      this.modalPageWrapper.setAttribute('style', `${tranform};${opacity}`);
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
