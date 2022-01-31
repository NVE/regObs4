import { Injectable, Inject } from '@angular/core';
import { AppConfig } from '../../models/app-config.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { LangKey } from '../../models/lang-key.enum';
import { APP_CONFIG } from '../../models/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public get language$(): Observable<LangKey> {
    return this.langKeySubject;
  }

  private langKeySubject: BehaviorSubject<LangKey>;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.langKeySubject = new BehaviorSubject(config.language);
  }

  public setLanguage(langKey: LangKey): void {
    if (typeof langKey !== 'number') {
      throw new Error('Lang key must be a number!');
    }
    this.langKeySubject.next(langKey);
  }
}
