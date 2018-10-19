import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { settings } from '../../../../../../settings';

@Component({
  selector: 'app-gps-center',
  templateUrl: './gps-center.component.html',
  styleUrls: ['./gps-center.component.scss']
})
export class GpsCenterComponent implements OnInit {

  constructor(private events: Events) { }

  ngOnInit() {
  }

  centerMapToUser() {
    this.events.publish(settings.events.centerMapToUser);
  }

}
