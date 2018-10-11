import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadComponent } from './data-load.component';

describe('DataLoadComponent', () => {
  let component: DataLoadComponent;
  let fixture: ComponentFixture<DataLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
