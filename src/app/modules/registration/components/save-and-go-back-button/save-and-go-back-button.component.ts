import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-save-and-go-back-button',
  templateUrl: './save-and-go-back-button.component.html',
  styleUrls: ['./save-and-go-back-button.component.scss']
})
export class SaveAndGoBackButtonComponent implements OnInit {

  @Output() beforeLeave: EventEmitter<any> = new EventEmitter();

  constructor(private navContoller: NavController) { }

  ngOnInit() {
  }

  async goBack() {
    this.beforeLeave.emit();
    setTimeout(_ => {
      this.navContoller.goBack();
    });
  }
}
