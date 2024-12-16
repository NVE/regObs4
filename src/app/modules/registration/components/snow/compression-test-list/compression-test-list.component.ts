import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, ModalController } from '@ionic/angular/standalone';
import { CompressionTestModalPage } from './compression-test-modal/compression-test-modal.page';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
    NgFor,
    NgIf,
    TranslateModule,
  ],
})
export class CompressionTestListComponent {
  @Input() tests: Array<CompressionTestEditModel>;
  @Input() includeInSnowProfileAsDefault = false;
  @Output() testsChange = new EventEmitter();
  private isOpen = false;

  constructor(private modalController: ModalController) {
    addIcons({ link, addCircleOutline });
  }

  async addOrEditCompressionTest(index?: number) {
    if (!this.isOpen) {
      this.isOpen = true;
      const add = index === undefined;
      const modal = await this.modalController.create({
        component: CompressionTestModalPage,
        componentProps: {
          compressionTest: add ? undefined : (this.tests || [])[index],
          includeInSnowProfileAsDefault: this.includeInSnowProfileAsDefault,
        },
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.isOpen = false;
      if (result.data) {
        if (result.data.delete) {
          this.removeTest(index);
        } else {
          const compressionTest: CompressionTestEditModel = result.data;
          if (this.tests === undefined) {
            this.tests = [];
          }
          if (add) {
            this.tests.push(compressionTest);
          } else {
            this.tests[index] = compressionTest;
          }
        }
      }
      this.testsChange.emit(this.tests);
    }
  }

  private removeTest(index) {
    if (this.tests !== undefined && this.tests.length > 0) {
      this.tests.splice(index, 1);
    }
  }
}
