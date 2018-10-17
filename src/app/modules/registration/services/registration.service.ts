import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
import { nSQL } from 'nano-sql';
import { IRegistration } from '../models/registration.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _registrationsObservable: Observable<IRegistration[]>;

  get registrations$() {
    return this._registrationsObservable;
  }

  constructor() {
    this._registrationsObservable = this.getRegistrationsAsObservable();
  }

  saveRegistration(registration: IRegistration) {
    return nSQL().table(NanoSql.TABLES.REGISTRATION.name).query('upsert', registration).emit();
  }

  private getRegistrationsAsObservable() {
    return nSQL().observable<IRegistration[]>(() => {
      return nSQL().table(NanoSql.TABLES.REGISTRATION.name).query('select').emit();
    }).toRxJS().pipe(shareReplay(1));
  }
}
