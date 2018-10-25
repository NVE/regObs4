import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IRegistration } from '../../models/registration.model';
import { IsEmptyHelper } from '../../../../core/helpers/is-empty.helper';
import { RegistationTid } from '../../models/registrationTid.enum';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss']
})
export class SaveAndGoBackButtonComponent implements OnInit {

  @Input() registration: IRegistration;
  @Input() isEmpty: boolean;
  @Output() reset: EventEmitter<any> = new EventEmitter();

  constructor(
    private navContoller: NavController
  ) { }

  async ngOnInit() {
  }

  async goBack() {
    this.navContoller.goBack();
  }

  doReset() {
    this.reset.emit();
  }
}
