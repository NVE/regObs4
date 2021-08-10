import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {

  copyright: string;
  photographer: string; 

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  save(){
    this.modalController.dismiss({copyright: this.copyright, photographer: this.photographer});
  }

  close(){
    this.modalController.dismiss();
  }


}
