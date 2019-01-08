import { Component, OnInit, Input } from '@angular/core';
import { IRegistration } from '../../models/registration.model';

@Component({
  selector: 'app-sync-item',
  templateUrl: './sync-item.component.html',
  styleUrls: ['./sync-item.component.scss']
})
export class SyncItemComponent implements OnInit {

  @Input() registration: IRegistration;
  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

  getLocationName(reg: IRegistration) {
    return reg.request.ObsLocation ? reg.request.ObsLocation.LocationName
      || reg.calculatedLocationName || '' : '';
  }

}
