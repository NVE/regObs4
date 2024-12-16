import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestModule } from '../test/test.module';

import { EditPictureInfoModalComponent } from './edit-picture-info-modal.component';

describe('EditModalComponent', () => {
  let component: EditPictureInfoModalComponent;
  let fixture: ComponentFixture<EditPictureInfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, EditPictureInfoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPictureInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
