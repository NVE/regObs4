import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(success: boolean) {
    this.modalController.dismiss(success);
  }

}
