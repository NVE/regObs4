import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPictureInfoModalComponent } from './edit-picture-info-modal.component';
import { provideTranslateService } from '@ngx-translate/core';
import { provideIonicAngular } from '@ionic/angular/standalone';

describe('EditPictureInfoModalComponent', () => {
  let component: EditPictureInfoModalComponent;
  let fixture: ComponentFixture<EditPictureInfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideIonicAngular(), provideTranslateService()],
      imports: [EditPictureInfoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPictureInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
