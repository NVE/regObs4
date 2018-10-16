import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsPage } from './user-settings.page';
import { FakeTranslateLoader } from '../../core/mocks/translateLoader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';

describe('UserSettingsPage', () => {
  let component: UserSettingsPage;
  let fixture: ComponentFixture<UserSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSettingsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader },
        }),
        IonicStorageModule.forRoot({
          name: '__regobsdb',
          driverOrder: ['sqlite', 'indexeddb', 'websql'],
        }) // TODO: Mock storage instead
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
