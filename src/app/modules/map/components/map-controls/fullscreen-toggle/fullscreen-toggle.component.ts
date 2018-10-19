import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events } from '@ionic/angular';
import { settings } from '../../../../../../settings';

@Component({
  selector: 'app-fullscreen-toggle',
  templateUrl: './fullscreen-toggle.component.html',
  styleUrls: ['./fullscreen-toggle.component.scss']
})
export class FullscreenToggleComponent implements OnInit {

  private fullscreen: boolean;

  constructor(private statusBar: StatusBar, private events: Events) {

  }

  ngOnInit() {
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    if (this.fullscreen) {
      this.statusBar.styleDefault();
    } else {
      this.statusBar.styleBlackTranslucent();
    }
    this.events.publish(settings.events.fullscreenChanged, this.fullscreen);
  }
}
