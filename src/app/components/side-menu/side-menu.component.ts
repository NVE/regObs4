import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

  lastUpdated: Date;
  interval: NodeJS.Timer;

  constructor(private observationService: ObservationService) { }

  async ngOnInit() {
    this.lastUpdated = await this.observationService.getLastUpdated();
    this.interval = setInterval(async () => {
      this.lastUpdated = await this.observationService.getLastUpdated();
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
