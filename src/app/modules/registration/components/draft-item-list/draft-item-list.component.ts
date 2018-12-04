import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-draft-item-list',
  templateUrl: './draft-item-list.component.html',
  styleUrls: ['./draft-item-list.component.scss']
})
export class DraftItemListComponent implements OnInit {

  get drafts$() { return this.registrationService.drafts$; }

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {

  }

}
