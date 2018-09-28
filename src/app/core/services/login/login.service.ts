import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private userSettingService: UserSettingService) { }

  async login(username: string, password: string) {
    const userSettings = await this.userSettingService.getUserSettings();
    const baseUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });
    const result = await this.httpClient.post(`${baseUrl}/Account/Login`, {}, { headers }).toPromise();
    console.log(result);
  }

  getLoggedUserInAsObservable(): Observable<string> {
    return null;
  }
}
