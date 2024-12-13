import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestModule } from '../../../test/test.module';

import { ShowFilterCriteriaComponent } from './show-filter-criteria.component';

describe('ShowFilterCriteriaComponent', () => {
  let component: ShowFilterCriteriaComponent;
  let fixture: ComponentFixture<ShowFilterCriteriaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TestModule, ShowFilterCriteriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowFilterCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
