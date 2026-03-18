import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowProfileComponent } from './snow-profile.component';
import { provideTranslateService } from '@ngx-translate/core';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { of } from 'rxjs';
import { SnowProfileEditModel } from 'src/app/modules/common-regobs-api';

describe('SnowProfileComponent', () => {
  let component: SnowProfileComponent;
  let fixture: ComponentFixture<SnowProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        { provide: KdvService, useValue: { getKdvRepositoryByKeyObservable: () => of([]) } },
      ],
      imports: [SnowProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnowProfileComponent);
    fixture.componentRef.setInput('profile', {} as SnowProfileEditModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
