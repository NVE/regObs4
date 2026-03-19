import { Component, inject, input, model, ChangeDetectionStrategy, computed } from '@angular/core';
import { CompressionTestEditModel } from 'src/app/modules/common-regobs-api/models';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  ModalController,
} from '@ionic/angular/standalone';
import { CompressionTestModalPage } from './compression-test-modal/compression-test-modal.page';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { link, addCircleOutline } from 'ionicons/icons';
import { injectSnowProfileKdvs } from 'src/app/components/snow-profile/kdvs';
import { formatCompressionTest } from 'src/app/components/snow-profile/formatters';

@Component({
  selector: 'app-compression-test-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './compression-test-list.component.html',
  styleUrls: ['./compression-test-list.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonList, IonListHeader, TranslatePipe, IonNote],
})
export class CompressionTestListComponent {
  private modalController = inject(ModalController);
  private kdvs = injectSnowProfileKdvs();

  readonly tests = model<CompressionTestEditModel[]>();
  readonly includeInSnowProfileAsDefault = input(false);
  private isOpen = false;

  private formatter = computed(() => {
    const kdvs = this.kdvs();
    return (test: CompressionTestEditModel) =>
      formatCompressionTest(test, kdvs, { includeDepth: true, includeFracture: true });
  });

  testsWithLabel = computed(() => {
    const fmt = this.formatter();
    return this.tests()?.map((test) => ({ test, label: fmt(test) }));
  });

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
