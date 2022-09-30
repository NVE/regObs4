import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent {
  @Input() mapSearchOpen = false;

  openModal() {
    this.mapSearchOpen = true;
  }
}
