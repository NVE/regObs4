import { Component, OnInit, Input } from '@angular/core';
import { HelptextDto } from '../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.page.html',
  styleUrls: ['./help-modal.page.scss'],
})
export class HelpModalPage implements OnInit {

  @Input() helpText: HelptextDto;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
