import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { MapSearchService } from '../../core/services/map-search/map-search.service';
import { Observable } from 'rxjs';
import { MapSearchResponse } from '../../core/services/map-search/map-search-response.model';
import { settings } from '../../../settings';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit {

  searchText: string;
  searchResult$: Observable<MapSearchResponse[]>;

  constructor(private modalController: ModalController, private mapSearchService: MapSearchService, private events: Events) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async search() {
    if (this.searchText.length >= 2) {
      this.searchResult$ = await this.mapSearchService.searchAll(this.searchText);
    }
  }

  searchItemClicked(item: MapSearchResponse) {
    this.events.publish(settings.events.mapSearchItemClicked, item);
    this.closeModal();
  }
}
