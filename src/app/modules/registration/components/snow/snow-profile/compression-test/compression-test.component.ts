import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CompressionTestDto } from '../../../../../regobs-api/models';
import { IsEmptyHelper } from '../../../../../../core/helpers/is-empty.helper';
import { CompressionTestListModalPage } from './compression-test-list-modal/compression-test-list-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-compression-test',
  templateUrl: './compression-test.component.html',
  styleUrls: ['./compression-test.component.scss']
})
export class CompressionTestComponent implements OnInit {

  @Input() tests: Array<CompressionTestDto>;
  @Output() testsChange = new EventEmitter();
  private isOpen = false;

  get connectedTests() {
    return (this.tests || []).filter((t) => t.IncludeInSnowProfile === true);
  }

  get isEmpty() {
    return this.connectedTests.length === 0;
  }

  constructor(private modalContoller: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    if (!this.isOpen) {
      this.isOpen = true;
      const modal = await this.modalContoller.create({
        component: CompressionTestListModalPage,
        componentProps: {
          tests: this.tests !== undefined ? [...this.tests] : [],
        }
      });
      modal.present();
      const result = await modal.onDidDismiss();
      this.isOpen = false;
      if (result.data) {
        this.tests = result.data;
        this.testsChange.emit(this.tests);
      }
    }
  }

}
