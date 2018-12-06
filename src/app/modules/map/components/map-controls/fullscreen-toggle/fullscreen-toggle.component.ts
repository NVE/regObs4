import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullscreenService } from '../../../../../core/services/fullscreen/fullscreen.service';

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss']
})
export class FullscreenToggleComponent implements OnInit {

  constructor(private fullscreenService: FullscreenService) {

  }

  ngOnInit() {
  }

  toggleFullscreen() {
    this.fullscreenService.toggleFullscreen();
  }
}
