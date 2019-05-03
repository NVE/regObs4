import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DensityProfileDto } from '../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { SnowDensityModalPage } from './snow-density-modal/snow-density-modal.page';

@Component({
  selector: 'app-snow-density',
  templateUrl: './snow-density.component.html',
  styleUrls: ['./snow-density.component.scss']
})
export class SnowDensityComponent implements OnInit {

  @Input() profiles: Array<DensityProfileDto>;
  @Output() profilesChange = new EventEmitter();
  private isOpen = false;

  get isEmpty() {
    return !(this.profiles && this.profiles.length > 0 && this.profiles[0].Layers && this.profiles[0].Layers.length > 0);
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.isOpen) {
      this.isOpen = true;
      const modal = await this.modalContoller.create({
        component: SnowDensityModalPage,
        componentProps: {
          profile: (this.profiles && this.profiles.length > 0) ? { ...this.profiles[0] } : undefined,
        }
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.isOpen = false;
      if (result.data) {
        this.profiles = [result.data];
        this.profilesChange.emit(this.profiles);
      }
    }
  }
}
