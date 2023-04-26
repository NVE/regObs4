import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { FullscreenService } from 'src/app/core/services/fullscreen/fullscreen.service';

import { SetFloodAreaPage } from './set-flood-area.page';

describe('SetFloodAreaPage', () => {
  let component: SetFloodAreaPage;
  let fixture: ComponentFixture<SetFloodAreaPage>;
  let fullscreenService: FullscreenService;

  beforeEach(waitForAsync(() => {
    fullscreenService = jasmine.createSpyObj('FullscreenService', {
      isFullscreen$: () => of(true),
    });

    TestBed.configureTestingModule({
      declarations: [SetFloodAreaPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: FullscreenService, useValue: fullscreenService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SetFloodAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
