import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { CreateRegistrationRequestDto } from '../../../regobs-api/models';
import * as moment from 'moment';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.page.html',
  styleUrls: ['./set-time.page.scss'],
})
export class SetTimePage implements OnInit {

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }
}
