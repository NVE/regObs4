import { Component, inject, input, model } from '@angular/core';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, ModalController } from '@ionic/angular/standalone';
import { CompressionTestModalPage } from './compression-test-modal/compression-test-modal.page';
import { NgIf, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { KdvDescriptionPipe } from '../../../pipes/kdv-description.pipe';
import { MetersToCmPipe } from '../../../pipes/meters-to-cm.pipe';
import { addIcons } from 'ionicons';
import { link, addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-compression-test-list',
  templateUrl: './compression-test-list.component.html',
  styleUrls: ['./compression-test-list.component.scss'],
  imports: [
    AsyncPipe,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    KdvDescriptionPipe,
    MetersToCmPipe,
    NgIf,
    TranslatePipe,
  ],
})
export class CompressionTestListComponent {
  private modalController = inject(ModalController);

  readonly tests = model<CompressionTestEditModel[]>();
  readonly includeInSnowProfileAsDefault = input(false);
  private isOpen = false;

  constructor() {
    addIcons({ link, addCircleOutline });
  }

  async addOrEditCompressionTest(index?: number) {
    if (!this.isOpen) {
      this.isOpen = true;
      const add = index === undefined;
      const modal = await this.modalController.create({
        component: CompressionTestModalPage,
        componentProps: {
          compressionTest: add ? undefined : (this.tests() || [])[index],
          includeInSnowProfileAsDefault: this.includeInSnowProfileAsDefault(),
        },
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.isOpen = false;
      if (result.data) {
        if (result.data.delete && index != null) {
          this.removeTest(index);
        } else {
          const compressionTest: CompressionTestEditModel = result.data;
          if (add) {
            this.addTest(compressionTest);
          } else {
            this.replaceTest(index, compressionTest);
          }
        }
      }
    }
  }

  private addTest(compressionTest: CompressionTestEditModel) {
    this.tests.update((tests) => [...(tests || []), compressionTest]);
  }

  private replaceTest(index: number, compressionTest: CompressionTestEditModel) {
    this.tests.update((tests) => (tests || []).map((t, i) => (i === index ? compressionTest : t)));
  }

  private removeTest(index: number) {
    this.tests.update((tests) => (tests || []).filter((t, i) => i !== index));
  }
}
